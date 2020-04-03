import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Text, Image } from '../components';

export default {
    component: Text,
    title: 'Screens/TimelineDots/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderText = () => <Text renderFormat="placeholder" />;

export const PlaceholderImage = () => <Image renderFormat="placeholder" />;
