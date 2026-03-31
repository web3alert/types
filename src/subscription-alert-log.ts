export type SubscriptionAlertLogStatus =
  | 'delivered'
  | 'failed'
  | 'rate_limited'
  | 'blocked';

export type SubscriptionAlertLogChannel = {
  action: string;
  channel: string;
  ok: boolean;
  reasonCode?: string;
  reasonMessage?: string;
};

export type SubscriptionAlertLogReplayMatch = {
  hash?: string | null;
  index?: number | null;
};

export type SubscriptionAlertLog = {
  id: string;
  subscriptionId: string;
  workspaceId: string;
  projectFullname?: string;
  triggerFullname?: string;
  eventName: string;
  createdAt: string;
  status: SubscriptionAlertLogStatus;
  testInput?: Record<string, unknown>;
  itemIndex?: number;
  replayMatch?: SubscriptionAlertLogReplayMatch;
  sourceItemsCount?: number;
  channels: SubscriptionAlertLogChannel[];
  failureReasonCode?: string;
  failureReasonMessage?: string;
  expireAt: string;
};

export type SubscriptionAlertLogCreate = Omit<SubscriptionAlertLog, 'id' | 'workspaceId' | 'expireAt'>;
