export type PropertySpecString = {
  type: 'string';
  format?: string;
  pattern?: string;
  title?: string;
  description?: string;
  placeholder?: string;
};

export type PropertySpec = 
  | PropertySpecString
;

export type ObjectSpec = Record<string, PropertySpec>;
