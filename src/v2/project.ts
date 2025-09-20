import type { Tags, Labels } from '../common';

export type Project = {
  id: string;
  name: string;
  fullname: string;
  workspace: string;
  public: boolean;
  tags: Tags;
  labels: Labels;
  meta: ProjectMeta;
};

export type ProjectMeta = {
  title: string;
  description: string;
  icon?: string;
  avatar?: string;
  cover?: string;
};

export type ProjectView = Project;
