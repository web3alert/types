import { type TypeSchema } from './type-schema';
import {
  type Labels,
  type ByName,
  type ByNames,
  type ExecutionPolicy,
} from './common';
import { type Event } from './v2';

export type EventSpecParamsSchema = Record<string, TypeSchema>;

export type EventSpecBackendLegacy = {
  type: 'legacy';
};

export type EventSpecBackendSdk = {
  type: 'sdk';
  trigger?: string;
  staticParams?: object;
};

export type EventSpecBackendCanonical =
  | EventSpecBackendLegacy
  | EventSpecBackendSdk
;

export type EventSpecBackendShorthand = EventSpecBackendCanonical['type'];

export type EventSpecBackend =
  | EventSpecBackendCanonical
  | EventSpecBackendShorthand
;

export type EventSpecMeta = {
  scope: string;
  name: string;
  kind: string;
  tags?: string[];
  labels: Labels;
  description: string;
};

export type EventSpec = {
  name: string;
  source: string;
  app: string;
  bundle: string;
  version: string;
  public: boolean;
  schema: EventSpecParamsSchema;
  payload?: object;
  values?: Record<string, TypeSchema>;
  defaults?: Event;
  output?: Record<string, TypeSchema>;
  backend?: EventSpecBackend;
  policy?: ExecutionPolicy;
  meta: EventSpecMeta;
};

export type EventSpecShort = {
  name: string;
  schema: EventSpecParamsSchema;
  payload?: object;
  values?: Record<string, TypeSchema>;
  defaults?: Event;
  output?: Record<string, TypeSchema>;
  backend?: EventSpecBackend;
  policy?: ExecutionPolicy;
  meta: EventSpecMeta;
};

export type EventSpecLegacy = {
  app: string;
  bundle: string;
  name: string;
  schema: EventSpecParamsSchema;
  values?: Record<string, TypeSchema>;
  defaults?: Event;
  output?: Record<string, TypeSchema>;
  policy?: ExecutionPolicy;
  meta: EventSpecMeta;
};

export type EventSpecVisibility = {
  public?: boolean;
  workspaceAndBundles?: {
    workspace: string;
    bundles: string[];
  };
};

export type EventSpecListParams = {
  source?: string;
  bundle?: string;
  visibility?: EventSpecVisibility;
};

export type EventSpecListByNamesParams = ByNames;

export type EventSpecGetParams = ByName & {
  visibility?: EventSpecVisibility;
};

export type EventSpecListPublicLegacyParams = {
  app?: string;
};

export type EventSpecGetPublicLegacyParams = EventSpecGetParams;

export type EventSpecListByBundlesLegacyParams = {
  workspace: string;
  bundles: string[];
} & EventSpecListPublicLegacyParams;

export type EventSpecGetByBundlesLegacyParams = {
  workspace: string;
  bundles: string[];
} & EventSpecGetPublicLegacyParams;
