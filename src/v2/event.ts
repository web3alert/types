export type Event = {
  title?: string;
  short?: string;
  long?: string;
  icon?: string | null;
  cover?: string | null;
  avatar?: string | null;
  links?: EventLink[];
};

export type KeyOfEvent = keyof Event;

export type EventLink = {
  title: string;
  url: string;
};
