import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const ImageScreen = createLayoutSwitcher(LayoutComponents, LayoutComponents.Center);

export default React.memo(ImageScreen);
