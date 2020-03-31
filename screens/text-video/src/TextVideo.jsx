import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const TextVideo = createLayoutSwitcher(LayoutComponents);

export default React.memo(TextVideo);
