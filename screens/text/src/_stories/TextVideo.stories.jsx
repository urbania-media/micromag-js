/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByArrangement } from '@micromag/core';
import { lorem } from 'faker'; // eslint-disable-line import/no-extraneous-dependencies

import TextVideo from '../text-video/TextVideo';
import { ScreenSize } from './storybook';
import video from './video.mp4';

import arrangements from '../text-video/arrangements';

const TopArrangement = arrangements[0];
const CenterArrangement = arrangements[1];
const BottomArrangement = arrangements[2];
const TopReverseArrangement = arrangements[3];
const CenterReverseArrangement = arrangements[4];
const BottomReverseArrangement = arrangements[5];

const props = {
    text: { body: `<p>${lorem.paragraphs()}</p>` },
    video: { url: video, width: 200, height: 150 },
    background: {
        color: '#ddd',
    },
};

export default {
    component: TextVideo,
    title: 'Screens/Text/TextVideo',
    decorators: [ScreenSize()],
};

export const Top = () => (
    <StoryByArrangement
        arrangement={TopArrangement}
        component={TextVideo}
        itemProps={{
            ...props,
        }}
    />
);

export const Center = () => (
    <StoryByArrangement
        arrangement={CenterArrangement}
        component={TextVideo}
        itemProps={{
            ...props,
        }}
    />
);

export const Bottom = () => (
    <StoryByArrangement
        arrangement={BottomArrangement}
        component={TextVideo}
        itemProps={{
            ...props,
        }}
    />
);

export const TopReverse = () => (
    <StoryByArrangement
        arrangement={TopReverseArrangement}
        component={TextVideo}
        itemProps={{
            ...props,
        }}
    />
);

export const CenterReverse = () => (
    <StoryByArrangement
        arrangement={CenterReverseArrangement}
        component={TextVideo}
        itemProps={{
            ...props,
        }}
    />
);

export const BottomReverse = () => (
    <StoryByArrangement
        arrangement={BottomReverseArrangement}
        component={TextVideo}
        itemProps={{
            ...props,
        }}
    />
);
