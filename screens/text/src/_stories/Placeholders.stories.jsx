import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { TextTop, TextCenter, TextBottom } from '../components';

export default {
    component: TextTop,
    title: 'Screens/Text/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderTop = () => <TextTop isPlaceholder />;

export const PlaceholderCenter = () => <TextCenter isPlaceholder />;

export const PlaceholderBottom = () => <TextBottom isPlaceholder />;
