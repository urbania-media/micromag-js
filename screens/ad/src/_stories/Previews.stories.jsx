/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { advertising, background, backgroundImage } from '../../../../.storybook/data';

import { Center } from '../components';

export default {
    component: Center,
    title: 'Screens/Ad/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center background={background()} renderFormat="preview" />;

export const PreviewCenterWithBackgroundImage = () => (
    <Center
        background={backgroundImage()}
        ad={advertising({ width: 320, height: 320 })}
        renderFormat="preview"
    />
);
