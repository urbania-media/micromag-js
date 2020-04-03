/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { paragraph } from '../../../../.storybook/data';

import { Center } from '../components';

const props = {
    items: [
        {
            image: { url: 'https://picsum.photos/400/180' },
            text: { body: paragraph() },
        },
        {
            image: { url: 'https://picsum.photos/400/200' },
            text: { body: paragraph() },
        },
        {
            image: { url: 'https://picsum.photos/400/240' },
            text: { body: paragraph() },
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
