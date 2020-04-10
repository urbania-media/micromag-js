/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
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

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: Center,
    title: 'Screens/Slideshow/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const SlideshowCenter = () => (
    <Center {...props} textAlign={select('textAlign', options, 'center')} />
);
