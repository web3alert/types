export type ProjectAccessLinkState = 'active' | 'revoked';

export type ProjectAccessLink = {
  id: string;
  project: string;
  workspace: string;
  token: string;
  ownerAccountId: string;
  state: ProjectAccessLinkState;
  maxUsages?: number;
  used: number;
  expiresAt?: string;
  createdAt: string;
};
