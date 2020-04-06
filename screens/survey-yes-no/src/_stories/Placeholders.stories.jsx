import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import Main from '../components';

export default {
    component: Main,
    title: 'Screens/SurveyYesNo/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderYesNo = () => <Main renderFormat="placeholder" />;
