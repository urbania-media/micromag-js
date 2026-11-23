import { MapImagesScreen, MapScreen } from './component';
import definition from './definition';

const components = { map: MapScreen, 'map-images': MapImagesScreen };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { MapScreen } from './component';
export { MapImagesScreen } from './component';
