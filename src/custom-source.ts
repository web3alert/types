import type { OpenGraphMeta } from './common';

export type CustomSourceKind = 'evm' | 'substrate';

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
  kind: CustomSourceKind;
  endpoint: string;
  meta: CustomSourceMeta;
  createdAt: string;
  updatedAt: string;
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
