import { TextScreen, TextTitleScreen } from './component';
import definition from './definition';

const components = { text: TextScreen, 'text-title': TextTitleScreen };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { TextScreen } from './component';
