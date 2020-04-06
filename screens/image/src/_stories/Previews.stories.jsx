/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { background, backgroundWithImage } from '../../../../.storybook/data';

import { Top, Center, Bottom } from '../components';

export default {
    component: Center,
    title: 'Screens/Image/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTop = () => <Top background={background()} renderFormat="preview" />;

export const PreviewCenter = () => <Center background={background()} renderFormat="preview" />;

export const PreviewBottom = () => <Bottom background={background()} renderFormat="preview" />;

export const PreviewCenterWithImage = () => (
    <Center background={backgroundWithImage()} renderFormat="preview" />
);
