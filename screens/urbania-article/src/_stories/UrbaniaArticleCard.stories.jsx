/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundVideo, headerFooter } from '../../../../.storybook/data';
import testArticle from '../../../../.storybook/data/stories/urbania-article-card';
import Article from '../UrbaniaCardLoader';
import definition from '../definition-card';

import testVideoArticle from './video.json';

const props = () => ({
    ...testArticle,
    // image: videoMedia(),
    theme: null,
    url: 'https://simple.urbania.ca/article/mais-pourquoi-la-generation-boomer-ecrit-elle-comme-ca?=new',
    // background: backgroundColor(),
    // transitions: transitions(),
    text: {
        body: '<p>ABCD</p>',
    },
});

export default {
    title: 'Urbania Screens/ArticleCard',
    theme: null,
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
    <Article {...storyProps} {...props()} article={testVideoArticle} {...headerFooter()} />
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
