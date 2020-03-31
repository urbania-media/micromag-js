import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const TimelineCenteredScreen = createLayoutSwitcher(LayoutComponents);

export default React.memo(TimelineCenteredScreen);
