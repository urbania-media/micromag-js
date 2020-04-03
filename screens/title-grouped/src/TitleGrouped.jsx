import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const TitleGrouped = createLayoutSwitcher(LayoutComponents, LayoutComponents.TitleGroupedTop);

export default React.memo(TitleGrouped);
