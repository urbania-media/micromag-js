/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { audio, background, closedCaptions } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Audio from '../Audio';
import definition from '../definition';

const props = {
    audio: {...audio(), autoPlay: true, loop: true },
    closedCaptions: {...closedCaptions()},
    background: background(),
};

export default {
    title: 'Screens/Audio',
    component: Audio,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Audio {...storyProps} />;

export const Preview = (storyProps) => <Audio {...storyProps} />;

export const Edit = (storyProps) => <Audio {...storyProps} />;

export const Normal = (storyProps) => <Audio {...storyProps} {...props} />;

export const Definition = () => <ScreenDefinition definition={definition} />;
