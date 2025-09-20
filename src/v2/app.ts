import type { Tags, Labels } from '../common';

export type App = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  url: string;
  tags: Tags;
  labels: Labels;
};

export type AppViewPublic = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  tags: Tags;
  labels: Labels;
};

export type AppViewPrivate = AppViewPublic & {
  url: string;
};

export type AppView = AppViewPublic | AppViewPrivate;

export type AppViewShort = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  tags: Tags;
  labels: Labels;
};
