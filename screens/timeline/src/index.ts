import { TimelineIllustratedScreen, TimelineScreen } from './component';
import definition from './definition';

const components = { timeline: TimelineScreen, 'timeline-illustrated': TimelineIllustratedScreen };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { TimelineScreen } from './component';
export { TimelineIllustratedScreen } from './component';
