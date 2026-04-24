import type { TypeSchema } from '../type-schema';
import type { Labels, ExecutionPolicy } from '../common';
import type { Event } from './event';

export type RuntimeTriggerBackendLegacy = {
  type: 'legacy';
};

export type RuntimeTriggerBackendSdk = {
  type: 'sdk';
  trigger?: string;
  staticParams?: Record<string, unknown>;
};

export type RuntimeTriggerBackend =
  | RuntimeTriggerBackendLegacy
  | RuntimeTriggerBackendSdk
;

export type RuntimeTriggerMeta = {
  scope: string;
  name: string;
  title?: string;
  kind: string;
  tags?: string[];
  labels: Labels;
  description: string;
};

export type RuntimeTriggerSpec = {
  fullname: string;
  project: string;
  public: boolean;
  filtersSchema: Record<string, TypeSchema>;
  payload?: object;
  inputs?: Record<string, TypeSchema>;
  defaults?: Event;
  output?: Record<string, TypeSchema>;
  backend?: RuntimeTriggerBackend;
  policy?: ExecutionPolicy;
  meta: RuntimeTriggerMeta;
};
