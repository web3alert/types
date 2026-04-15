export type AccountTier = 'free' | 'advanced' | 'pro';

export type TierRateLimit = {
  bucketSize: number;
  tokensPerInterval: number;
  interval: number;
};

export type TierNotificationRateLimit = TierRateLimit & {
  queueCutoff: number;
};

export type AccountTierLimits = {
  canCreateProjects: boolean;
  canEditProjects: boolean;
  canManageProjectTriggers: boolean;
  canManageProjectTemplates: boolean;
  canManageCustomSources: boolean;
  canRunTests: boolean;
  maxCountedSubscriptions: number | null;
  maxCustomSources: number | null;
  maxPrivateProjects: number | null;
  maxTriggersPerProject: number | null;
  maxTriggersPerPrivateProject: number | null;
  maxProvidersPerTrigger: number | null;
  notificationRatePerSubscription: TierNotificationRateLimit;
  notificationRatePerWorkspace: TierRateLimit;
  testRateLimit: TierRateLimit | null;
  alertHistoryRetentionMs: number | null;
  alertHistoryMaxCount: number | null;
  customSourceLogRetentionMs: number | null;
  customSourceLogMaxCount: number | null;
};

export const DEFAULT_ACCOUNT_TIER: AccountTier = 'free';

const DAY = 24 * 60 * 60 * 1000;

export function getAccountTier(
  account: {
    tier?: AccountTier;
  } | undefined | null,
): AccountTier {
  return account?.tier ?? DEFAULT_ACCOUNT_TIER;
}

export function getAccountTierLimits(tier: AccountTier): AccountTierLimits {
  switch (tier) {
    case 'advanced':
      return {
        canCreateProjects: true,
        canEditProjects: true,
        canManageProjectTriggers: true,
        canManageProjectTemplates: true,
        canManageCustomSources: true,
        canRunTests: true,
        maxCountedSubscriptions: null,
        maxCustomSources: 1,
        maxPrivateProjects: 1,
        maxTriggersPerProject: null,
        maxTriggersPerPrivateProject: 50,
        maxProvidersPerTrigger: 3,
        notificationRatePerSubscription: {
          bucketSize: 10,
          tokensPerInterval: 1,
          interval: 1000,
          queueCutoff: 50,
        },
        notificationRatePerWorkspace: {
          bucketSize: 30,
          tokensPerInterval: 5,
          interval: 1000,
        },
        testRateLimit: {
          bucketSize: 1,
          tokensPerInterval: 1,
          interval: 1000,
        },
        alertHistoryRetentionMs: 7 * DAY,
        alertHistoryMaxCount: 25_000,
        customSourceLogRetentionMs: 7 * DAY,
        customSourceLogMaxCount: 25_000,
      };
    case 'pro':
      return {
        canCreateProjects: true,
        canEditProjects: true,
        canManageProjectTriggers: true,
        canManageProjectTemplates: true,
        canManageCustomSources: true,
        canRunTests: true,
        maxCountedSubscriptions: null,
        maxCustomSources: 5,
        maxPrivateProjects: 5,
        maxTriggersPerProject: 200,
        maxTriggersPerPrivateProject: 200,
        maxProvidersPerTrigger: 5,
        notificationRatePerSubscription: {
          bucketSize: 20,
          tokensPerInterval: 3,
          interval: 1000,
          queueCutoff: 150,
        },
        notificationRatePerWorkspace: {
          bucketSize: 100,
          tokensPerInterval: 20,
          interval: 1000,
        },
        testRateLimit: {
          bucketSize: 5,
          tokensPerInterval: 5,
          interval: 1000,
        },
        alertHistoryRetentionMs: 30 * DAY,
        alertHistoryMaxCount: 100_000,
        customSourceLogRetentionMs: 30 * DAY,
        customSourceLogMaxCount: 100_000,
      };
    case 'free':
    default:
      return {
        canCreateProjects: false,
        canEditProjects: false,
        canManageProjectTriggers: false,
        canManageProjectTemplates: false,
        canManageCustomSources: false,
        canRunTests: false,
        maxCountedSubscriptions: 5,
        maxCustomSources: 0,
        maxPrivateProjects: 0,
        maxTriggersPerProject: 0,
        maxTriggersPerPrivateProject: 0,
        maxProvidersPerTrigger: 0,
        notificationRatePerSubscription: {
          bucketSize: 3,
          tokensPerInterval: 0.25,
          interval: 1000,
          queueCutoff: 15,
        },
        notificationRatePerWorkspace: {
          bucketSize: 10,
          tokensPerInterval: 1,
          interval: 1000,
        },
        testRateLimit: null,
        alertHistoryRetentionMs: null,
        alertHistoryMaxCount: null,
        customSourceLogRetentionMs: null,
        customSourceLogMaxCount: null,
      };
  }
}

export function isTierLimitReached(limit: number | null, current: number): boolean {
  return limit != null && current >= limit;
}

const ACCOUNT_TIER_ORDER: Record<AccountTier, number> = {
  free: 0,
  advanced: 1,
  pro: 2,
};

export function maxAccountTier(tiers: AccountTier[]): AccountTier {
  return tiers.reduce<AccountTier>((current, next) => {
    return ACCOUNT_TIER_ORDER[next] > ACCOUNT_TIER_ORDER[current]
      ? next
      : current;
  }, DEFAULT_ACCOUNT_TIER);
}
