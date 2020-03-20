/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByArrangement } from '@micromag/core';
import { lorem } from 'faker'; // eslint-disable-line import/no-extraneous-dependencies

import TextImage from '../text-image/TextImage';
import { ScreenSize } from './storybook';
import background from './background.jpg';

import arrangements from '../text-image/arrangements';

const TopArrangement = arrangements[0];
const CenterArrangement = arrangements[1];
const BottomArrangement = arrangements[2];
const TopReverseArrangement = arrangements[3];
const CenterReverseArrangement = arrangements[4];
const BottomReverseArrangement = arrangements[5];

const props = {
    text: { body: `<p>${lorem.paragraphs()}</p>` },
    image: { url: 'https://picsum.photos/300/150' },
    background: {
        image: {
            url: background,
        },
        color: '#ddd',
    },
};

export default {
    component: TextImage,
    title: 'Screens/Text/TextImage',
    decorators: [ScreenSize()],
};

export const Top = () => (
    <StoryByArrangement
        arrangement={TopArrangement}
        component={TextImage}
        itemProps={{
            ...props,
        }}
    />
);

export const Center = () => (
    <StoryByArrangement
        arrangement={CenterArrangement}
        component={TextImage}
        itemProps={{
            ...props,
        }}
    />
);

export const Bottom = () => (
    <StoryByArrangement
        arrangement={BottomArrangement}
        component={TextImage}
        itemProps={{
            ...props,
        }}
    />
);

export const TopReverse = () => (
    <StoryByArrangement
        arrangement={TopReverseArrangement}
        component={TextImage}
        itemProps={{
            ...props,
        }}
    />
);

export const CenterReverse = () => (
    <StoryByArrangement
        arrangement={CenterReverseArrangement}
        component={TextImage}
        itemProps={{
            ...props,
        }}
    />
);

export const BottomReverse = () => (
    <StoryByArrangement
        arrangement={BottomReverseArrangement}
        component={TextImage}
        itemProps={{
            ...props,
        }}
    />
);
