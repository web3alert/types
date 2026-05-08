import type {
  TriggerExecutionPolicy,
  TriggerMeta,
  TriggerOutputSchemaField,
  TriggerProvider,
  TriggerSpec,
  TriggerActivation,
  TriggerTransform,
} from './trigger';
import type {
  ProjectMeta,
  ProjectVisibility,
} from './project';

export const MARKETPLACE_RUNTIME_DEFAULT_WORKSPACE = 'common';
export const MARKETPLACE_RUNTIME_DEFAULT_PROJECT = 'marketplace.runtime';
export const MARKETPLACE_RUNTIME_DEFAULT_SERVICE = 'control';
export const MARKETPLACE_SANDBOX_DEFAULT_WORKSPACE = 'common';
export const MARKETPLACE_SANDBOX_DEFAULT_PROJECT = 'marketplace.sandbox';
export const MARKETPLACE_SANDBOX_DEFAULT_SERVICE = 'exec';

export const MARKETPLACE_RUNTIME_METHODS = {
  upsertProject: 'upsert-project',
  removeProject: 'remove-project',
  upsertTrigger: 'upsert-trigger',
  removeTrigger: 'remove-trigger',
} as const;

export const MARKETPLACE_SANDBOX_METHODS = {
  executeV1: 'execute-v1',
} as const;

export type MarketplaceRuntimeSourceBinding =
  | {
      type: 'sdk';
      trigger: string;
      params?: Record<string, unknown>;
    }
  | {
      type: 'timer';
      interval: string;
    };

export type MarketplaceRuntimeProjectUpsert = {
  projectFullname: string;
  workspace: string;
  visibility: ProjectVisibility;
  meta: ProjectMeta;
};

export type MarketplaceRuntimeProjectRemove = {
  projectFullname: string;
};

export type MarketplaceRuntimeTriggerUpsert = {
  triggerFullname: string;
  projectFullname: string;
  workspace: string;
  name: string;
  runtimeProject: string;
  runtimeTrigger: string;
  source: MarketplaceRuntimeSourceBinding;
  triggerSpec?: TriggerSpec;
  providers: TriggerProvider[];
  activation?: TriggerActivation | null;
  transform: TriggerTransform;
  filtersSchema?: Record<string, TriggerOutputSchemaField>;
  outputSchema?: Record<string, TriggerOutputSchemaField>;
  executionPolicy?: TriggerExecutionPolicy;
  meta: TriggerMeta;
};

export type MarketplaceRuntimeTriggerRemove = {
  triggerFullname: string;
};

export type MarketplaceSandboxExecuteRequest = {
  requestId: string;
  workspace: string;
  projectFullname: string;
  triggerFullname: string;
  triggerRevision?: number;
  sourceEvent: unknown;
  inputs?: Record<string, unknown>;
  sourceMeta?: {
    subject?: string;
    ts?: string;
  };
  source?: MarketplaceRuntimeSourceBinding | null;
  triggerSpec?: TriggerSpec;
  activation?: TriggerActivation | null;
  transform: TriggerTransform;
  providers: TriggerProvider[];
  limits: {
    timeoutMs: number;
    maxProviderCallsPerRun: number;
    maxResponseBytes: number;
    memoryMb?: number;
  };
  filtersSchema?: Record<string, TriggerOutputSchemaField>;
  outputSchema?: Record<string, TriggerOutputSchemaField>;
  options?: {
    includeLogs?: boolean;
  };
};

export type MarketplaceSandboxExecuteStatus =
  | 'ok'
  | 'user_error'
  | 'policy_error'
  | 'timeout'
  | 'oom'
  | 'runtime_error'
;

export type MarketplaceSandboxExecuteResponse = {
  status: MarketplaceSandboxExecuteStatus;
  events?: Array<Record<string, unknown>>;
  output?: unknown;
  error?: {
    class: 'user_error' | 'system_error';
    code: string;
    message: string;
  };
  metrics: {
    durationMs: number;
    memoryPeakMb?: number;
    providerCalls: number;
    bytesOut: number;
  };
  logs?: Array<{
    level: 'debug' | 'info' | 'warn' | 'error';
    message: string;
  }>;
};
