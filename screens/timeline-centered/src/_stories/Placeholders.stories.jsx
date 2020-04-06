import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Text, Image, Heading } from '../components';

export default {
    component: Text,
    title: 'Screens/TimelineCentered/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderText = () => <Text renderFormat="placeholder" />;

export const PlaceholderImage = () => <Image renderFormat="placeholder" />;

export const PlaceholderHeading = () => <Heading renderFormat="placeholder" />;
