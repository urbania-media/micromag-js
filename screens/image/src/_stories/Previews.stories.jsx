/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import {
    text,
    background,
    backgroundImage,
    imageWithRandomSize,
} from '../../../../.storybook/data';

import { Top, Center, Bottom } from '../components';

const props = {
    image: imageWithRandomSize(),
    background: background(),
};

export default {
    component: Center,
    title: 'Screens/Image/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTop = () => <Top {...props} renderFormat="preview" />;

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;

export const PreviewBottom = () => <Bottom {...props} renderFormat="preview" />;

export const PreviewCenterWithImage = () => (
    <Center {...props} background={backgroundImage()} renderFormat="preview" />
);

export const PreviewCenterWithTextAndBackground = () => (
    <Center
        {...props}
        text={{
            ...text(),
            style: { text: { color: '#999', font: { size: '30px', style: { bold: true } } } },
        }}
        background={backgroundImage()}
    />
);
