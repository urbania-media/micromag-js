import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Top, Center, Bottom } from '../components';

export default {
    component: Top,
    title: 'Screens/TextImage/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderTop = () => <Top isPlaceholder />;

export const PlaceholderCenter = () => <Center isPlaceholder />;

export const PlaceholderBottom = () => <Bottom isPlaceholder />;
