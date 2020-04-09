/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { background } from '../../../../.storybook/data';

import { Center } from '../components';

export default {
    component: Center,
    title: 'Screens/Panorama/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center background={background()} renderFormat="preview" />;
