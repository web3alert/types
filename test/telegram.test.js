const assert = require('node:assert/strict');
const test = require('node:test');
const {
  isTelegramTarget,
  TELEGRAM_TARGET_KINDS,
} = require('../dist');

test('accepts an existing Telegram target without additive fields', () => {
  assert.equal(isTelegramTarget({
    status: 'ready',
    id: '-1001234567890',
    title: 'Alerts',
  }), true);
});

test('accepts channel and forum topic targets', () => {
  assert.deepEqual(TELEGRAM_TARGET_KINDS, [
    'private',
    'group',
    'supergroup',
    'channel',
  ]);
  assert.equal(isTelegramTarget({
    status: 'ready',
    id: '-1001234567890',
    title: 'Protocol alerts',
    kind: 'supergroup',
    messageThreadId: 42,
  }), true);
  assert.equal(isTelegramTarget({
    status: 'ready',
    id: '-1009876543210',
    title: 'Announcements',
    kind: 'channel',
  }), true);
});

test('rejects malformed Telegram targets', () => {
  for (const value of [
    null,
    [],
    { status: 'pending', id: '-1001', title: 'Alerts' },
    { status: 'ready', id: -1001, title: 'Alerts' },
    { status: 'ready', id: '-1001', title: 42 },
    { status: 'ready', id: '-1001', title: 'Alerts', kind: 'forum' },
    { status: 'ready', id: '-1001', title: 'Alerts', kind: null },
    { status: 'ready', id: '-1001', title: 'Alerts', messageThreadId: '42' },
    { status: 'ready', id: '-1001', title: 'Alerts', messageThreadId: null },
    { status: 'ready', id: '-1001', title: 'Alerts', messageThreadId: 0 },
    { status: 'ready', id: '-1001', title: 'Alerts', messageThreadId: 1.5 },
  ]) {
    assert.equal(isTelegramTarget(value), false, JSON.stringify(value));
  }
});
