import type { TypeSchema } from '../type-schema';
import type { Tags, Labels } from '../common';
import type { Event } from './event';

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
