import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';

import { Center } from '../components';

export default {
    component: Center,
    title: 'Screens/Slideshow/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center renderFormat="preview" />;
