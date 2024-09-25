import components from './components';
import pages from './pages';

type ComponentProperty = {
  type: string;
  default?: string | boolean;
};

type ComponentProperties = {
  [key: string]: ComponentProperty;
};

const files: {
  type: string;
  path: string;
  content: string;
  properties?: ComponentProperties;
}[] = [...components, ...pages];

export default {
  files,
};
