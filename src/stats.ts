export type CommonStats = {
  name: string;
  subscriptions: {
    active: {
      regular: number;
      template: number;
    };
    total: number;
  };
  workspaces: {
    active: number;
    inactive: number;
  };
};

export type FilterStats = {
  trigger: string;
  param: string;
  regular: number;
  total: number;
};

export type Stats = {
  sources: CommonStats[];
  triggers: CommonStats[];
  filters: FilterStats[];
};
