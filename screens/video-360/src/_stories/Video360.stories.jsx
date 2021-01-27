/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    video360Media,
    backgroundColor,
    closedCaptionsMedia,
    transitions,
} from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import Video360Screen from '../Video360';
import definition from '../definition';

const video360 = (props) => ({ ...props, media: video360Media(), autoPlay: true, loop: false });

const props = (videoProps = {}) => ({
    video: video360(videoProps),
    background: backgroundColor(),
    transitions: transitions(),
});

export default {
    title: 'Screens/Video 360',
    component: Video360Screen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Video360Screen {...storyProps} />;

export const Preview = (storyProps) => <Video360Screen {...storyProps} {...props()} />;
export const Static = (storyProps) => <Video360Screen {...storyProps} {...props()} />;
export const Capture = (storyProps) => <Video360Screen {...storyProps} {...props()} />;

export const Edit = (storyProps) => <Video360Screen {...storyProps} />;

export const Normal = (storyProps) => <Video360Screen {...storyProps} {...props()} />;

export const WithSeekbar = (storyProps) => (
    <Video360Screen {...storyProps} {...{ ...props({ withSeekBar: true }) }} />
);

export const WithClosedCaptions = (storyProps) => (
    <Video360Screen {...storyProps} {...{ ...props({ closedCaptions: closedCaptionsMedia() }) }} />
);

export const WithSeekbarAndClosedCaptions = (storyProps) => (
    <Video360Screen
        {...storyProps}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withSeekBar: true }) }}
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
