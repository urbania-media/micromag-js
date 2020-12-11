/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { video360Media, backgroundColor, closedCaptionsMedia, transitions } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Video360Screen from '../Video360';
import definition from '../definition';

const props = {
    video: { media: video360Media(), autoPlay: true, loop: true },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Video 360',
    component: Video360Screen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Video360Screen {...storyProps} />;

export const Preview = (storyProps) => <Video360Screen {...storyProps} {...props} />;

export const Edit = (storyProps) => <Video360Screen {...storyProps} />;

export const Normal = (storyProps) => <Video360Screen {...storyProps} {...props} />;
export const WithSeekbar = (storyProps) => <Video360Screen {...storyProps} {...props} withSeekBar />;
export const WithClosedCaptions = (storyProps) => (
    <Video360Screen {...storyProps} {...props} closedCaptions={closedCaptionsMedia()} />
);
export const WithSeekbarAndClosedCaptions = (storyProps) => (
    <Video360Screen {...storyProps} {...props} withSeekBar closedCaptions={closedCaptionsMedia()} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
