import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './layouts';

const TitleScreen = createLayoutSwitcher(LayoutComponents);
TitleScreen.displayName = 'TitleScreen';

export default TitleScreen;
