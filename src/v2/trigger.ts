import type { TypeSchema } from '../type-schema';
import type { Tags, Labels } from '../common';
import type { Event } from './event';

export type TriggerTypesRefSource = {
  type: 'source';
  source: string;
};

export type TriggerTypesRefApi = {
  type: 'api';
  baseUrl?: string;
  url?: string;
  lookupUrl?: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: unknown;
};

export type TriggerTypesRefInline = {
  type: 'inline';
  schemas: Record<string, TypeSchema>;
};

export type TriggerTypesRef =
  | string
  | TriggerTypesRefSource
  | TriggerTypesRefApi
  | TriggerTypesRefInline
;

export type TriggerSpec =
  | {
      type: 'evm_log';
      dataSource: string;
      typesRef?: TriggerTypesRef;
      contract?: string;
      event?: string;
      abiFragment?: string;
      topicsCount?: number;
      dataBytes?: number;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'evm_transaction';
      dataSource: string;
      typesRef?: TriggerTypesRef;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'substrate_event';
      dataSource: string;
      typesRef?: TriggerTypesRef;
      pallet?: string;
      event?: string;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'solana_event';
      dataSource: string;
      typesRef?: TriggerTypesRef;
      programId?: string;
      event?: string;
      idl?: unknown;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'hypercore_action';
      dataSource: string;
      typesRef?: TriggerTypesRef;
      // Which source item kind the trigger consumes; defaults to 'action'.
      itemKind?: 'action' | 'orderStatus' | 'fill';
      // Required for the 'action' item kind.
      actionType?: string;
      user?: string;
      coin?: string;
      vault?: string;
      validator?: string;
      // orderStatus filters.
      status?: string;
      side?: string;
      // fill filters.
      dir?: string;
      liquidated?: boolean;
      liquidatedUser?: string;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'timer';
      typesRef?: TriggerTypesRef;
      interval: string;
      testInput?: Record<string, unknown>;
    };

export type TriggerProviderRetryOn =
  | 'http_error'
  | 'empty_array'
  | 'missing_path'
;

export type TriggerProviderRetryBackoff =
  | 'fixed'
  | 'linear'
  | 'exponential'
;

export type TriggerProviderRetryUntil = {
  path: string;
  equals?: unknown;
};

// Non-blocking readiness polling for providers that may respond before an
// external indexer has caught up. A not-ready result parks the execution and
// requeues it after the computed delay instead of holding a worker.
export type TriggerProviderRetryPolicy = {
  attempts: number;
  delayMs: number;
  backoff?: TriggerProviderRetryBackoff;
  maxDelayMs?: number;
  maxElapsedMs?: number;
  retryOn?: TriggerProviderRetryOn[];
  until?: TriggerProviderRetryUntil;
  onExhausted?: 'continue' | 'fail';
};

export type TriggerProviderRunConditionSelect = {
  param: string;
  condition: TriggerProviderRunCondition;
};

export type TriggerProviderRunConditionValue = {
  op: string;
  value: unknown;
};

export type TriggerProviderRunConditionSelectValue = {
  param: string;
  op: string;
  value: unknown;
};

export type TriggerProviderRunConditionContains = {
  contains: TriggerProviderRunCondition;
};

export type TriggerProviderRunConditionAll = {
  all: TriggerProviderRunCondition[];
};

export type TriggerProviderRunConditionAny = {
  any: TriggerProviderRunCondition[];
};

export type TriggerProviderRunCondition =
  | TriggerProviderRunConditionSelect
  | TriggerProviderRunConditionValue
  | TriggerProviderRunConditionSelectValue
  | TriggerProviderRunConditionContains
  | TriggerProviderRunConditionAll
  | TriggerProviderRunConditionAny
;

export type TriggerProviderRunIf = TriggerProviderRunConditionAll | TriggerProviderRunConditionAny | null;

export type TriggerProviderCachePolicy = {
  namespace: string;
  key: unknown;
  ttlMs?: number;
  emptyTtlMs?: number;
};

export type TriggerProviderBase = {
  id: string;
  weight?: number;
  timeoutMs?: number;
  optional?: boolean;
  runIf?: TriggerProviderRunIf;
  cache?: TriggerProviderCachePolicy;
  retry?: TriggerProviderRetryPolicy;
  outputSchema?: Record<string, TriggerOutputSchemaField>;
};

export type TriggerHttpProvider = TriggerProviderBase & {
  type: 'http';
  url: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  pathParams?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
  body?: unknown;
};

export type TriggerGraphqlProvider = TriggerProviderBase & {
  type: 'graphql';
  url: string;
  headers?: Record<string, string>;
  query: string;
  variables?: unknown;
};

export type TriggerRpcEndpointProvider = TriggerProviderBase & {
  type: 'rpc';
  transport?: 'endpoint';
  url: string;
  headers?: Record<string, string>;
  method: string;
  params?: unknown;
  body?: unknown;
};

export type TriggerRpcSourceProvider = TriggerProviderBase & {
  type: 'rpc';
  transport: 'source';
  method: string;
  params?: unknown;
};

export type TriggerSubstrateStorageProvider = TriggerProviderBase & {
  type: 'substrate_storage';
  source?: string;
  module: string;
  entry: string;
  args?: unknown;
  block?: unknown;
};

