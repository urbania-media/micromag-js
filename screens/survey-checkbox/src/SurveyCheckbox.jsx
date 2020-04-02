import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const SurveyCheckboxScreen = createLayoutSwitcher(LayoutComponents);

export default React.memo(SurveyCheckboxScreen);
