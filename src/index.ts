import { type ExecutionPolicy } from './common';
import { type TypeSchema } from './type-schema';
import { type AccountTier } from './account-tier';
import {
  type Workspace,
  type UserMembership,
  type Event,
} from './v2';

export * from './v2';

export * from './type-schema';
export * from './common';
export * from './state';
export * from './category';
export * from './source';
export * from './custom-source';
export * from './event-spec';
export * from './bundle';
export * from './stats';
export * from './link';
export * from './account-tier';
export * from './subscription-alert-log';
export * from './custom-source-log';

export type ById = {
  id: string;
};

export type Primitive = string | number | boolean | null | Primitive[] | {
  [key: string]: Primitive;
};

export type Meta = {
  [key: string]: Primitive;
}

export type ValueType = 'unknown' | 'string' | 'number' | 'boolean' | 'null';

export type Value = string | number;

export type Values = Record<string, Value>;

export type AccountMeta = {
  nickname: string;
  avatar?: string;
};

export type AccountObject = {
  id: string;
  userId: string;
  createdAt: string;
  tier?: AccountTier;
  permissions: string[];
  settings?: object;
  currentWorkspaceId: string | null;
  meta: AccountMeta;
};

export type IdentityMeta = {
  title: string;
};

export type IdentityObjectRaw = {
  id: string;
  accountId: string;
  appId: string;
  app: string;
  identity: string;
  meta: IdentityMeta;
};

export type IdentityObject = {
  id: string;
  appId: string;
  identity: string;
  meta: IdentityMeta;
};

export type AddressType = 'plain' | 'ss58' | 'evm' | 'bitcoin' | 'sui' | 'cosmos';

export type AddressbookRecordObjectRaw = {
  id: string;
  accountId: string;
  type: AddressType;
  address: string;
  alias: string;
};

export type AddressbookRecordObject = {
  id: string;
  type: AddressType;
  address: string;
  alias: string;
};

export type AppIconsSourceLegacy = {
  default: string;
  disabled: string;
};

export type AppIconsChannelLegacy = {
  default: string;
  table: string;
};

export type AppMetaLegacy = {
  title: string;
  icons?: AppIconsSourceLegacy | AppIconsChannelLegacy;
};

export type AppFeatureLegacy = 'source' | 'channel' | 'custom-identity';

export type AppObjectRawLegacy = {
  id: string;
  name: string;
  url: string;
  meta: AppMetaLegacy;
  index: number;
  features: AppFeatureLegacy[];
  class: string;
  permissions: string[];
  identityRegExp?: string;
  v2?: {
    workspace: string;
    project: string;
    app: string;
  };
};

export type AppObjectLegacy = {
  id: string;
  name: string;
  meta: object;
  features: AppFeatureLegacy[];
};

export type TokenType = 'app' | 'account';

export type TokenRootPayload = {
};

export type TokenAppPayload = {
  app: string;
};

export type TokenAccountPayload = {
  accountId: string;
  identityId: string;
};

export type TokenObject = {
  token: string;
  createdAt: string;
  type: TokenType;
  payload: TokenRootPayload | TokenAppPayload | TokenAccountPayload;
};

export type ConditionValue = {
  op: string;
  value: Value;
};

export type ConditionContains = {
  contains: Condition;
};

export type ConditionSelect = {
  param: string;
  condition: Condition;
};

export type ConditionSelectValue = {
  param: string;
  op: string;
  value: Value;
};

export type ConditionAll = {
  all: Condition[];
}

export type ConditionAny = {
  any: Condition[];
}

export type Condition =
  | ConditionSelectValue
  | ConditionSelect
  | ConditionValue
  | ConditionContains
  | ConditionAll
  | ConditionAny
;

export type ConditionTopLevel = ConditionAll | ConditionAny | null;

export type RuleTriggerReferenceMeta = {
  scope: string;
  name: string;
  title?: string;
  description?: string;
};

export type RuleTriggerReference = {
  name: string;
  meta: RuleTriggerReferenceMeta;
};

export type SubscriptionTemplateGroupMeta = {
  title: string;
  description: string;
};

export type SubscriptionTemplateGroup = {
  name: string;
  meta: SubscriptionTemplateGroupMeta;
};

export type SubscriptionTemplateTopicMeta = {
  title: string;
};

export type SubscriptionTemplateTopic = {
  name: string;
  group: string;
  selectedByDefault: boolean;
  meta: SubscriptionTemplateTopicMeta;
};

export type SubscriptionTemplateRuleRaw = {
  id: string;
  topic: string;
  deprecated: boolean;
  event: string;
  inputs?: object;
  policy?: ExecutionPolicy;
  conditions?: ConditionTopLevel;
  requiredValues: string[];
};

export type SubscriptionTemplateObjectRawBody = {
  app: string;
  schema: Record<string, TypeSchema>;
  groups: SubscriptionTemplateGroup[];
  topics: SubscriptionTemplateTopic[];
  rules: SubscriptionTemplateRuleRaw[];
  meta: Meta;
};

