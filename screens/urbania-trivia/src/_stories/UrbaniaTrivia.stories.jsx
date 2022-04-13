/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundColor, transitions, videoMedia } from '../../../../.storybook/data';
import definition from '../definition';

const video = (props) => ({ ...props, media: videoMedia(), autoPlay: true, loop: false });

const props = (videoProps = {}) => ({
    video: video(videoProps),
    background: backgroundColor(),
    transitions: transitions(),
});

export default {
    title: 'Urbania Screens/Trivia',
    component: UrbaniaTriviaScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Cool = () => <p>Hello</p>;

export const Placeholder = (storyProps) => <UrbaniaTriviaScreen {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaTriviaScreen {...storyProps} {...props()} />;

export const Static = (storyProps) => <UrbaniaTriviaScreen {...storyProps} {...props()} />;

export const Capture = (storyProps) => <UrbaniaTriviaScreen {...storyProps} {...props()} />;

export const Edit = (storyProps) => <UrbaniaTriviaScreen {...storyProps} />;

export const Normal = (storyProps) => <UrbaniaTriviaScreen {...storyProps} {...props()} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
