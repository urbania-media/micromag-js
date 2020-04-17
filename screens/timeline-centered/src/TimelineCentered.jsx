import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './layouts/index';

const TimelineCenteredScreen = createLayoutSwitcher(LayoutComponents);

export default TimelineCenteredScreen;
