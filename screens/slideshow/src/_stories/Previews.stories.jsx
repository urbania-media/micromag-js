/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { text, image, background } from '../../../../.storybook/data';

import { Center } from '../components';

const props = {
    background: background(),
    items: [
        {
            image: image({ width: 500, height: 250 }),
            text: text(),
        },
        {
            image: image({ width: 500, height: 400 }),
            text: text(),
        },
        {
            image: image({ width: 500, height: 500 }),
            text: text(),
        },
    ],
};

const singleProps = {
    background: background(),
    items: [
        {
            image: null,
            text: text(),
        },
    ],
};

export default {
    component: Center,
    title: 'Screens/Slideshow/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;

export const PreviewSingle = () => <Center {...singleProps} renderFormat="preview" />;
