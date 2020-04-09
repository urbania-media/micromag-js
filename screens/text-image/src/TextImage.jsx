import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const TextImageScreen = createLayoutSwitcher(LayoutComponents, LayoutComponents.Center);

export default React.memo(TextImageScreen);
