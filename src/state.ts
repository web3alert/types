export type Data = object;

export type State = {
  key: string;
  value: Data;
};

export type StateShort = {
  key: string;
};

export type StateSaveParams = {
  key: string;
  value: Data;
};

export type StateListParams = {};

export type StateGetParams = {
  key: string;
};
