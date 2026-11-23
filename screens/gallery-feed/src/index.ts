import { GalleryFeedCaptionsScreen, GalleryFeedScreen } from './component';
import definition from './definition';

const components = {
    'gallery-feed': GalleryFeedScreen,
    'gallery-feed-captions': GalleryFeedCaptionsScreen,
};

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { GalleryFeedScreen } from './component';
export { GalleryFeedCaptionsScreen } from './component';
