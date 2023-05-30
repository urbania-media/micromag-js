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
import ArticleNew from '../UrbaniaArticleNew';
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

export const New = (storyProps) => (
    <Article
        {...storyProps}
        // {...props()}
        isNew
        // url="https://simple.urbania.ca.test:8080/article/pourquoi-la-generation-z-trippe-autant-sur-shrek?new"
        url="https://urbania.ca/article/pourquoi-la-generation-z-trippe-autant-sur-shrek"
        background={backgroundVideo()}
        {...headerFooter()}
    />
);

export const NewPlaceholder = (storyProps) => <ArticleNew {...storyProps} />;

export const Video = (storyProps) => (
    <Article {...storyProps} {...video()} type="video" image={videoMedia()} {...headerFooter()} />
);

export const WithHeaderFooter = (storyProps) => (
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
        articleType="article"
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
