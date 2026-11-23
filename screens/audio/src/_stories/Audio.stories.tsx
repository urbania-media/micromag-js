/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import {
    audioMedia,
    backgroundColor,
    closedCaptionsMedia,
    headerFooter,
    transitions,
} from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import AudioScreen from '../Audio';
import definition from '../definition';

const audio = (props) => ({ ...props, media: audioMedia(), autoPlay: true, loop: false });

const props = (audioProps = {}) => ({
    audio: audio(audioProps),
    background: backgroundColor(),
    transitions: transitions(),
});

const meta = preview.meta({
    title: 'Screens/Audio',
    component: AudioScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Placeholder = meta.story((args) => <AudioScreen {...args} />);

export const Preview = meta.story((args) => <AudioScreen {...args} {...props()} />);

export const Static = meta.story((args) => <AudioScreen {...args} {...props()} />);

export const Capture = meta.story((args) => <AudioScreen {...args} {...props()} />);

export const Edit = meta.story((args) => <AudioScreen {...args} />);

export const Normal = meta.story((args) => (
    <AudioScreen {...args} {...props({ withWave: true })} />
));

export const WithClosedCaptions = meta.story((args) => (
    <AudioScreen
        {...args}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withWave: true }) }}
    />
));

export const WithHeaderFooter = meta.story((args) => (
    <AudioScreen
        {...args}
        {...headerFooter()}
        {...{ ...props({ closedCaptions: closedCaptionsMedia(), withWave: true }) }}
        showWave
    />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
