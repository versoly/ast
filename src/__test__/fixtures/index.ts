import { ComponentGroupsList, ComponentPropertiesList } from 'src/types';
import components from './components';
import pages from './pages';

let files: {
  type: string;
  path: string;
  content: string;
  component?:
    | {
        properties: ComponentPropertiesList;
        groups?: ComponentGroupsList;
      }
    | undefined;
}[] = pages;

components.forEach((component) => {
  const { name, html } = component;
  files.push({
    type: 'component',
    path: `${name}`,
    content: html,
    component,
  });
});

export default {
  files,
};
