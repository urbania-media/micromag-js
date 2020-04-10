import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Full, Center, Loop } from '../components';

export default {
    component: Full,
    title: 'Screens/Video/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderFull = () => <Full renderFormat="placeholder" />;

export const PlaceholderCenter = () => <Center renderFormat="placeholder" />;

export const PlaceholderLoop = () => <Loop renderFormat="placeholder" />;
