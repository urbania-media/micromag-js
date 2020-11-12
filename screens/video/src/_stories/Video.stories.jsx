/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { video, background, closedCaptions } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Video from '../Video';
import definition from '../definition';

const props = {
    video: {...video(), autoPlay: true, loop: true },
    background: background(),
};

export default {
    title: 'Screens/Video',
    component: Video,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Video {...storyProps} />;

export const Preview = (storyProps) => <Video {...storyProps} {...props} />;

export const Edit = (storyProps) => <Video {...storyProps} />;

export const Normal = (storyProps) => <Video {...storyProps} {...props} />;
export const WithSeekbar = (storyProps) => <Video {...storyProps} {...props} withSeekBar />;
export const WithClosedCaptions = (storyProps) => <Video {...storyProps} {...props} closedCaptions={closedCaptions()} />;
export const WithSeekbarAndClosedCaptions = (storyProps) => <Video {...storyProps} {...props} withSeekBar closedCaptions={closedCaptions()} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
