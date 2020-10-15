/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { audio, image, text, background } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';

import Audio from '../Audio';
import definition from '../definition';

const props = {
    audio: audio(),
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
export const WithImage = (storyProps) => <Audio {...storyProps} {...props} image={image()} />;
export const WithImageAndText = (storyProps) => (
    <Audio {...storyProps} {...props} text={text()} image={image()} />
);
export const Muted = (storyProps) => (
    <Audio {...storyProps} {...props} audio={{ ...audio(), muted: true }} />
);

export const Definition = () => <ScreenDefinition definition={definition} />;
