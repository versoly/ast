import { expect, test } from 'vitest';
import { parse, printAstro } from '../index';
import fixtures from './fixtures';

const getRawFile = async (filePath: string) => {
  const content = await import(`${filePath}?raw`).then((x) => x.default as string);
  return { content, key: ['src', '__tests__', filePath].join('/') };
};

type RawFile = ReturnType<typeof getRawFile>;

const basic = getRawFile('./data/basic.raw.html');
const basicVHTML = getRawFile('./data/basic-v-html.raw.html');
const basicVBind = getRawFile('./data/basic-v-bind.raw.html');
const basicIf = getRawFile('./data/basic-if.raw.html');
const basicFor = getRawFile('./data/basic-for.raw.html');
const vBindClass = getRawFile('./data/v-bind-class.raw.html');
const vBindStyle = getRawFile('./data/v-bind-style.raw.html');
const component = getRawFile('./data/component.raw.html');
const componentVData = getRawFile('./data/component-v-data.raw.html');
const script = getRawFile('./data/script.raw.html');

const vDate = getRawFile('./data/v-date.raw.html');

const nestedComponent = getRawFile('./data/components/nested-component.raw.html');

const pagesComponent = getRawFile('./data/pages/component.raw.html');

type Tests = { [index: string]: RawFile };

const BASIC_TESTS: Tests = {
  basic,
  basicVHTML,
  basicVBind,
  basicIf,
  basicFor,
  vBindClass,
  vBindStyle,
  component,
  componentVData,
  script,
  // Versoly specific
  vDate,
  // components
  nestedComponent,
  // pages
  pagesComponent,
} as const;

Object.keys(BASIC_TESTS).forEach((key) => {
  test(key, async () => {
    const content = (await BASIC_TESTS[key])?.content || '';
    const ast = parse(content);
    const result = printAstro({ ast });
    expect(result).toMatchSnapshot();
  });
});

const generateFiles = (files: typeof fixtures.files) => {
  return files.map((fileData) => {
    const { content, path } = fileData;
    let properties = fileData.properties;
    const ast = parse(content);

    let filePath = path;

    if (fileData.type === 'component') {
      filePath = `components/${path}.astro`;
    }

    if (fileData.type === 'page') {
      filePath = `pages/${path}.astro`;
    }

    const printedContent = printAstro({ ast, component: { properties } });

    return {
      path: filePath,
      content: printedContent,
    };
  });
};

Object.entries(fixtures).forEach(([fixtureName, fixture]) => {
  test(fixtureName, async () => {
    expect(generateFiles(fixture)).toMatchSnapshot();
  });
});
