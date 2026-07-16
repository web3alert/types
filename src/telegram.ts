export const TELEGRAM_TARGET_KINDS = [
  'private',
  'group',
  'supergroup',
  'channel',
] as const;

export type TelegramTargetKind = typeof TELEGRAM_TARGET_KINDS[number];

export const TELEGRAM_TOPIC_TITLE_MAX_LENGTH = 128;

export type TelegramTarget = {
  status: 'ready';
  id: string;
  title: string;
  kind?: TelegramTargetKind;
  messageThreadId?: number;
  topicTitle?: string;
  topicLabel?: string;
};

export function isTelegramTarget(value: unknown): value is TelegramTarget {
  if (!value || typeof value != 'object' || Array.isArray(value)) {
    return false;
  }

  const target = value as Record<string, unknown>;
  if (
    target['status'] != 'ready'
    || typeof target['id'] != 'string'
    || typeof target['title'] != 'string'
  ) {
    return false;
  }

  const kind = target['kind'];
  if (
    kind !== undefined
    && !TELEGRAM_TARGET_KINDS.includes(kind as TelegramTargetKind)
  ) {
    return false;
  }

  const messageThreadId = target['messageThreadId'];
  if (
    messageThreadId !== undefined
    && (
      typeof messageThreadId != 'number'
      || !Number.isSafeInteger(messageThreadId)
      || messageThreadId <= 0
    )
  ) {
    return false;
  }

  const topicTitle = target['topicTitle'];
  const topicLabel = target['topicLabel'];
  if (
    !isOptionalTelegramTopicText(topicTitle, kind, messageThreadId)
    || !isOptionalTelegramTopicText(topicLabel, kind, messageThreadId)
  ) {
    return false;
  }

  return true;
}

function isOptionalTelegramTopicText(
  value: unknown,
  kind: unknown,
  messageThreadId: unknown,
): boolean {
  return value === undefined || (
    typeof value == 'string'
    && value.length > 0
    && value.length <= TELEGRAM_TOPIC_TITLE_MAX_LENGTH
    && value.trim() == value
    && kind == 'supergroup'
    && messageThreadId !== undefined
  );
}
