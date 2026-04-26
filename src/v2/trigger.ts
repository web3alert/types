import type { TypeSchema } from '../type-schema';
import type { Tags, Labels } from '../common';
import type { Event } from './event';

export type TriggerSpec =
  | {
      type: 'evm_log';
      dataSource: string;
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
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'substrate_event';
      dataSource: string;
      pallet?: string;
      event?: string;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'timer';
      interval: string;
      testInput?: Record<string, unknown>;
    };

export type TriggerProviderBase = {
  id: string;
  weight?: number;
  timeoutMs?: number;
  outputSchema?: Record<string, TriggerOutputSchemaField>;
};

export type TriggerHttpProvider = TriggerProviderBase & {
  type: 'http';
  url: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
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

export type TriggerExecutionPolicy = {
  maxProviderCallsPerRun?: number;
  timeoutMs?: number;
  maxResponseBytes?: number;
  maxExecutionConcurrency?: number;
};

export type TriggerStatus = 'not_tested' | 'ready' | 'broken';

export type TriggerStatusDetails = {
  status: TriggerStatus;
  issue?: string;
  source?: 'edit' | 'test' | 'runtime' | 'dependency';
  updatedAt?: string;
};

export type Trigger = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  backend: TriggerBackend;
  inputs: Record<string, TypeSchema>;
  defaults?: Event;
  output?: Record<string, TypeSchema>;
  triggerSpec?: TriggerSpec;
  providerRefs?: string[];
  filtersSchema?: Record<string, TriggerOutputSchemaField>;
  outputSchema?: Record<string, TriggerOutputSchemaField>;
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

export type TriggerView = Omit<Trigger, 'providerRefs' | 'transformRef'> & {
  hasProviders?: boolean;
  hasTransform?: boolean;
};

export type TriggerDraftView = TriggerView & {
  providers?: TriggerProvider[];
  transform?: TriggerTransform;
};
