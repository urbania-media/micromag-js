import { UrbaniaRecommendation } from './component';
import definition from './definition';

const components = { 'urbania-recommendation': UrbaniaRecommendation };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { UrbaniaRecommendation } from './component';
