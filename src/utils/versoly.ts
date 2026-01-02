const COMPONENT_PROPERTY_STRING_TYPES_LIST = [
  'PlainText',
  'RichText',
  'Image',
  'Video',
  'Link',
  'Option',
  'Color',
  'ClassName',
  'ComponentRef',
] as const;

const COMPONENT_PROPERTY_TYPES_LIST = [
  ...COMPONENT_PROPERTY_STRING_TYPES_LIST,
  // 'Date'
  'Bool',
  // 'ComponentRefSet'
] as const;

export const getJSTypeFromVersolyType = (type: string) => {
  if (COMPONENT_PROPERTY_STRING_TYPES_LIST.includes(type as any)) {
    return 'string';
  }
  if (type === 'Bool') {
    return 'boolean';
  }

  return 'any';
};
