import { JsonObject } from 'type-fest';

export type ParsedElementNode = {
  type: string;
  name: string;
  voidElement: boolean;
  attrs: JsonObject;
  children: (ParsedNode | string)[];
};

export type ParsedTextNode = {
  type: 'text';
  name?: string;
  voidElement?: boolean;
  children: (ParsedNode | string)[];
};

export type ParsedCommentNode = {
  type: 'comment';
  comment: string;
  name?: string;
  voidElement?: boolean;
  children?: (ParsedNode | string)[];
};

export type ParsedNode = ParsedElementNode | ParsedTextNode | ParsedCommentNode;

export type ComponentGroup = { name: string; slug: string; nestProperties?: boolean };
export type ComponentGroupsList = ComponentGroup[];

export type ComponentProperty = {
  slug: string;
  type: string;
  group?: string | null | undefined;
  defaultValue?: string | boolean;
};

export type ComponentPropertiesList = ComponentProperty[];

export type VersolyComponent = {
  groups?: ComponentGroupsList | undefined;
  properties?: ComponentPropertiesList | undefined;
};
