import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Default } from '../components';

export default {
    component: Default,
    title: 'Screens/Ad/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderDefault = () => <Default renderFormat="placeholder" />;
