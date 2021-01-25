/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    audioMedia,
    backgroundColor,
    closedCaptionsMedia,
    transitions,
} from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import AudioScreen from '../Audio';
import definition from '../definition';

const audio = (props) => ({ ...props, media: audioMedia(), autoPlay: true, loop: false });

const props = (audioProps = {}) => ({
    audio: audio(audioProps),
    background: backgroundColor(),
    transitions: transitions(),
});

export default {
    title: 'Screens/Audio',
    component: AudioScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <AudioScreen {...storyProps} />;

export const Preview = (storyProps) => <AudioScreen {...storyProps} {...props()} />;

export const Edit = (storyProps) => <AudioScreen {...storyProps} />;

export const Normal = (storyProps) => <AudioScreen {...storyProps} {...props()} />;

export const WithClosedCaptions = (storyProps) => (
    <AudioScreen {...storyProps} {...{ ...props({ closedCaptions: closedCaptionsMedia() }) }} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
