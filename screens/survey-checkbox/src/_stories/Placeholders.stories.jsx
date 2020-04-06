import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import Main from '../components';

export default {
    component: Main,
    title: 'Screens/SurveyCheckbox/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderCheckbox = () => <Main renderFormat="placeholder" />;
