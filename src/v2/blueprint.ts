import type { Tags, Labels } from '../common';
import type { ObjectSpec } from './spec';

export type Blueprint = {
  id: string;
  name: string;
  fullname: string;
  app: string;
  project: string;
  workspace: string;
  public: boolean;
  type: string;
  data?: ObjectSpec;
  tags: Tags;
  labels: Labels;
  meta?: BlueprintMeta;
};

export type BlueprintMeta = {
  title?: string;
  description?: string;
};
