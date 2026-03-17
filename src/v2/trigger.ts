import type { TypeSchema } from '../type-schema';
import type { Tags, Labels } from '../common';
import type { Event } from './event';

export type TriggerSpec =
  | {
      type: 'evm_log';
      chain?: string;
      network?: string;
      contract?: string;
      event?: string;
    }
  | {
      type: 'substrate_event';
      chain?: string;
      network?: string;
      pallet?: string;
      event?: string;
    }
  | {
      type: 'timer';
      interval: string;
    };

export type TriggerProviderBase = {
  id: string;
  timeoutMs?: number;
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

export type TriggerProvider =
  | TriggerHttpProvider
  | TriggerGraphqlProvider
  | TriggerRpcEndpointProvider
  | TriggerRpcSourceProvider
  | TriggerSubstrateStorageProvider;

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
};

export type Trigger = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  backend: TriggerBackend;
  values: Record<string, TypeSchema>;
  defaults?: Event;
  output?: Record<string, TypeSchema>;
  triggerSpec?: TriggerSpec;
  providers?: TriggerProvider[];
  outputSchema?: Record<string, TriggerOutputSchemaField>;
  transform?: TriggerTransform;
  executionPolicy?: TriggerExecutionPolicy;
  tags: Tags;
  labels: Labels;
  meta: TriggerMeta;
};

export type TriggerBackendLegacy = {
  type: 'legacy';
};

export type TriggerBackendSDK = {
  type: 'sdk';
  trigger: string;
  values?: Record<string, unknown>;
};

export type TriggerBackend =
  | TriggerBackendLegacy
  | TriggerBackendSDK
;

export type TriggerMeta = {
  title: string;
  description?: string;
};

export type TriggerView = Trigger;
