import type {
  ByName,
  ByNames,
  OpenGraphMeta,
} from './common';

export type SourceCategory = {
  category: string;
  index: number;
};

export type SourceMeta = {
  title: string;
  description: string;
  icons: {
    default: string;
  };
  og?: OpenGraphMeta;
};

export type Source = {
  name: string;
  categories: SourceCategory[];
  meta: SourceMeta;
  index: number;
};

export type SourcePublic = Omit<Source, 'index'>;

export type SourceVisibility = {
  workspace?: string;
  public?: boolean;
};

export type SourceSaveParams = Source;

export type SourceListParams = {
  visibility?: SourceVisibility;
};

export type SourceListByNamesParams = ByNames;

export type SourceGetParams = { visibility?: SourceVisibility } & ByName;
