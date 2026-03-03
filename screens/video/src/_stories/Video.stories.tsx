/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    closedCaptionsMedia,
    headerFooter,
    transitions,
    videoMedia,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import VideoScreen from '../Video';
import definition from '../definition';

const video = (props) => ({ ...props, media: videoMedia(), autoPlay: true, loop: false });

const props = (videoProps = {}) => ({
    video: video(videoProps),
    background: backgroundColor(),
    transitions: transitions(),
});

const meta = preview.meta({
    title: 'Screens/Video',
    component: VideoScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Placeholder = meta.story((args) => <VideoScreen {...args} />);

export const Preview = meta.story((args) => <VideoScreen {...args} {...props()} />);
export const Static = meta.story((args) => <VideoScreen {...args} {...props()} />);
export const Capture = meta.story((args) => <VideoScreen {...args} {...props()} />);

export const Edit = meta.story((args) => <VideoScreen {...args} />);

export const Normal = meta.story((args) => <VideoScreen {...args} {...props()} />);

export const WithSeekbar = meta.story((args) => (
    <VideoScreen {...args} {...{ ...props({ withSeekBar: true }) }} />
));

export const WithClosedCaptions = meta.story((args) => (
    <VideoScreen
        {...args}
        {...{
            ...props({
                closedCaptions: closedCaptionsMedia(),
                withSeekBar: true,
                withControls: true,
            }),
        }}
    />
));

export const WithSeekbarAndClosedCaptions = meta.story((args) => (
    <VideoScreen
        {...args}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withSeekBar: true }) }}
    />
));

export const WithAllControls = meta.story((args) => (
    <VideoScreen
        {...args}
        {...{
            ...props({
                closedCaptions: closedCaptionsMedia(),
                withSeekBar: true,
                withControls: true,
            }),
        }}
    />
));

export const WithBadContrast = meta.story((args) => (
    <VideoScreen
        {...args}
        {...{
            ...props({
                closedCaptions: closedCaptionsMedia(),
                withSeekBar: true,
                withControls: true,
            }),
            background: { color: '#FFF', alpha: 1 },
        }}
    />
));

export const WithHeaderFooter = meta.story((args) => (
    <VideoScreen
        {...args}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withSeekBar: true }) }}
        {...headerFooter()}
    />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
