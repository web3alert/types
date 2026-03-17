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
