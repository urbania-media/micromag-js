/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    backgroundColor,
    backgroundVideo,
    transitions,
    headerFooter,
    videoMedia,
} from '../../../../.storybook/data';
import Article from '../UrbaniaCardLoader';
import definition from '../definition-card';

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
    theme: 'card',
    article: testArticle,
    // url: 'https://reader.quatre95.urbania.ca/article/homard-et-crabe-des-neiges-des-prix-qui-pincent',
    url: 'https://simple.urbania.ca.test:8080/article/mais-pourquoi-la-generation-boomer-ecrit-elle-comme-ca?=new',
    background: backgroundColor(),
    transitions: transitions(),
});

export default {
    title: 'Urbania Screens/ArticleCard',
    theme: 'card',
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

export const WithVideoBackground = (storyProps) => (
    <Article
        {...storyProps}
        {...props()}
        theme="card"
        text={{ body: 'Quelque chose de trop drole' }}
        background={backgroundVideo()}
        {...headerFooter()}
    />
);

export const WithHeader = (storyProps) => (
    <Article {...storyProps} {...props()} article={testVideo} {...headerFooter()} />
);

export const URL = (storyProps) => (
    <Article
        {...storyProps}
        {...props()}
        article={null}
        url="https://urbania.ca/article/expose-plonger-dans-lorthophonie-scolaire-avec-mathilde-dupas"
        description={{
            body: '<p>L’orthophoniste, c’est la personne qui aide les élèves à mieux prononcer à l’école? Leur rôle est beaucoup plus large et compexe! </p>',
        }}
    />
);

export const ThemeUrl = (storyProps) => (
    <Article
        {...storyProps}
        url="https://urbania.ca/article/expose-plonger-dans-lorthophonie-scolaire-avec-mathilde-dupas"
        // articleType="article"
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
