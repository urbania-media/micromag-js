/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { image, background } from '../../../../.storybook/data';

import { Default } from '../components';

export default {
    component: Default,
    title: 'Screens/Ad/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewDefault = () => (
    <Default image={image()} background={background()} renderFormat="preview" />
);

export const MediumRectangle = () => (
    <Default {...image()} background={background()} renderFormat="preview" />
);
