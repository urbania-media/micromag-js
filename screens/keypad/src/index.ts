import { Keypad } from './component';
import definition from './definition';

const components = { keypad: Keypad };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { Keypad } from './component';
