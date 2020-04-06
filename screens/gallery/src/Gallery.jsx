import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const Screen = createLayoutSwitcher(LayoutComponents, LayoutComponents.OneByThree);

export default React.memo(Screen);
