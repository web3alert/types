import type { UserViewShort } from './user';
import type { WorkspaceViewShort } from './workspace';

export type AccessEntry = {
  id: string;
  object: AccessReference;
  subject: AccessReference;
  level: string;
};

export type AccessReference = {
  type: string;
  id: string;
};

export type UserMembership = {
  id: string;
  level: string;
  workspace: WorkspaceViewShort;
};

export type WorkspaceMembership = {
  id: string;
  level: string;
  user: UserViewShort;
};
