import type { OpenGraphMeta } from './common';

export type CustomSourceKind = 'evm' | 'substrate';

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
};

export type CustomSourceMeta = {
  title: string;
  description?: string;
  icons?: {
    default?: string;
  };
  og?: OpenGraphMeta;
};

export type CustomSource = {
  workspace: string;
  name: string;
  fullname: string;
  public: boolean;
  createdByAccountId?: string;
  kind: CustomSourceKind;
  endpoint: string;
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

export function getCustomSourceStatusBundleName(sourceFullname: string): string {
  return sourceFullname;
}

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
