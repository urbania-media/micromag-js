/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    videoMedia,
    backgroundColor,
    closedCaptionsMedia,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import VideoScreen from '../Video';
import definition from '../definition';

const video = (props) => ({ ...props, media: videoMedia(), autoPlay: true, loop: false });

const props = (videoProps = {}) => ({
    video: video(videoProps),
    background: backgroundColor(),
    transitions: transitions(),
});

export default {
    title: 'Screens/Video',
    component: VideoScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <VideoScreen {...storyProps} />;

export const Preview = (storyProps) => <VideoScreen {...storyProps} {...props()} />;
export const Static = (storyProps) => <VideoScreen {...storyProps} {...props()} />;
export const Capture = (storyProps) => <VideoScreen {...storyProps} {...props()} />;

export const Edit = (storyProps) => <VideoScreen {...storyProps} />;

export const Normal = (storyProps) => <VideoScreen {...storyProps} {...props()} />;

export const WithSeekbar = (storyProps) => (
    <VideoScreen {...storyProps} {...{ ...props({ withSeekBar: true }) }} />
);

export const WithClosedCaptions = (storyProps) => (
    <VideoScreen {...storyProps} {...{ ...props({
        closedCaptions: closedCaptionsMedia(),
        withSeekBar: true,
        withControls: true
    }) }} />
);

export const WithSeekbarAndClosedCaptions = (storyProps) => (
    <VideoScreen
        {...storyProps}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withSeekBar: true }) }}
    />
);

export const WithAllControls = (storyProps) => (
    <VideoScreen
        {...storyProps}
        {...{
            ...props({
                closedCaptions: closedCaptionsMedia(),
                withSeekBar: true,
                withControls: true,
            }),
        }}
    />
);

export const WithBadContrast = (storyProps) => (
    <VideoScreen
        {...storyProps}
        {...{
            ...props({
                closedCaptions: closedCaptionsMedia(),
                withSeekBar: true,
                withControls: true,
            }),
            background: { color: '#FFF', alpha: 1 },
        }}
    />
);

export const WithHeaderFooter = (storyProps) => (
    <VideoScreen
        {...storyProps}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withSeekBar: true }) }}
        {...headerFooter()}
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
