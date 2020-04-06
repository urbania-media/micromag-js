import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import Main from '../components';

export default {
    component: Main,
    title: 'Screens/SurveyMultipleChoice/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderMultipleChoice = () => <Main renderFormat="placeholder" />;
