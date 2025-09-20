import type { ByWorkspace } from './common';
import { type TypeSchema } from './type-schema';
import type { EventSpecShort } from './event-spec';

export type BundleOwner = {
  workspace: string;
  rename: string;
};

export type BundleMeta = {
  title: string;
};

export type Bundle = {
  name: string;
  source: string;
  app: string;
  version: string;
  resources?: BundleResource[];
  customBundleRequest?: CustomBundleRequest;
  owners?: BundleOwner[];
};

export type BundleResource = {
  name: string;
  token?: string;
  blueprint: string;
  commands: [{ set: object | null}];
};

export type BundleShort = {
  name: string;
  source: string;
  app: string;
  version: string;
  custom: boolean;
  meta: BundleMeta;
};

export type BundleWithEvents = {
  name: string;
  source: string;
  app: string;
  version: string;
  resources?: BundleResource[];
  types?: Record<string, TypeSchema>;
  events: EventSpecShort[];
};

export type BundleDump = {
  resource: string;
  spec: {
    app: string;
    name: string;
    version: string;
    resources?: BundleResource[];
    events: EventSpecShort[];
  };
};

export type BundleVisibility = {
  public?: boolean;
  owner?: string;
};

export type BundleSaveParamsRegular = BundleWithEvents & { force?: boolean };

export type BundleSaveParamsCustom = {
  workspace: string;
  rename: string;
  source: string;
  app: string;
  type: string;
  request: object;
};

export type BundleSaveParams = BundleSaveParamsRegular | BundleSaveParamsCustom;

export type BundleListParams = {
  source?: string;
  visibility?: BundleVisibility;
};

export type BundleGetParams = {
  name: string;
  visibility?: BundleVisibility;
};

export type BundleGlobalGetParams = {
  name: string;
};

export type BundleGetIdsByWorkspaceParams = ByWorkspace;

export type BundleRemoveCustomParams = {
  name: string;
  workspace: string;
};

export type CustomBundleRequest = {
  type: string;
  request: object;
};

export type CustomBundleResponse = {
  name: string;
  version: string;
  events: EventSpecShort[];
};
