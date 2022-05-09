/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundColor, transitions, videoMedia, title } from '../../../../.storybook/data';
import '../../../../.storybook/fonts/fonts.scss';
import UrbaniaTrivia from '../UrbaniaTrivia';
import definition from '../definition';

const video = (props) => ({
    ...props,
    media: videoMedia({ vertical: true }),
    autoPlay: true,
    loop: false,
});

const props = (videoProps = {}) => ({
    video: video(videoProps),
    background: backgroundColor(),
    transitions: transitions(),
    title: { body: title() },
    layout: 'middle',
    padding: 80,
});

export default {
    title: 'Urbania Screens/Trivia',
    component: UrbaniaTrivia,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Cool = () => <p>Hello</p>;

export const Placeholder = (storyProps) => <UrbaniaTrivia {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaTrivia {...storyProps} {...props()} />;

export const Static = (storyProps) => <UrbaniaTrivia {...storyProps} {...props()} />;

export const Capture = (storyProps) => <UrbaniaTrivia {...storyProps} {...props()} />;

export const Edit = (storyProps) => <UrbaniaTrivia {...storyProps} />;

export const Normal = (storyProps) => <UrbaniaTrivia {...storyProps} {...props()} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
