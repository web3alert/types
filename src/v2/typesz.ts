import type { TypeSchema } from '../type-schema';
import type { Tags, Labels } from '../common';

export type Types = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  schemas: Record<string, TypeSchema>;
  tags: Tags;
  labels: Labels;
  meta?: Partial<TypesMeta>;
};

export type TypesMeta = {
  title: string;
  description: string;
};

export type TypesView = Types;
