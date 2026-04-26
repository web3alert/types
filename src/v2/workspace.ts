import type { Tags, Labels } from '../common';

export type WorkspaceMeta = {
  title?: string;
};

export type Workspace = {
  id: string;
  fullname: string;
  invite: string;
  tags: Tags;
  labels: Labels;
  meta?: WorkspaceMeta;
};

export type WorkspaceViewPublic = {
  id: string;
  fullname: string;
  tags: Tags;
  labels: Labels;
  meta?: WorkspaceMeta;
};

export type WorkspaceViewPrivate = WorkspaceViewPublic & {
  invite: string;
};

export type WorkspaceView = WorkspaceViewPublic | WorkspaceViewPrivate;

export type WorkspaceViewShort = {
  id: string;
  fullname: string;
  tags: Tags;
  labels: Labels;
  meta?: WorkspaceMeta;
};
