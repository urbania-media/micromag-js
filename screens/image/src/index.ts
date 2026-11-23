import {
    ImageLegendScreen,
    ImageScreen,
    ImageTextScreen,
    ImageTitleScreen,
    ImageTitleTextScreen,
} from './component';
import definition from './definition';

const components = {
    image: ImageScreen,
    'image-title': ImageTitleScreen,
    'image-text': ImageTextScreen,
    'image-title-text': ImageTitleTextScreen,
    'image-legend': ImageLegendScreen,
};

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { ImageScreen } from './component';
export { ImageTitleScreen } from './component';
export { ImageTextScreen } from './component';
export { ImageTitleTextScreen } from './component';
export { ImageLegendScreen } from './component';
