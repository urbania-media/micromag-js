import { ArticleScreen } from './component';
import definition from './definition';

const components = { article: ArticleScreen };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { ArticleScreen } from './component';
