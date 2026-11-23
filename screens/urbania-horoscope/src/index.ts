import { UrbaniaHoroscope } from './component';
import definition from './definition';

const components = { 'urbania-horoscope': UrbaniaHoroscope };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { default as signs } from './data/signs';
export { UrbaniaHoroscope } from './component';
