/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { image, background, backgroundWithImage } from '../../../../.storybook/data';

import { Center } from '../components';

export default {
    component: Center,
    title: 'Screens/Audio/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center background={background()} renderFormat="preview" />;

export const PreviewWithImage = () => (
    <Center {...image()} background={backgroundWithImage()} renderFormat="preview" />
);
