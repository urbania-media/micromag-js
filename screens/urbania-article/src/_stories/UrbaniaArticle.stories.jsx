/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    transitions,
    callToAction,
    videoMedia,
} from '../../../../.storybook/data';
//  videoMedia,
import Article from '../UrbaniaLoader';
import definition from '../definition';
import testArticle from './article.json';
import testVideo from './video.json';

// import videoArticle from './video.json';
const video = (props) => ({
    ...props,
    type: 'video',
    media: videoMedia(),
    autoPlay: true,
    loop: false,
});

const props = () => ({
    image: video(null),
    // video: null,
    article: testArticle,
    background: backgroundColor(),
    transitions: transitions(),
});

export default {
    title: 'Urbania Screens/Article',
    component: Article,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <Article {...storyProps} />;

export const Preview = (storyProps) => <Article {...storyProps} {...props()} />;

export const Static = (storyProps) => <Article {...storyProps} {...props()} />;

export const Capture = (storyProps) => <Article {...storyProps} {...props()} />;

export const Edit = (storyProps) => <Article {...storyProps} />;

export const Normal = (storyProps) => <Article {...storyProps} {...props()} />;

export const Video = (storyProps) => (
    <Article {...storyProps} type="video" image={videoMedia()} callToAction={callToAction()} />
);

export const CallToAction = (storyProps) => (
    <Article {...storyProps} {...props()} article={testVideo} callToAction={callToAction()} />
);

export const URL = (storyProps) => (
    <Article
        {...storyProps}
        {...props()}
        article={null}
        url="https://urbania.ca/article/la-vie-apres-le-masque-obligatoireen-ontario"
    />
);

export const ThemeUrl = (storyProps) => (
    <Article
        {...storyProps}
        url="https://universites.urbania.ca/article/de-pascale-a-lysandre-nadeau-comment-bien-animer-a-lere-de-la-gen-z"
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
