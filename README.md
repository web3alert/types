# @web3alert/types

Common TypeScript type definitions for the Web3Alert platform.

## Installation

```bash
npm install @web3alert/types
```

## Overview

This package provides comprehensive TypeScript type definitions for the Web3Alert ecosystem — a Web3 notification and automation platform. It includes types for:

- **Workspaces & Projects** — Multi-tenant organizational structures
- **Apps & Triggers** — Event sources and trigger definitions
- **Actions** — Automated response handlers
- **Subscriptions** — User notification subscriptions with conditions and policies
- **Events** — Event specifications and schemas
- **Resources & Blueprints** — Infrastructure configuration
- **Access Control** — User membership and permissions

## Package Structure

```
src/
├── index.ts           # Main entry point with core types
├── common.ts          # Shared utility types (Tags, Labels, etc.)
├── type-schema.ts     # Type schema definitions
├── state.ts           # State management types
├── category.ts        # Category definitions
├── source.ts          # Event source types
├── event-spec.ts      # Event specification types
├── bundle.ts          # Bundle configuration types
├── stats.ts           # Statistics types
├── link.ts            # Link types
└── v2/                # V2 API types
    ├── workspace.ts   # Workspace definitions
    ├── project.ts     # Project definitions
    ├── app.ts         # Application definitions
    ├── event.ts       # Event types
    ├── trigger.ts     # Trigger definitions
    ├── action.ts      # Action definitions
    ├── resource.ts    # Resource definitions
    ├── blueprint.ts   # Blueprint definitions
    ├── acl.ts         # Access control types
    ├── user.ts        # User types
    ├── spec.ts        # Property specifications
    └── typesz.ts      # Type schema collections
```

## Usage

### Import All Types

```typescript
import * from '@web3alert/types';
```

### Import Specific Types

```typescript
import {
  Workspace,
  Project,
  App,
  Trigger,
  Action,
  Event,
  SubscriptionObject,
} from '@web3alert/types';
```

## Core Types

### Account & Identity

```typescript
import { AccountObject, IdentityObject, AddressbookRecordObject } from '@web3alert/types';

// Account with metadata
const account: AccountObject = {
  id: 'acc_123',
  userId: 'user_456',
  createdAt: '2024-01-01T00:00:00Z',
  permissions: ['read', 'write'],
  currentWorkspaceId: 'ws_789',
  meta: { nickname: 'Alice' },
};

// Supported address types
type AddressType = 'plain' | 'ss58' | 'evm' | 'bitcoin' | 'sui' | 'cosmos';
```

### Workspace & Project

```typescript
import { Workspace, Project, WorkspaceMeta } from '@web3alert/types';

const workspace: Workspace = {
  id: 'ws_123',
  name: 'my-workspace',
  fullname: 'org/my-workspace',
  invite: 'invite_code',
  tags: ['production'],
  labels: { env: 'prod' },
  meta: { title: 'My Workspace' },
};

const project: Project = {
  id: 'proj_456',
  name: 'defi-alerts',
  fullname: 'org/my-workspace/defi-alerts',
  workspace: 'ws_123',
  public: true,
  tags: ['defi'],
  labels: {},
  meta: {
    title: 'DeFi Alerts',
    description: 'Real-time DeFi notifications',
  },
};
```

### Triggers & Actions

```typescript
import { Trigger, Action, TriggerBackendSDK, ActionBackendSDK } from '@web3alert/types';

const trigger: Trigger = {
  id: 'trg_123',
  name: 'large-transfer',
  fullname: 'org/project/large-transfer',
  project: 'proj_456',
  workspace: 'ws_123',
  public: true,
  backend: { type: 'sdk', trigger: 'evm.transfer' },
  values: {},
  tags: ['evm', 'transfer'],
  labels: {},
  meta: {
    title: 'Large Transfer',
    description: 'Triggers on transfers above threshold',
  },
};

const action: Action = {
  id: 'act_789',
  name: 'send-telegram',
  fullname: 'org/project/send-telegram',
  project: 'proj_456',
  workspace: 'ws_123',
  public: true,
  backend: { type: 'sdk', action: 'telegram.send' },
  values: {},
  overrides: ['title', 'short'],
  tags: ['notification'],
  labels: {},
  meta: { title: 'Send Telegram Message' },
};
```

### Events

```typescript
import { Event, EventLink } from '@web3alert/types';

const event: Event = {
  title: 'Large Transfer Detected',
  short: '100 ETH transferred',
  long: 'A transfer of 100 ETH was detected from 0x123... to 0x456...',
  icon: 'https://example.com/icon.png',
  cover: null,
  avatar: null,
  links: [
    { title: 'View on Etherscan', url: 'https://etherscan.io/tx/0x...' },
  ],
};
```

### Subscriptions

