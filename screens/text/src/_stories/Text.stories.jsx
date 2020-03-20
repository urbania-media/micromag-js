/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByArrangement } from '@micromag/core';
import { lorem } from 'faker'; // eslint-disable-line import/no-extraneous-dependencies

import Text from '../text/Text';
import { ScreenSize } from './storybook';
import background from './background.jpg';

import arrangements from '../text/arrangements';

const TopArrangement = arrangements[0];
const CenterArrangement = arrangements[1];
const BottomArrangement = arrangements[2];

const props = {
    text: { body: `<p>${lorem.paragraphs()}</p>` },
    background: {
        image: {
            url: background,
        },
        color: '#ddd',
    },
};

export default {
    component: Text,
    title: 'Screens/Text/Text',
    decorators: [ScreenSize()],
};

export const Top = () => (
    <StoryByArrangement
        arrangement={TopArrangement}
        component={Text}
        itemProps={{
            ...props,
        }}
    />
);

export const Center = () => (
    <StoryByArrangement
        arrangement={CenterArrangement}
        component={Text}
        itemProps={{
            ...props,
        }}
    />
);

export const Bottom = () => (
    <StoryByArrangement
        arrangement={BottomArrangement}
        component={Text}
        itemProps={{
            ...props,
        }}
    />
);
