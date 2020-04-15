import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './layouts/index';

const TitleScreen = createLayoutSwitcher(LayoutComponents);

export default TitleScreen;
