import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Text } from '../components';

export default {
    component: Text,
    title: 'Screens/TimelineCentered/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderAll = () => <Text renderFormat="placeholder" />;
