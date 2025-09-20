import { type TypeSchema } from '../type-schema';
import { type Tags, type Labels } from '../common';
import { type KeyOfEvent } from './event';

export type Action = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  backend: ActionBackend;
  values: Record<string, TypeSchema>;
  overrides: KeyOfEvent[];
  tags: Tags;
  labels: Labels;
  meta: ActionMeta;
};

export type ActionBackendSDK = {
  type: 'sdk';
  action: string;
};

export type ActionBackend =
  | ActionBackendSDK
;

export type ActionMeta = {
  title: string;
  description?: string;
};

export type ActionView = Action;
