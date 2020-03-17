/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './layouts';

const GalleryScreen = createLayoutSwitcher(LayoutComponents, LayoutComponents.Grid);

export default React.memo(GalleryScreen);
