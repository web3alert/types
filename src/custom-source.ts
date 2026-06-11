import type { OpenGraphMeta } from './common';

export type CustomSourceKind = 'evm' | 'substrate' | 'solana' | 'hypercore';

export type CustomSourceSubstrateExtensionPreset =
  | 'avail'
  | 'statemint'
  | 'statemine';

export type CustomSourceSubstrateSignedExtension = {
  name: string;
  extrinsic?: Record<string, string>;
  payload?: Record<string, string>;
};

export type CustomSourceSubstrateRpcParam = {
  name: string;
  type: string;
  isOptional?: boolean;
  isHistoric?: boolean;
};

export type CustomSourceSubstrateRpcMethod = {
  name: string;
  description?: string;
  params: CustomSourceSubstrateRpcParam[];
  type: string;
};

export type CustomSourceSubstrateExtensions = {
  preset?: CustomSourceSubstrateExtensionPreset | null;
  signedExtensions?: CustomSourceSubstrateSignedExtension[];
  types?: Record<string, unknown>;
  rpc?: Record<string, CustomSourceSubstrateRpcMethod[]>;
};

export type CustomSourceSubstrateConfig = {
  extensions?: CustomSourceSubstrateExtensions;
};

export const DEFAULT_CUSTOM_SOURCE_BLOCK_PROCESSING_CONCURRENCY = 1;
export const DEFAULT_CUSTOM_SOURCE_MAX_QUEUED_BLOCKS = 10_000;
export const DEFAULT_CUSTOM_EVM_BATCH_MAX_COUNT = 3;

// HyperCore produces ~15-20 heights per second, so its defaults must be far
// more aggressive than other kinds to keep up with the chain.
export const DEFAULT_CUSTOM_HYPERCORE_BATCH_MAX_COUNT = 25;
export const DEFAULT_CUSTOM_HYPERCORE_BLOCK_PROCESSING_CONCURRENCY = 4;
export const DEFAULT_CUSTOM_HYPERCORE_MAX_QUEUED_BLOCKS = 50_000;

export type CustomSourceRuntimeMetadata = {
  evm?: {
    chainId?: number;
    latestBlock?: number;
    blockHash?: string;
    fetchedAt: string;
  };
  substrate?: {
    ss58Prefix?: number;
    latestBlock?: number;
    fetchedAt: string;
  };
  solana?: {
    genesisHash?: string;
    latestBlock?: number;
    blockHash?: string;
    fetchedAt: string;
  };
  hypercore?: {
    latestBlock?: number;
    fetchedAt: string;
  };
};

export type CustomSourceMeta = {
  title: string;
  description?: string;
  icons?: {
    default?: string;
  };
  og?: OpenGraphMeta;
};

export type CustomSourceLogPolicy = {
  retentionMs: number;
  maxCount: number | null;
};

export type CustomSource = {
  workspace: string;
  name: string;
  fullname: string;
  public: boolean;
  createdByAccountId?: string;
  kind: CustomSourceKind;
  endpoints: string[];
  substrate?: CustomSourceSubstrateConfig;
  batchMaxCount?: number;
  blockProcessingConcurrency?: number;
  maxQueuedBlocks?: number;
  logs?: CustomSourceLogPolicy;
  meta: CustomSourceMeta;
  runtime?: CustomSourceRuntimeMetadata;
  createdAt: string;
  updatedAt: string;
};

export type CustomSourceListView = Pick<
  CustomSource,
  'workspace' | 'name' | 'fullname' | 'public' | 'kind' | 'meta' | 'createdAt' | 'updatedAt'
> & {
  deployerTitle?: string;
};

export type CustomSourceView = CustomSource;

export type CustomSourceStatusEventType = 'status_changed' | 'error' | 'recovered';

export type CustomSourceStatusValue = 'running' | 'error' | 'degraded';

export type CustomSourceStatusSeverity = 'info' | 'warning' | 'error';

export type CustomSourceStatusEvent = {
  type: CustomSourceStatusEventType;
  sourceFullname: string;
  sourceName: string;
  sourceTitle: string;
  workspace: string;
  kind: CustomSourceKind;
  status: CustomSourceStatusValue;
  previousStatus?: CustomSourceStatusValue;
  severity: CustomSourceStatusSeverity;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: string;
};

export function getCustomSourceStatusTriggerName(params: {
  fullname: string;
  kind: CustomSourceKind;
}): string {
  return `${params.fullname}.${params.kind}.status`;
}

export function getCustomSourceStatusEventNames(sourceFullname: string) {
  return {
    statusChanged: `${sourceFullname}.source-status-changed`,
    error: `${sourceFullname}.source-error`,
    recovered: `${sourceFullname}.source-recovered`,
  } as const;
}
