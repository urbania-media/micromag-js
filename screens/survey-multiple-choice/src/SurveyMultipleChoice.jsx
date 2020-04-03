import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const SurveyMultipleChoiceScreen = createLayoutSwitcher(LayoutComponents);

export default React.memo(SurveyMultipleChoiceScreen);
