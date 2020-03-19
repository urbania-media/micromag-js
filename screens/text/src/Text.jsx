/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './layouts';

const TextScreen = createLayoutSwitcher(LayoutComponents, LayoutComponents.Text);

export default React.memo(TextScreen);
