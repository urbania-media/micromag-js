/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { video, background, closedCaptions } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import VideoScreen from '../Video';
import definition from '../definition';

const props = {
    video: {...video(), autoPlay: true, loop: true },
    background: background(),
};

export default {
    title: 'Screens/Video',
    component: VideoScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <VideoScreen {...storyProps} />;

export const Preview = (storyProps) => <VideoScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <VideoScreen {...storyProps} />;

export const Normal = (storyProps) => <VideoScreen {...storyProps} {...props} />;
export const WithSeekbar = (storyProps) => <VideoScreen {...storyProps} {...props} withSeekBar />;
export const WithClosedCaptions = (storyProps) => <VideoScreen {...storyProps} {...props} closedCaptions={closedCaptions()} />;
export const WithSeekbarAndClosedCaptions = (storyProps) => <VideoScreen {...storyProps} {...props} withSeekBar closedCaptions={closedCaptions()} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
