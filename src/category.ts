import type { ByName } from './common';

export type CategoryMeta = {
  title: string;
};

export type Category = {
  name: string;
  meta: CategoryMeta;
  index: number;
};

export type CategorySaveParams = Category;

export type CategoryListParams = {};

export type CategoryGetParams = ByName;
