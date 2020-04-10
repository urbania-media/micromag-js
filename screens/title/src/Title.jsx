import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const TitleScreen = createLayoutSwitcher(LayoutComponents, LayoutComponents.SplitReverse);

export default React.memo(TitleScreen);
