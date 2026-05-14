import type { Tags, Labels } from '../common';

export type ProjectVisibility = 'public' | 'private_link' | 'personal';

export type ProjectAccessLevel = 'private' | 'public' | 'free';

export type ProjectMetaLink = {
  title: string;
  url: string;
};

export type Project = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  createdByAccountId?: string;
  billingAccountId?: string;
  name: string;
  fullname: string;
  workspace: string;
  public: boolean;
  visibility?: ProjectVisibility;
  accessLevel?: ProjectAccessLevel;
  tags: Tags;
  labels: Labels;
  meta: ProjectMeta;
};

export type ProjectMeta = {
  title: string;
  description: string;
  shortDescription?: string;
  links?: ProjectMetaLink[];
  images?: string[];
  icon?: string;
  avatar?: string;
  cover?: string;
};

export type ProjectView = Project & {
  ownerTitle?: string;
  triggerLimits?: {
    /** Provider weight budget per trigger. The field name is kept for API compatibility. */
    maxProvidersPerTrigger: number | null;
  };
};