export type TriggerEvmReadProvider = TriggerProviderBase & {
  type: 'evm_read';
  source?: string;
  contract: string;
  abiContract?: string;
  method: string;
  abiFragment: string;
  args?: unknown;
};

export type TriggerSolanaAccountProvider = TriggerProviderBase & {
  type: 'solana_account';
  source?: string;
  account?: string;
  idl?: Record<string, unknown> | string;
  programId?: string;
  accountName?: string;
  pda?: {
    programId?: string;
    seeds: Array<{
      type?: 'literal' | 'string' | 'pubkey' | 'bytes' | 'u8' | 'u16' | 'u32' | 'u64' | 'i64';
      value: unknown;
    }>;
  };
};

export type TriggerTokenMetadataProvider = TriggerProviderBase & {
  type: 'token_metadata';
  sourceType: 'evm' | 'substrate' | 'solana';
  source: string;
  tokenId: string;
};

export type TriggerStateWindowValueType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'object'
  | 'array'
  | 'unknown'
;

export type TriggerStateWindowAggregate =
  | 'values'
  | 'avg'
  | 'min'
  | 'max'
  | 'sum'
;

export type TriggerStateWindowProvider = TriggerProviderBase & {
  type: 'state_window';
  partitionBy?: unknown;
  dedupeBy: unknown;
  value: unknown;
  keepLast: number;
  valueType?: TriggerStateWindowValueType;
  aggregate?: TriggerStateWindowAggregate[];
};

export type TriggerJavascriptProvider = TriggerProviderBase & {
  type: 'javascript';
  variables?: unknown;
  source: string;
};

export type TriggerProvider =
  | TriggerHttpProvider
  | TriggerGraphqlProvider
  | TriggerRpcEndpointProvider
  | TriggerRpcSourceProvider
  | TriggerSubstrateStorageProvider
  | TriggerEvmReadProvider
  | TriggerSolanaAccountProvider
  | TriggerTokenMetadataProvider
  | TriggerStateWindowProvider
  | TriggerJavascriptProvider;

export type TriggerOutputSchemaField = {
  type: TypeSchema;
  description?: string;
};

export type TriggerTransform = {
  language: 'javascript';
  source?: string;
  rawSource?: string;
  humanSource?: string;
};

export type TriggerActivation = {
  language: 'javascript';
  source: string;
};

export type TriggerExecutionPolicy = {
  maxProviderCallsPerRun?: number;
  timeoutMs?: number;
  maxResponseBytes?: number;
  maxExecutionConcurrency?: number;
};

export type TriggerStatus =
  | 'not_tested'
  | 'ready'
  | 'warning'
  | 'limited'
  | 'blocked'
  | 'broken'
;

export type TriggerStatusReasonCode =
  | 'trigger.output_rate_limit'
  | 'trigger.publish_backlog'
  | 'trigger.source_lag_storm'
  | 'trigger.source_emission_limit'
  | 'trigger.execution_queue_limit'
  | 'trigger.runtime_error'
  | 'trigger.missing_source_filters'
  | 'trigger.source_filter_ineffective'
;

export type TriggerStatusDetails = {
  status: TriggerStatus;
  issue?: string;
  reasonCode?: TriggerStatusReasonCode;
  metrics?: Record<string, unknown>;
  limits?: Record<string, unknown>;
  source?: 'edit' | 'test' | 'runtime' | 'dependency';
  updatedAt?: string;
};

export type Trigger = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  fullname: string;
  projectId?: string;
  project: string;
  workspace: string;
  public: boolean;
  backend: TriggerBackend;
  inputs: Record<string, TypeSchema>;
  defaults?: Event;
  triggerSpec?: TriggerSpec;
  providerRefs?: string[];
  filtersSchema?: Record<string, TriggerOutputSchemaField>;
  outputSchema?: Record<string, TriggerOutputSchemaField>;
  activation?: TriggerActivation | null;
  transformRef?: string;
  executionPolicy?: TriggerExecutionPolicy;
  status: TriggerStatusDetails;
  tags: Tags;
  labels: Labels;
  meta: TriggerMeta;
};

export type TriggerBackendSDK = {
  type: 'sdk';
  trigger: string;
  values?: Record<string, unknown>;
};

export type TriggerBackend = TriggerBackendSDK;

export type TriggerMeta = {
  title: string;
  description?: string;
};

export type TriggerListItemSpec =
  | {
      type: 'evm_log';
      dataSource: string;
      contract?: string;
      event?: string;
      topicsCount?: number;
      dataBytes?: number;
    }
  | {
      type: 'evm_transaction';
      dataSource: string;
    }
  | {
      type: 'substrate_event';
      dataSource: string;
      pallet?: string;
      event?: string;
    }
  | {
      type: 'timer';
      interval: string;
    };

export type TriggerListItemView = Pick<
  Trigger,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'name'
  | 'fullname'
  | 'projectId'
  | 'project'
  | 'workspace'
  | 'public'
  | 'status'
  | 'tags'
  | 'labels'
  | 'meta'
> & {
  triggerSpec?: TriggerListItemSpec;
  hasProviders?: boolean;
  hasTransform?: boolean;
};

export type TriggerView = Omit<Trigger, 'providerRefs' | 'transformRef'> & {
  hasProviders?: boolean;
  hasTransform?: boolean;
};

export type TriggerDraftView = TriggerView & {
  providers?: TriggerProvider[];
  transform?: TriggerTransform;
};
