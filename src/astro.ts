import { parseSync, printSync } from '@swc/core';
import { kebabCaseToPascal } from './utils';
import { ParsedNode } from './types';

const vueOnlyProperties = ['v-if', 'v-else', 'v-else-if', 'v-for', 'v-text', 'v-html', 'v-component'];

type Imports = {
  imports: Record<string, string>;
  path: string;
};

enum PropertyType {
  Identifier = 'Identifier',
  StringLiteral = 'StringLiteral',
  BooleanLiteral = 'BooleanLiteral',
  NumberLiteral = 'NumberLiteral',
  NullLiteral = 'NullLiteral',
  ArrayExpression = 'ArrayExpression',
  ObjectExpression = 'ObjectExpression',
  MemberExpression = 'MemberExpression',
}

type PropertyValue = {
  type: PropertyType;
  key: string;
  value?: string | boolean | number | null;
  properties?: PropertyValue[];
  raw?: string;
};

const getPropertyValue = ({ key, value }: { key: string; value: any }) => {
  let propertyValue: PropertyValue | undefined;

  if (typeof value === 'string') {
    if (value.startsWith('${') && value.endsWith('}')) {
      propertyValue = {
        key,
        type: PropertyType.Identifier,
        value: value.replace('${', '').replace('}', ''),
      };
    } else {
      propertyValue = {
        key,
        type: PropertyType.StringLiteral,
        value: `'${value}'`,
      };
    }
  } else if (typeof value === 'boolean') {
    propertyValue = {
      key,
      type: PropertyType.BooleanLiteral,
      value: value,
    };
  } else if (typeof value === 'number') {
    propertyValue = {
      key,
      type: PropertyType.NumberLiteral,
      value: value,
    };
  } else if (typeof value === 'object') {
    let objectProperties: PropertyValue[] = [];

    Object.entries(value).forEach(([key, v]) => {
      const childPropertyValue = getPropertyValue({ key, value: v });

      if (childPropertyValue === undefined) {
        return;
      }

      objectProperties.push(childPropertyValue);
    });

    let raw = objectProperties
      .map((p) => {
        if (p.raw) {
          return `${p.key}: ${p.raw}`;
        }

        return `${p.key}: ${p.value}`;
      })
      .join(', ');

    propertyValue = {
      key,
      type: PropertyType.ObjectExpression,
      properties: objectProperties,
      raw: `{ ${raw} }`,
    };
  }

  return propertyValue;
};

