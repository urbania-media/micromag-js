import {
    TitleScreen,
    TitleSubtitleCreditsScreen,
    TitleSubtitleScreen,
    TitleWithBoxScreen,
} from './component';
import definition from './definition';

const components = {
    title: TitleScreen,
    'title-subtitle': TitleSubtitleScreen,
    'title-subtitle-credits': TitleSubtitleCreditsScreen,
    'title-with-box': TitleWithBoxScreen,
};

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { TitleScreen } from './component';
export { TitleSubtitleScreen } from './component';
export { TitleSubtitleCreditsScreen } from './component';
