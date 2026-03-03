/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { headerFooter, transitions, videoMedia } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Article from '../UrbaniaLoader';
import definition from '../definition';

import testVideo from '#.storybook/data/stories/urbania-article-video.json';
import testArticle from '#.storybook/data/stories/urbania-article.json';

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

const meta = preview.meta({
    title: 'Urbania Screens/Article',
    component: Article,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Placeholder = meta.story((args) => <Article {...args} />);

export const Preview = meta.story((args) => <Article {...args} {...props()} />);

export const Static = meta.story((args) => <Article {...args} {...props()} />);

export const Capture = meta.story((args) => <Article {...args} {...props()} />);

export const Edit = meta.story((args) => <Article {...args} />);

export const Normal = meta.story((args) => <Article {...args} {...props()} />);

export const Video = meta.story((args) => (
    <Article {...args} {...videoArticle()} type="video" image={videoMedia()} {...headerFooter()} />
));

export const WithHeaderFooter = meta.story((args) => (
    <Article {...args} {...props()} article={testVideo} {...headerFooter()} />
));

export const URL = meta.story((args) => (
    <Article
        {...args}
        {...props()}
        article={null}
        url="https://urbania.ca/article/expose-plonger-dans-lorthophonie-scolaire-avec-mathilde-dupas"
        description={{
            body: '<p>L’orthophoniste, c’est la personne qui aide les élèves à mieux prononcer à l’école? Leur rôle est beaucoup plus large et compexe! </p>',
        }}
    />
));

export const ThemeUrl = meta.story((args) => (
    <Article
        {...args}
        url="https://urbania.ca/article/expose-plonger-dans-lorthophonie-scolaire-avec-mathilde-dupas"
        articleType="article"
    />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
