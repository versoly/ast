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
