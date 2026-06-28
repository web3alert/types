export type Event = {
  title?: string;
  short?: string;
  long?: string;
  icon?: string | null;
  cover?: string | null;
  avatar?: string | null;
  links?: EventLink[];
  delivery?: EventDelivery;
};

export type KeyOfEvent = keyof Event;

export type EventLink = {
  title: string;
  url: string;
};

export type EventDeliveryMode = 'continuous' | 'once' | 'once_per_key';

export type EventDelivery = {
  mode: EventDeliveryMode;
  keyPath?: string;
};
