import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Top, Center, Bottom } from '../components';

export default {
    component: Center,
    title: 'Screens/Image/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderTop = () => <Top renderFormat="placeholder" />;

export const PlaceholderCenter = () => <Center renderFormat="placeholder" />;

export const PlaceholderBottom = () => <Bottom renderFormat="placeholder" />;