const a = {
  type: 'Script',
  span: {
    start: 0,
    end: 1,
  },
  body: [
    {
      type: 'ExpressionStatement',
      span: {
        start: 0,
        end: 181,
      },
      expression: {
        type: 'JSXElement',
        span: {
          start: 0,
          end: 181,
        },
        opening: {
          type: 'JSXOpeningElement',
          name: {
            type: 'Identifier',
            span: {
              start: 1,
              end: 10,
            },
            ctxt: 1,
            value: 'Component',
            optional: false,
          },
          span: {
            start: 0,
            end: 181,
          },
          attributes: [
            {
              type: 'JSXAttribute',
              span: {
                start: 11,
                end: 76,
              },
              name: {
                type: 'Identifier',
                span: {
                  start: 1,
                  end: 2,
                },
                value: 'classNames',
              },
              value: {
                type: 'JSXExpressionContainer',
                span: {
                  start: 22,
                  end: 76,
                },
                expression: {
                  type: 'ObjectExpression',
                  span: {
                    start: 23,
                    end: 75,
                  },
                  properties: [
                    {
                      type: 'KeyValueProperty',
                      key: {
                        type: 'Identifier',
                        span: {
                          start: 25,
                          end: 29,
                        },
                        value: 'root',
                      },
                      value: {
                        type: 'StringLiteral',
                        span: {
                          start: 31,
                          end: 52,
                        },
                        value: 'py-24 bg-primary-50',
                        raw: "'py-24 bg-primary-50'",
                      },
                    },
                    {
                      type: 'KeyValueProperty',
                      key: {
                        type: 'Identifier',
                        span: {
                          start: 54,
                          end: 57,
                        },
                        value: 'row',
                      },
                      value: {
                        type: 'MemberExpression',
                        span: {
                          start: 59,
                          end: 73,
                        },
                        object: {
                          type: 'Identifier',
                          span: {
                            start: 59,
                            end: 69,
                          },
                          ctxt: 1,
                          value: 'classNames',
                          optional: false,
                        },
                        property: {
                          type: 'Identifier',
                          span: {
                            start: 70,
                            end: 73,
                          },
                          value: 'row',
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              type: 'JSXAttribute',
              span: {
                start: 77,
                end: 91,
              },
              name: {
                type: 'Identifier',
                span: {
                  start: 77,
                  end: 86,
                },
                value: 'subheader',
              },
              value: {
                type: 'StringLiteral',
                span: {
                  start: 87,
                  end: 91,
                },
                value: 'aa',
                raw: '"aa"',
              },
            },
            {
              type: 'JSXAttribute',
              span: {
                start: 92,
                end: 10,
              },
              name: {
                type: 'Identifier',
                span: {
                  start: 92,
                  end: 102,
                },
                value: 'mediaFirst',
              },
              value: {
                type: 'JSXExpressionContainer',
                span: {
                  start: 103,
                  end: 110,
                },
                expression: {
                  type: 'BooleanLiteral',
                  span: {
                    start: 104,
                    end: 109,
                  },
                  value: false,
                },
              },
            },
            {
              type: 'JSXAttribute',
              span: {
                start: 111,
                end: 123,
              },
              name: {
                type: 'Identifier',
                span: {
                  start: 111,
                  end: 120,
                },
                value: 'className',
              },
              value: {
                type: 'StringLiteral',
                span: {
                  start: 121,
                  end: 123,
                },
                value: '',
                raw: '""',
              },
            },
            {
              type: 'JSXAttribute',
              span: {
                start: 124,
                end: 178,
              },
              name: {
                type: 'Identifier',
                span: {
                  start: 124,
                  end: 132,
                },
                value: 'richText',
              },
              value: {
                type: 'StringLiteral',
                span: {
                  start: 133,
                  end: 178,
                },
                value: '<p>Test</p><ul><li><p></p></li></ul><p></p>',
                raw: '"<p>Test</p><ul><li><p></p></li></ul><p></p>"',
              },
            },
          ],
          selfClosing: true,
          typeArguments: null,
        },
        children: [],
        closing: null,
      },
    },
  ],
  interpreter: null,
};

const parseObject = (value: string) => {
  const ast = parseSync(`a = ${value};`);

  let objectAst = (ast.body[0] as any).expression.right;

  objectAst.properties[0].key.value = 'c';
  objectAst.properties[0].key.raw = "'c'";
  (ast.body[0] as any).expression.right = objectAst;

  // console.log(JSON.stringify(objectAst, null, 2));

  const { code } = printSync(ast, {
    minify: true,
    jsc: {
      minify: {
        compress: true,
        mangle: false, // equivalent to {}
      },
    },
  });
  // console.log(code);
  // console.log(
  //   minifySync(rStr.code, {
  //     compress: {
  //       unused: true,
  //     },
  //     // mangle: true,
  //   }).code
  // );

  // const rStr = printSync(a);
  // console.log(rStr.code);

  return value;
};

const vDataToBindings = (vData: string) => {
  let bindings: Record<string, PropertyValue> = {};

  try {
    parseObject(vData);
    vData = JSON.parse(vData.replaceAll("'", '"'));

    Object.entries(vData).forEach(([key, value]) => {
      const propertyValue = getPropertyValue({ key, value });

      if (propertyValue !== undefined) {
        bindings[key] = propertyValue;
      }
    });
  } catch (e) {
    console.log(vData);
    console.log('Error parsing v-data', e);
  }

  return bindings;
};

const getFormattedNode = (node: any) => {
  if (node.type === 'text') {
    node = node.content;
  }

  if (typeof node === 'string') {
    if (node.replaceAll('\\n', '').trim() === '') {
      return '';
    }

    return node;
  }

  let { name: tag, children } = node;

  const properties: Record<string, string> = {};
  let bindings: Record<string, PropertyValue> = {};
  let imports: Imports[] = [];

  Object.entries(node.attrs).forEach(([key, v]) => {
    if (typeof v !== 'string') {
      return;
    }

    let value = v;

    if (key.startsWith('v-on:')) {
      // skip for now
    } else if (key === 'v-data') {
      bindings = { ...bindings, ...vDataToBindings(value) };
    } else if (key.startsWith('v-slot:')) {
      tag = 'Fragment';
      properties['slot'] = key.replace('v-slot:', '').replace('=""', '');
    } else if (key.startsWith(':')) {
      const newKey = key.replace(':', '');
      bindings[newKey] = {
        key: newKey,
        type: PropertyType.Identifier,
        value,
      };
    } else if (key.startsWith('v-bind:')) {
      const newKey = key.replace('v-bind:', '');
      bindings[newKey] = {
        key: newKey,
        type: PropertyType.Identifier,
        value,
      };
    } else {
      if (value.includes('|date')) {
        value = `vDateFormat(${value.split('|')[0]})`;
      }

      if (value.includes('vDateFormat')) {
        value = value.replace('vDateFormat(', 'getFormattedDate(');
      }

      properties[key] = value;
    }
  });

  if (bindings['class'] && properties['class']) {
    bindings['class'].value = `['${properties['class']}', ${bindings['class'].value}]`;
    delete properties['class'];
  }

  const propertyKeys = Object.keys(properties);

  let expression = null;

  if (tag === 'template' && propertyKeys.includes('v-if')) {
    expression = {
      type: 'if',
      value: properties['v-if'] || '',
    };
  }

  if (tag === 'template' && propertyKeys.includes('v-for')) {
    expression = {
      type: 'for',
      value: properties['v-for'] || '',
    };
  }

  if (propertyKeys.includes('v-text')) {
    expression = {
      type: 'text',
      value: properties['v-text'] || '',
    };
  }

  if (propertyKeys.includes('v-html')) {
    bindings['innerHTML'] = {
      key: 'innerHTML',
      type: PropertyType.Identifier,
      value: properties['v-html'] || '',
    };
  }

  // <template v-component="component-name" posts="posts.slice(0,1)" />
  // <ComponentName posts={posts.slice(0,1)} />
  if (propertyKeys.includes('v-component')) {
    tag = kebabCaseToPascal(properties['v-component'] || '');
    imports.push({
      imports: {
        [tag]: tag,
      },
      path: `./components/${tag}`,
    });
    delete properties['v-component'];
  }

  return {
    tag,
    properties,
    bindings,
    propertyKeys: propertyKeys.filter((key) => {
      if (key.includes(':') || key.includes('v-bind:')) {
        return false;
      }

      return !vueOnlyProperties.includes(key);
    }),
    children,
    expression,
    imports,
  };
};

type PrintAstro = {
  ast: ParsedNode[];
  component?: any;
};

export const printAstro = ({ ast, component }: PrintAstro) => {
  let jsx = '';
  let importsStr = '';

  const renderNode = (n: ParsedNode) => {
    const node = getFormattedNode(n);

    if (typeof node === 'string') {
      return (jsx += node);
    }

    const { tag, properties, propertyKeys, bindings, children, expression, imports } = node;

    let shouldPrintTag = true;
    const allChildrenText = children.every((c: any) => c.type === 'text' || typeof c === 'string');
    const onlyElementChildren = children.filter((c: any) => c.type !== 'text' && typeof c !== 'string');
    let shouldPrintNewLines = children.length > 0;

    if (allChildrenText) {
      shouldPrintNewLines = false;
    }

    let endStr = '';
    let selfClosing = children.length === 0;
    let canWrapChildrenInFragment = false;

    if (expression?.type === 'if') {
      let { value } = expression;

      if (value.includes('$slots')) {
        value = value
          .replace('.', '')
          .replace('$slots', '')
          .replaceAll("'", '')
          .replaceAll('[', '')
          .replaceAll(']', '');

        value = `Astro.slots.has("${value}")`;
      }

      jsx += `{${value} && `;
      endStr += '}';
      shouldPrintTag = false;
      shouldPrintNewLines = false;
      canWrapChildrenInFragment = true;
    }

    if (expression?.type === 'for') {
      const [item, list] = expression.value.split(' in ');
      jsx += `{${list}.map((${item}) => `;
      endStr += ')}';
      shouldPrintTag = false;
      shouldPrintNewLines = false;
      canWrapChildrenInFragment = true;
    }

    if (shouldPrintTag) {
      jsx += `<${tag}`;

      if (propertyKeys.length > 0) {
        jsx += ` `;
        jsx += propertyKeys
          .map((key) => {
            return `${key}={'${properties[key]}'}`;
          })
          .join(' ');
      }

      if (Object.keys(bindings).length > 0) {
        jsx += ` `;
        jsx += Object.entries(bindings)
          .map(([key, propertyValue]) => {
            if (key === 'innerHTML') {
              return `set:html={${propertyValue.value}}`;
            } else if (key === 'class') {
              return `class:list={${propertyValue.value}}`;
            }

            if (propertyValue.type === PropertyType.ObjectExpression && propertyValue.raw) {
              return `${key}={${propertyValue.raw}}`;
            }

            return `${key}={${propertyValue.value}}`;
          })
          .join(' ');
      }
    }

    if (expression?.type === 'text') {
      selfClosing = false;
    }

    let shouldWrapChildrenInFragment = canWrapChildrenInFragment;

    if (allChildrenText || onlyElementChildren.length === 1) {
      shouldWrapChildrenInFragment = false;
    }

    if (shouldWrapChildrenInFragment) {
      jsx += '(<>\n';
    }

    if (shouldPrintTag && !selfClosing) {
      jsx += '>';
    }

    if (expression?.type === 'text') {
      jsx += `{${properties['v-text']}}`;
    }

    if (shouldPrintNewLines) {
      jsx += '\n';
    }

    children.map(renderNode);

    if (shouldWrapChildrenInFragment) {
      jsx += '</>)\n';
    }

    if (shouldPrintNewLines) {
      jsx += '\n';
    }

    jsx += endStr;

    if (shouldPrintTag) {
      if (selfClosing) {
        jsx += ' />';
      } else {
        jsx += `</${tag}>`;
      }
    }

    if (!shouldPrintNewLines) {
      jsx += '\n';
    }

    imports.forEach((importNode) => {
      const { imports, path } = importNode;
      const importKeys = Object.keys(imports);

      importsStr += `import ${importKeys.join(', ')} from '${path}';\n`;
    });
  };

  ast.forEach(renderNode);

  if (component?.properties) {
    let propertiesList: string[] = [];

    Object.keys(component.properties).forEach((propertyKey) => {
      const property = component.properties[propertyKey];
      const { type, default: defaultValue } = property;

      let propertiesStr = propertyKey;

      if (defaultValue) {
        if (type === 'string') {
          propertiesStr += ` = "${defaultValue}"`;
        }

        if (type === 'boolean') {
          propertiesStr += ` = ${defaultValue}`;
        }
      }

      propertiesList.push(propertiesStr);
    });

    importsStr = `\nconst { ${propertiesList.join(', ')} } = Astro.props;`;
  }

  if (importsStr) {
    importsStr += '\n---\n';
  }

  return importsStr + jsx;
};
