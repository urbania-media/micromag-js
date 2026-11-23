import { SlideshowScreen } from './component';
import definition from './definition';

const components = { slideshow: SlideshowScreen };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { SlideshowScreen } from './component';
