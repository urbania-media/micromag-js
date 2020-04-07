import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Center } from '../components';

export default {
    component: Center,
    title: 'Screens/MapPath/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderCenter = () => <Center renderFormat="placeholder" />;
