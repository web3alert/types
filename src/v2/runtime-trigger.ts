import type { TypeSchema } from '../type-schema';
import type { Labels, ExecutionPolicy } from '../common';
import type { Event } from './event';

export type RuntimeTriggerBackendSdk = {
  type: 'sdk';
  trigger?: string;
  staticParams?: Record<string, unknown>;
};

export type RuntimeTriggerBackend = RuntimeTriggerBackendSdk;

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
  id?: string;
  fullname: string;
  projectId?: string;
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
