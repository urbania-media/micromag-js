/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { background } from '../../../../.storybook/data';

import { Center } from '../components';

const props = {
    background: background(),
};

export default {
    component: Center,
    title: 'Screens/Slideshow/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;
