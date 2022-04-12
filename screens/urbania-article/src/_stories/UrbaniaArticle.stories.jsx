/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { videoMedia, backgroundColor, transitions } from '../../../../.storybook/data';
import UrbaniaArticleScreen from '../UrbaniaArticle';
import definition from '../definition';

const video = (props) => ({ ...props, media: videoMedia(), autoPlay: true, loop: false });

const props = (videoProps = {}) => ({
    video: video(videoProps),
    background: backgroundColor(),
    transitions: transitions(),
});

export default {
    title: 'Urbania Screens/Article',
    component: UrbaniaArticleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Cool = () => <p>Hello</p>;

export const Placeholder = (storyProps) => <UrbaniaArticleScreen {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaArticleScreen {...storyProps} {...props()} />;

export const Static = (storyProps) => <UrbaniaArticleScreen {...storyProps} {...props()} />;

export const Capture = (storyProps) => <UrbaniaArticleScreen {...storyProps} {...props()} />;

export const Edit = (storyProps) => <UrbaniaArticleScreen {...storyProps} />;

export const Normal = (storyProps) => <UrbaniaArticleScreen {...storyProps} {...props()} />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