export type SubscriptionTemplateObjectRaw = ById & SubscriptionTemplateObjectRawBody;

export type SubscriptionTemplateRule = {
  id: string;
  topic: string;
  group: string;
  deprecated: boolean;
  event: RuleTriggerReference;
  inputs?: object;
  policy?: ExecutionPolicy;
  conditions?: ConditionTopLevel;
  requiredValues: string[];
  selectedByDefault: boolean;
  meta: SubscriptionTemplateTopicMeta;
};

export type SubscriptionTemplateObject = {
  id: string;
  app: string;
  schema: Record<string, TypeSchema>;
  groups: SubscriptionTemplateGroup[];
  topics: SubscriptionTemplateTopic[];
  rules: SubscriptionTemplateRule[];
  meta: Meta;
};

export type SubscriptionState = 'on' | 'off' | 'blocked';

export type SubscriptionTemplateReferenceRawLegacy = {
  id: string;
  inputs: Values;
  rules: string[];
};

export type SubscriptionTemplateReferenceRawUpgraded = {
  id: string;
  inputs: Values;
  topics: string[];
};

export type SubscriptionTemplateReferenceRawBoth =
  | SubscriptionTemplateReferenceRawLegacy
  | SubscriptionTemplateReferenceRawUpgraded
;

export type SubscriptionRuleRaw = {
  trigger: string;
  payload?: object;
  inputs?: object;
  policy?: ExecutionPolicy;
  conditions?: ConditionTopLevel;
};

export type SubscriptionRuleExecutionState = {
  v: '2';
  data: {
    [key: string]: {
      state: {
        status: 'standby' | 'warmup' | 'firing' | 'cooldown';
        changed: number;
      };
      seen: number;
    };
  };
};

export type SubscriptionExecuting = Record<string, SubscriptionRuleExecutionState>;

export type SubscriptionAction = {
  action: string;
  values: Record<string, unknown>;
  overrides?: Event;
};

export type SubscriptionReferences = {
  sources: string[];
  apps: string[];
  bundles: string[];
  triggers: string[];
};

export type SubscriptionMeta = {
  title?: string;
  issue?: string;
};

export type SubscriptionObjectRaw = {
  id: string;
  accountId: string;
  targetWorkspaceFullname?: string;
  createdByAccountId?: string;
  sourceProjectFullname?: string;
  countsTowardsTierQuota?: boolean;
  state: SubscriptionState;
  app: string;
  createdAt: string;
  updatedAt: string;
  template: SubscriptionTemplateReferenceRawUpgraded | null;
  rules: SubscriptionRuleRaw[];
  executing?: SubscriptionExecuting | null;
  identities: string[];
  actions?: SubscriptionAction[];
  references: SubscriptionReferences;
  meta?: SubscriptionMeta;
  nonce: string;
};

export type SubscriptionTemplateReferenceGroupMeta = {
  title: string;
};

export type SubscriptionTemplateReferenceGroup = {
  name: string;
  meta: SubscriptionTemplateReferenceGroupMeta;
};

export type SubscriptionTemplateReferenceRule = {
  id: string;
  group: string;
};

export type SubscriptionTemplateReference = {
  id: string;
  inputs: Values;
  groups: SubscriptionTemplateReferenceGroup[];
  topics: string[];
  rules: SubscriptionTemplateReferenceRule[];
};

export type SubscriptionRule = {
  trigger: RuleTriggerReference;
  inputs?: object;
  policy?: ExecutionPolicy;
  conditions?: ConditionTopLevel;
};

export type SubscriptionObject = {
  id: string;
  targetWorkspaceFullname?: string;
  createdByAccountId?: string;
  sourceProjectFullname?: string;
  countsTowardsTierQuota?: boolean;
  state: SubscriptionState;
  app: string;
  createdAt: string;
  updatedAt: string;
  template: SubscriptionTemplateReference | null;
  rules: SubscriptionRule[];
  identities: string[];
  actions?: SubscriptionAction[];
  references: SubscriptionReferences;
  meta?: SubscriptionMeta;
};

export type SubscriptionCounters = {
  source: string;
  active: number;
  blocked: number;
  total: number;
};

export type Counters = {
  subscriptions: SubscriptionCounters[];
};

export type Me = {
  id: string;
  newid: string;
  tier?: AccountTier;
  settings: object;
  meta: AccountMeta;
  
  token: { identity: string };
  workspace: Workspace | null;
  memberships: UserMembership[];
  identities: IdentityObject[];
  addressbook: AddressbookRecordObject[];
  subscriptions: Record<string, number>;
  counters: Counters;
};

export type EngineWorkspaceObject = {
  id: string;
  tier?: AccountTier;
  subscriptionTiers?: Record<string, AccountTier>;
  identities: IdentityObjectRaw[];
  addressbook: AddressbookRecordObjectRaw[];
  subscriptions: SubscriptionObjectRaw[];
};
