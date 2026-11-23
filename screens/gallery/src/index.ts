import { GalleryCaptionsScreen, GalleryScreen } from './component';
import definition from './definition';

const components = { gallery: GalleryScreen, 'gallery-captions': GalleryCaptionsScreen };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { GalleryScreen } from './component';
export { GalleryCaptionsScreen } from './component';
