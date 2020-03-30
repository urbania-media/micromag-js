import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const QuoteScreen = createLayoutSwitcher(LayoutComponents);

export default React.memo(QuoteScreen);
