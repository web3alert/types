# Web3Alert Platform Types

This document describes the native next/marketplace type model exported by `@web3alert/types`.

The package is the shared contract between API, UI, engine, devourer, marketplace controller, MCP server,
and integration services.

## Import Style

```ts
import type {
  Project,
  Trigger,
  SubscriptionObjectRaw,
  Resource,
  Blueprint,
  Action,
} from '@web3alert/types';
```

## Naming

Most persisted marketplace entities have the same identity layout:

```ts
type EntityIdentity = {
  id: string;
  name: string;
  fullname: string;
  workspace: string;
  project?: string;
  public: boolean;
};
```

Rules:

- `name` is local to the owner scope.
- `fullname` is the stable global key.
- project-owned entities usually use `${project}.${name}`.
- workspace-owned entities usually use `${workspace}.${name}`.
- `common`/`web3alert` are reserved system namespaces.

## Common Utility Types

```ts
type Tags = string[];
type Labels = Record<string, string>;
type TypeSchema = JsonSchemaLikeObject;
type Event = {
  title?: string;
  short?: string;
  long?: string;
  icon?: string | null;
  cover?: string | null;
  avatar?: string | null;
  links?: { title: string; url: string }[];
};
```

`TypeSchema` is used for trigger inputs, filter schemas, output schemas, action values, and template schemas.

Special schema extension:

```json
{
  "type": "string",
  "io.ryabina.notify": {
    "type": "balance",
    "decimals": 18
  }
}
```

`balance` values are represented as strings in raw output. Static `decimals` allows pre-filter conversion.

Cascade metadata describes how UI should pick one primitive value through dependent lookups. It does
not change the saved condition shape:

```json
{
  "eventSlug": {
    "type": "string",
    "io.ryabina.notify": {
      "type": "cascade",
      "steps": [
        { "id": "series", "label": "Series", "lookupRef": "ActiveSeriesSlug" },
        {
          "id": "event",
          "label": "Event",
          "lookupRef": "ActiveEventSlug",
          "dependsOn": { "series": "$series" }
        }
      ]
    }
  }
}
```

If the user picks an event, the subscription still stores a regular condition for
`eventSlug` with the selected string value.

## Workspace

```ts
type Workspace = {
  id: string;
  fullname: string;
  invite: string;
  tags: Tags;
  labels: Labels;
  meta?: { title?: string };
};
```

Views:

- `WorkspaceViewPublic` hides `invite`.
- `WorkspaceViewPrivate` includes `invite`.
- `WorkspaceViewShort` is a compact list shape.

## Project

```ts
type Project = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  createdByAccountId?: string;
  billingAccountId?: string;
  name: string;
  fullname: string;
  workspace: string;
  public: boolean;
  visibility?: 'public' | 'private_link' | 'personal';
  accessLevel?: 'private' | 'public' | 'free';
  tags: Tags;
  labels: Labels;
  meta: {
    title: string;
    description: string;
    shortDescription?: string;
    links?: { title: string; url: string }[];
    images?: string[];
    icon?: string;
    avatar?: string;
    cover?: string;
  };
};
```

Project owns triggers, templates, types, actions, and optionally resources.

`accessLevel` controls how project triggers are available:

- `private`: owner/workspace access only.
- `public`: public project, but may require user tier.
- `free`: project triggers are available to every tier through billing add-on.

## App

```ts
type App = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  url: string;
  tags: Tags;
  labels: Labels;
};
```

`App` is a runtime/auth service registry entry. It is not a subscription target.

Current uses:

- auth services such as Google and Telegram;
- external resource linking endpoints;
- runtime service registration for blueprints.

Subscriptions use `Resource` and `Action`, not `App`.

## Blueprint

```ts
type Blueprint = {
  id: string;
  name: string;
  fullname: string;
  app: string;
  project: string;
  workspace: string;
  public: boolean;
  type: 'plain' | 'external' | string;
  data?: ObjectSpec;
  tags: Tags;
  labels: Labels;
  meta?: {
    title?: string;
    description?: string;
  };
};
```

Blueprint defines how a resource is configured.

- `plain`: resource `data` is entered directly and validated by `data`.
- `external`: resource is linked by external service flow using resource token.

## Resource

```ts
type Resource = {
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
  meta?: { title?: string };
};
```

Resource is a configured delivery target or runtime credential set.

Examples:

- Telegram chat;
- Discord webhook;
- Slack webhook;
- generic webhook endpoint.

Private views include `token`; public/short views do not.

## Action

```ts
type Action = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  backend: {
    type: 'sdk';
    action: string;
  };
  values: Record<string, TypeSchema>;
  overrides: Array<keyof Event>;
  tags: Tags;
  labels: Labels;
  meta: {
    title: string;
    description?: string;
  };
};
```

Action describes a callable delivery handler. Subscription action entries bind an action to concrete values
and optional message overrides.

## Trigger

```ts
type Trigger = {
  id: string;
  name: string;
  fullname: string;
  project: string;
  workspace: string;
  public: boolean;
  backend: {
    type: 'sdk';
    trigger: string;
    values?: Record<string, unknown>;
  };
  inputs: Record<string, TypeSchema>;
  defaults?: Event;
  triggerSpec?: TriggerSpec;
  providerRefs?: string[];
  filtersSchema?: Record<string, TriggerOutputSchemaField>;
  outputSchema?: Record<string, TriggerOutputSchemaField>;
  transformRef?: string;
  executionPolicy?: TriggerExecutionPolicy;
  tags: Tags;
  labels: Labels;
  meta: {
    title: string;
    description?: string;
  };
};
```

