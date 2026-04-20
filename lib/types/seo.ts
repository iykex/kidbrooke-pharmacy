export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdNode
  | JsonLdValue[];

export type JsonLdNode = { [key: string]: JsonLdValue };
