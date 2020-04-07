import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const MapPathScreen = createLayoutSwitcher(LayoutComponents, LayoutComponents.Center);

export default React.memo(MapPathScreen);
