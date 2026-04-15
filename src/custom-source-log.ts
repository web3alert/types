export type CustomSourceLogLevel =
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'fatal';

export type CustomSourceLog = {
  id: string;
  workspaceId: string;
  sourceFullname: string;
  createdAt: string;
  level: CustomSourceLogLevel;
  line: string;
  expireAt: string;
};

export type CustomSourceLogCreate = Omit<CustomSourceLog, 'id' | 'workspaceId' | 'expireAt'>;
