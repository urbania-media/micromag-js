/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    closedCaptionsMedia,
    headerFooter,
    transitions,
    video360Media,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Video360Screen from '../Video360';
import definition from '../definition';

const video360 = (props) => ({ ...props, media: video360Media(), autoPlay: true, loop: false });

const props = (videoProps = {}) => ({
    video: video360(videoProps),
    background: backgroundColor(),
    transitions: transitions(),
});

const meta = preview.meta({
    title: 'Screens/Video 360',
    component: Video360Screen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Placeholder = meta.story((args) => <Video360Screen {...args} />);

export const Preview = meta.story((args) => <Video360Screen {...args} {...props()} />);

export const Static = meta.story((args) => <Video360Screen {...args} {...props()} />);

export const Capture = meta.story((args) => <Video360Screen {...args} {...props()} />);

export const Edit = meta.story((args) => <Video360Screen {...args} />);

export const Normal = meta.story((args) => <Video360Screen {...args} {...props()} />);

export const WithSeekbar = meta.story((args) => (
    <Video360Screen {...args} {...{ ...props({ withSeekBar: true }) }} />
));

export const WithClosedCaptions = meta.story((args) => (
    <Video360Screen {...args} {...{ ...props({ closedCaptions: closedCaptionsMedia() }) }} />
));

export const WithSeekbarAndClosedCaptions = meta.story((args) => (
    <Video360Screen
        {...args}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withSeekBar: true }) }}
    />
));

export const WithHeaderFooter = meta.story((args) => (
    <Video360Screen
        {...args}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withSeekBar: true }) }}
        {...headerFooter()}
    />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
