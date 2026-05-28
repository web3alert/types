export type SubscriptionAlertLogStatus =
  | 'delivered'
  | 'failed'
  | 'rate_limited'
  | 'blocked';

export type SubscriptionAlertLogChannel = {
  action: string;
  channel: string;
  ok: boolean;
  target?: {
    resourceFullname?: string;
    title?: string;
  };
  reasonCode?: string;
  reasonMessage?: string;
};

export type SubscriptionAlertLogReplayMatch = {
  hash?: string | null;
  index?: number | null;
};

export type SubscriptionAlertLogConfig = {
  subscriptionNonce?: string;
  subscriptionUpdatedAt?: string;
  ruleIndex?: number;
  runtimeTriggerRevision?: number;
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
  config?: SubscriptionAlertLogConfig;
  channels: SubscriptionAlertLogChannel[];
  failureReasonCode?: string;
  failureReasonMessage?: string;
  expireAt: string;
};

export type SubscriptionAlertLogCreate = Omit<SubscriptionAlertLog, 'id' | 'workspaceId' | 'expireAt'>;
