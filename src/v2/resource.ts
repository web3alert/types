import type { Tags, Labels } from '../common';
import type { TelegramTargetKind } from '../telegram';

export type TelegramResourceDestinationSummary = {
  service: 'telegram';
  title: string;
  kind?: TelegramTargetKind;
  topic?: {
    messageThreadId: number;
    title?: string;
  };
};

export type ResourceDestinationSummary = TelegramResourceDestinationSummary;

export type Resource = {
  id: string;
  name: string;
  fullname: string;
  project?: string;
  workspace: string;
  public: boolean;
  blueprint: string;
  token: string;
  ready: boolean;
  remark: string | null;
  data: object | null;
  tags: Tags;
  labels: Labels;
  meta?: ResourceMeta;
};

export type ResourceMeta = {
  title?: string;
};

export type ResourceViewPublic = {
  id: string;
  name: string;
  fullname: string;
  project?: string;
  workspace: string;
  public: boolean;
  blueprint: string;
  ready: boolean;
  remark: string | null;
  data?: object | null;
  tags: Tags;
  labels: Labels;
  meta?: ResourceMeta;
};

export type ResourceViewPrivate = {
  id: string;
  name: string;
  fullname: string;
  project?: string;
  workspace: string;
  public: boolean;
  blueprint: string;
  token: string;
  ready: boolean;
  remark: string | null;
  data?: object | null;
  tags: Tags;
  labels: Labels;
  meta?: ResourceMeta;
  destinationSummary?: ResourceDestinationSummary;
};

export type ResourceView = ResourceViewPublic | ResourceViewPrivate;

export type ResourceViewShort = {
  id: string;
  name: string;
  fullname: string;
  project?: string;
  workspace: string;
  public: boolean;
  blueprint: string;
  ready: boolean;
  remark: string | null;
  tags: Tags;
  labels: Labels;
  meta?: ResourceMeta;
};
