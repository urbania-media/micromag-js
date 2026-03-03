/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { transitions, headerFooter, videoMedia } from '../../../../.storybook/data';
import Article from '../UrbaniaLoader';
import definition from '../definition';

import testVideo from '../../../../.storybook/data/stories/urbania-article-video.json';
import testArticle from '../../../../.storybook/data/stories/urbania-article.json';

const videoArticle = () => ({
    ...testVideo,
    type: 'video',
    media: videoMedia(),
    autoPlay: true,
    loop: false,
});

const props = () => ({
    ...testArticle,
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
        {...videoArticle()}
        type="video"
        image={videoMedia()}
        {...headerFooter()}
    />
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
