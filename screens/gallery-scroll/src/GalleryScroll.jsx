import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const GalleryScrollScreen = createLayoutSwitcher(LayoutComponents, LayoutComponents.Single);

export default React.memo(GalleryScrollScreen);
