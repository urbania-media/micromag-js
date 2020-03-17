/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './layouts';

const TitleScreen = createLayoutSwitcher(LayoutComponents);

export default React.memo(TitleScreen);