`backend.type` is always `sdk` in the next model.

`triggerSpec.typesRef` can override where the subscription UI loads reusable type schemas:

```ts
type TriggerTypesRef =
  | { type: 'source'; source: string }
  | {
      type: 'api';
      url: string;
      lookupUrl?: string;
      method?: 'GET' | 'POST';
      headers?: Record<string, string>;
      body?: unknown;
    }
  | { type: 'inline'; schemas: Record<string, TypeSchema> };
```

When `typesRef` is omitted, the UI keeps the legacy behavior: trigger-scoped types first, then
source/project fallback where available. `api.url` returns the type catalog; optional `api.lookupUrl`
returns dynamic lookup options for metadata such as cascade controls.

### TriggerSpec

```ts
type TriggerSpec =
  | {
      type: 'evm_log';
      network?: string;
      chain?: string;
      contract?: string;
      event?: string;
      abiFragment?: string;
      topicsCount?: number;
      dataBytes?: number;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'evm_transaction';
      network?: string;
      chain?: string;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'substrate_event';
      network?: string;
      chain?: string;
      pallet?: string;
      event?: string;
      testInput?: Record<string, unknown>;
    }
  | {
      type: 'timer';
      interval: string;
      testInput?: Record<string, unknown>;
    };
```

For EVM logs, `topicsCount` and `dataBytes` are part of event identity. They disambiguate events with the
same signature but different indexed/non-indexed layout.

### Providers

```ts
type TriggerProvider =
  | TriggerHttpProvider
  | TriggerGraphqlProvider
  | TriggerRpcEndpointProvider
  | TriggerRpcSourceProvider
  | TriggerSubstrateStorageProvider
  | TriggerEvmReadProvider
  | TriggerStateWindowProvider
  | TriggerJavascriptProvider;
```

Provider output is available under `providers.<providerId>` in transforms.

Provider templating can reference:

- `source.*`
- `inputs.*`
- `providers.*`

## Runtime Trigger

```ts
type RuntimeTriggerSpec = {
  fullname: string;
  project: string;
  public: boolean;
  filtersSchema: Record<string, TypeSchema>;
  payload?: object;
  inputs?: Record<string, TypeSchema>;
  defaults?: Event;
  outputSchema?: Record<string, TriggerOutputSchemaField>;
  backend?: {
    type: 'sdk';
    trigger?: string;
    staticParams?: Record<string, unknown>;
  };
  policy?: ExecutionPolicy;
  meta: {
    scope: string;
    name: string;
    title?: string;
    kind: string;
    tags?: string[];
    labels: Labels;
    description: string;
  };
};
```

Runtime trigger is the engine-facing view. If `backend.trigger` is omitted, engine uses `fullname`.

## Subscription

```ts
type SubscriptionObjectRaw = {
  id: string;
  accountId: string;
  targetWorkspaceFullname?: string;
  createdByAccountId?: string;
  sourceProjectFullname?: string;
  countsTowardsTierQuota?: boolean;
  state: 'on' | 'off' | 'blocked';
  createdAt: string;
  updatedAt: string;
  template: SubscriptionTemplateReferenceRaw | null;
  rules: SubscriptionRuleRaw[];
  executing?: SubscriptionExecuting | null;
  resources: string[];
  actions?: SubscriptionAction[];
  references: {
    sources: string[];
    projects: string[];
    triggers: string[];
  };
  meta?: {
    title?: string;
    issue?: string;
  };
  nonce: string;
};
```

`SubscriptionObjectRaw` is the persisted/runtime form.

```ts
type SubscriptionRuleRaw = {
  trigger: string;
  payload?: object;
  inputs?: object;
  policy?: ExecutionPolicy;
  conditions?: ConditionTopLevel;
};
```

`conditions.param` uses trigger `filtersSchema` field names, not `raw.*` or `human.*`.

```ts
type SubscriptionAction = {
  action: string;
  values: Record<string, unknown>;
  overrides?: Event;
};
```

`actions[].values` binds action inputs to concrete resource/action values.

## Project Templates

Project templates are stored as `SubscriptionTemplateObjectRaw`.

```ts
type SubscriptionTemplateObjectRaw = {
  id: string;
  project: string;
  schema: Record<string, TypeSchema>;
  groups: SubscriptionTemplateGroup[];
  topics: SubscriptionTemplateTopic[];
  rules: SubscriptionTemplateRuleRaw[];
  meta: Record<string, Primitive>;
};
```

Templates are project-owned preset subscription recipes. They are not standalone subscriptions.

## Identity

```ts
type IdentityObjectRaw = {
  id: string;
  accountId: string;
  appId: string;
  app: string;
  identity: string;
  meta: {
    title: string;
  };
};
```

Identity is used for authentication/linking. Delivery targets belong in `Resource`.

## Compatibility Policy

The next model does not expose legacy backend types. The explicit backend type is `sdk`.

Allowed historical terms that remain:

- `Raw`: persisted or engine-facing shape.
- `App`: runtime/auth service registry.
- `Identity`: auth identity.

Disallowed in new persisted data:

- subscription targets based on `app`;
- trigger backend `{ type: 'legacy' }`;
- inline trigger `providers`;
- inline trigger `transform`;
- legacy event spec proxies.
