import type { UserViewShort } from './user';
import type { WorkspaceViewShort } from './workspace';

export type WorkspaceAccessLevel = 'owner' | 'admin' | 'developer' | 'user';

export type AccessEntry = {
  id: string;
  object: AccessReference;
  subject: AccessReference;
  level: WorkspaceAccessLevel;
};

export type AccessReference = {
  type: string;
  id: string;
};

export type UserMembership = {
  id: string;
  level: WorkspaceAccessLevel;
  workspace: WorkspaceViewShort;
};

export type WorkspaceMembership = {
  id: string;
  level: WorkspaceAccessLevel;
  user: UserViewShort;
};
