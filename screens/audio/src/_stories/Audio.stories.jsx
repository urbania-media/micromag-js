/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { audioMedia, backgroundColor, closedCaptionsMedia } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import AudioScreen from '../Audio';
import definition from '../definition';

const props = {
    audio: {media: audioMedia(), autoPlay: true, loop: true },
    background: backgroundColor(),
};

export default {
    title: 'Screens/Audio',
    component: AudioScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <AudioScreen {...storyProps} />;

export const Preview = (storyProps) => <AudioScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <AudioScreen {...storyProps} />;

export const Normal = (storyProps) => <AudioScreen {...storyProps} {...props} />;
export const WithClosedCaptions = () => <AudioScreen {...props} closedCaptions={closedCaptionsMedia()} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
