export type Tags = string[];
export type Labels = Record<string, string>;

export type Rename = {
  oldName: string;
  newName: string;
};

export type ByName = {
  name: string;
};

export type ByNames = {
  names: string[];
};

export type ByWorkspace = {
  workspace: string;
};

export type ExecutionPolicyFilter = {
  type: 'filter';
};

export type ExecutionPolicyMonitor = {
  type: 'monitor';
  key?: string;
};

export type ExecutionPolicy =
  | ExecutionPolicyFilter
  | ExecutionPolicyMonitor
;

export type OpenGraphMeta = {
  title: string;
  description?: string;
};
