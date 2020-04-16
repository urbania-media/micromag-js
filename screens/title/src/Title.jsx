import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './layouts/index';

const TitleScreen = createLayoutSwitcher(LayoutComponents);
TitleScreen.displayName = 'TitleScreen';

export default TitleScreen;