```typescript
import {
  SubscriptionObject,
  SubscriptionState,
  Condition,
  ConditionAll,
  ExecutionPolicy,
} from '@web3alert/types';

// Subscription states
type SubscriptionState = 'on' | 'off' | 'blocked';

// Condition types for filtering
const condition: ConditionAll = {
  all: [
    { param: 'amount', op: 'gte', value: 1000 },
    { param: 'token', op: 'eq', value: 'ETH' },
  ],
};

// Execution policies
const filterPolicy: ExecutionPolicy = { type: 'filter' };
const monitorPolicy: ExecutionPolicy = { type: 'monitor', key: 'address' };
```

### Resources & Blueprints

```typescript
import { Resource, Blueprint, ObjectSpec } from '@web3alert/types';

const blueprint: Blueprint = {
  id: 'bp_123',
  name: 'evm-node',
  fullname: 'org/project/app/evm-node',
  app: 'app_456',
  project: 'proj_789',
  workspace: 'ws_123',
  public: true,
  type: 'node',
  data: {
    rpcUrl: {
      type: 'string',
      format: 'uri',
      title: 'RPC URL',
      description: 'Ethereum JSON-RPC endpoint',
    },
  },
  tags: ['evm'],
  labels: {},
};

const resource: Resource = {
  id: 'res_123',
  name: 'mainnet-node',
  fullname: 'org/project/mainnet-node',
  workspace: 'ws_123',
  public: false,
  blueprint: 'bp_123',
  token: 'secret_token',
  ready: true,
  remark: null,
  data: { rpcUrl: 'https://mainnet.infura.io/v3/...' },
  tags: [],
  labels: {},
};
```

### Event Specifications

```typescript
import { EventSpec, EventSpecBackend, EventSpecMeta } from '@web3alert/types';

const eventSpec: EventSpec = {
  name: 'evm.transfer',
  source: 'ethereum',
  app: 'app_123',
  bundle: 'bundle_456',
  version: '1.0.0',
  public: true,
  schema: {
    address: {},
    minAmount: {},
  },
  backend: { type: 'sdk', trigger: 'evm.transfer.monitor' },
  policy: { type: 'filter' },
  meta: {
    scope: 'EVM',
    name: 'Transfer',
    kind: 'monitor',
    description: 'Monitors ERC20 and native token transfers',
    labels: {},
  },
};
```

### Bundles

```typescript
import { Bundle, BundleWithEvents } from '@web3alert/types';

const bundle: BundleWithEvents = {
  name: 'ethereum-defi',
  source: 'ethereum',
  app: 'app_123',
  version: '2.0.0',
  events: [
    {
      name: 'swap',
      schema: {},
      meta: {
        scope: 'DEX',
        name: 'Swap',
        kind: 'event',
        description: 'DEX swap event',
        labels: {},
      },
    },
  ],
};
```

### Access Control

```typescript
import { UserMembership, WorkspaceMembership, AccessEntry } from '@web3alert/types';

const membership: UserMembership = {
  id: 'mem_123',
  level: 'admin',
  workspace: {
    id: 'ws_123',
    name: 'my-workspace',
    fullname: 'org/my-workspace',
    tags: [],
    labels: {},
  },
};
```

## Utility Types

### Common Types

```typescript
import { Tags, Labels, ByName, ByNames, ByWorkspace } from '@web3alert/types';

type Tags = string[];
type Labels = Record<string, string>;

// Query parameter types
type ByName = { name: string };
type ByNames = { names: string[] };
type ByWorkspace = { workspace: string };
```

### Primitive Types

```typescript
import { Primitive, Meta, Value, Values, ValueType } from '@web3alert/types';

type Primitive = string | number | boolean | null | Primitive[] | { [key: string]: Primitive };
type Meta = { [key: string]: Primitive };
type Value = string | number;
type Values = Record<string, Value>;
type ValueType = 'unknown' | 'string' | 'number' | 'boolean' | 'null';
```

### State Management

```typescript
import { State, StateSaveParams, StateGetParams } from '@web3alert/types';

const state: State = {
  key: 'last-processed-block',
  value: { blockNumber: 12345678 },
};
```

## View Types

Many entities have multiple view types for different access levels:

- **Public View** — Excludes sensitive data (tokens, internal URLs)
- **Private View** — Includes all data for authorized users
- **Short View** — Minimal representation for listings

```typescript
import {
  WorkspaceViewPublic,
  WorkspaceViewPrivate,
  WorkspaceViewShort,
  AppViewPublic,
  AppViewPrivate,
  ResourceViewPublic,
  ResourceViewPrivate,
} from '@web3alert/types';
```

## Development

### Build

```bash
npm run build
```

### TypeScript Configuration

The package is compiled with strict TypeScript settings:

- Target: ES2022
- Module: CommonJS
- Strict mode enabled
- Source maps included

## License

MIT © Web3Alert Team

## Links

- [Web3Alert Website](https://web3alert.io)
- [Documentation](https://docs.web3alert.io)
