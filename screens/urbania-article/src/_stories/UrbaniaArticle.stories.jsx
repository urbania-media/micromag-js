/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    transitions,
    callToAction,
    videoMedia,
} from '../../../../.storybook/data';
import Article from '../UrbaniaLoader';
import definition from '../definition';

import testArticle from './article.json';
import testVideo from './video.json';

const video = (props) => ({
    ...props,
    type: 'video',
    media: videoMedia(),
    autoPlay: true,
    article: testVideo,
    loop: false,
});

const props = () => ({
    image: video(null),
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
    <Article
        {...storyProps}
        {...video()}
        type="video"
        image={videoMedia()}
        callToAction={callToAction()}
    />
);

export const CallToAction = (storyProps) => (
    <Article {...storyProps} {...props()} article={testVideo} callToAction={callToAction()} />
);

export const URL = (storyProps) => (
    <Article
        {...storyProps}
        {...props()}
        article={null}
        url="https://urbania.ca/article/expose-plonger-dans-lorthophonie-scolaire-avec-mathilde-dupas"
        description={{
            body: '<p>Salutr sdfksajdfh sfdksahdf hsdfhsadfaksdf as df sadf sadfg adg sadg....</p>',
        }}
    />
);

export const ThemeUrl = (storyProps) => (
    <Article
        {...storyProps}
        url="https://urbania.ca/article/expose-plonger-dans-lorthophonie-scolaire-avec-mathilde-dupas"
        articleType="article"
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
