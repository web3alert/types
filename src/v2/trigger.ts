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

export type TriggerProvider = {
  id: string;
  type: 'http' | 'graphql' | 'rpc';
  url: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  body?: unknown;
  query?: string;
  variables?: Record<string, unknown>;
  timeoutMs?: number;
};

export type TriggerOutputSchemaField = {
  type: TypeSchema;
  description?: string;
};

export type TriggerTransform = {
  language: 'javascript';
  source: string;
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
