import { ParsedCommentNode, ParsedElementNode, ParsedNode } from './types';

const lookup = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
};

const voidElements = Object.keys(lookup);

const attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

function parseTag(tag: string): ParsedNode {
  const res: ParsedNode = {
    type: 'tag',
    name: '',
    voidElement: false,
    attrs: {},
    children: [],
  };

  const tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
  if (tagMatch) {
    res.name = tagMatch[1] || '';
    res.voidElement = voidElements.includes(tag);

    if (tag.charAt(tag.length - 2) === '/') {
      res.voidElement = true;
    }

    // handle comment tag
    if (res.name.startsWith('!--')) {
      const endIndex = tag.indexOf('-->');
      return {
        type: 'comment',
        comment: endIndex !== -1 ? tag.slice(4, endIndex) : '',
      };
    }
  }

  const reg = new RegExp(attrRE);
  let result = null;
  for (;;) {
    result = reg.exec(tag);

    if (result === null) {
      break;
    }

    if (!result[0].trim()) {
      continue;
    }

    if (result[1]) {
      const attr = result[1].trim();
      let arr = [attr, ''];

      if (attr.indexOf('=') > -1) {
        arr = attr.split('=');
      }

      res.attrs[arr[0]] = arr[1];
      reg.lastIndex--;
    } else if (result[2]) {
      res.attrs[result[2]] = result[3].trim().substring(1, result[3].length - 1);
    }
  }

  return res;
}

const tagRE = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g;
const whitespaceRE = /^\s*$/;

// re-used obj for quick lookups of components
const empty = Object.create(null);

export function parse(html: string, options: any = {}): ParsedNode[] {
  options || (options = {});
  options.components || (options.components = empty);
  const result: ParsedNode[] = [];
  const arr: any[] = [];
  let current: ParsedNode;
  let level = -1;
  let inComponent = false;

  // handle text at top level
  // if (html.indexOf('<') !== 0) {
  //   const end = html.indexOf('<');
  //   result.push({
  //     type: 'text',
  //     content: end === -1 ? html : html.substring(0, end),
  //   });
  // }

  html.replace(tagRE, function (tag, index) {
    let parent;
    const isOpen = tag.charAt(1) !== '/';
    const isComment = tag.startsWith('<!--');
    const start = index + tag.length;
    const nextChar = html.charAt(start);

    if (isComment) {
      const comment = parseTag(tag) as ParsedCommentNode;

      // if we're at root, push new base node
      if (level < 0) {
        result.push(comment);
        return '';
      }

      parent = arr[level];
      parent.children.push(comment);
      return '';
    }

    if (inComponent) {
      if (tag !== '</' + current.name + '>') {
        return '';
      } else {
        inComponent = false;
      }
    }

    if (isOpen) {
      level++;

      current = parseTag(tag);
      if (current.type === 'tag' && options.components[current.name]) {
        current.type = 'component';
        inComponent = true;
      }

      if (!current.voidElement && !inComponent && nextChar && nextChar !== '<') {
        // current.children?.push({
        //   type: 'text',
        //   children: [html.slice(start, html.indexOf('<', start))],
        // });
        current.children?.push(html.slice(start, html.indexOf('<', start)));
      }

      // if we're at root, push new base node
      if (level === 0) {
        result.push(current);
      }

      parent = arr[level - 1];

      if (parent) {
        parent.children.push(current);
      }

      arr[level] = current;
    }

    if (!isOpen || current.voidElement) {
      if (level > -1 && (current.voidElement || current.name === tag.slice(2, -1))) {
        level--;
        // move current up a level to match the end tag
        current = level === -1 ? result : arr[level];
      }
      if (!inComponent && nextChar !== '<' && nextChar) {
        // trailing text node
        // if we're at the root, push a base text node. otherwise add as
        // a child to the current node.
        parent = level === -1 ? result : arr[level].children;

        // calculate correct end of the content slice in case there's
        // no tag after the text node.
        const end = html.indexOf('<', start);
        let content = html.slice(start, end === -1 ? undefined : end);
        // if a node is nothing but whitespace, collapse it as the spec states:
        // https://www.w3.org/TR/html4/struct/text.html#h-9.1
        if (whitespaceRE.test(content)) {
          content = ' ';
        }
        // don't add whitespace-only text nodes if they would be trailing text nodes
        // or if they would be leading whitespace-only text nodes:
        //  * end > -1 indicates this is not a trailing text node
        //  * leading node is when level is -1 and parent has length 0
        if ((end > -1 && level + parent.length >= 0) || content !== ' ') {
          parent.push({ type: 'text', content: content });
        }
      }
    }
    return '';
  });

  return result;
}
