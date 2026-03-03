/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundVideo, headerFooter } from '#.storybook/data';
import testArticle from '#.storybook/data/stories/urbania-article-card';
import preview from '#.storybook/preview';
import React from 'react';

import Article from '../UrbaniaCardLoader';
import definition from '../definition-card';

import testVideoArticle from './video.json';

const props = () => ({
    ...testArticle,
    // image: videoMedia(),
    theme: null,
    // url: 'https://urbania.ca/article/mais-pourquoi-la-generation-boomer-ecrit-elle-comme-ca?=new',
    // url: 'https://simple.urbania.ca.test:8080/article/horoscope-semaine-du-12-fevrier-2024-venus-en-verseau',
    // background: backgroundColor(),
    // transitions: transitions(),
    text: {
        body: '<p>ABCD</p>',
    },
});

const meta = preview.meta({
    title: 'Urbania Screens/ArticleCard',
    theme: null,
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

export const WithVideoBackground = meta.story((args) => (
    <Article
        {...args}
        {...props()}
        theme="card"
        text={{ body: 'Quelque chose de trop drole' }}
        background={backgroundVideo()}
        {...headerFooter()}
    />
));

export const WithHeader = meta.story((args) => (
    <Article {...args} {...props()} article={testVideoArticle} {...headerFooter()} />
));

export const URL = meta.story((args) => (
    <Article
        {...args}
        {...props()}
        article={null}
        url="https://urbania.ca/article/recit-dune-date-parfaite-par-grand-froid"
        // url="https://urbania.ca/article/expose-plonger-dans-lorthophonie-scolaire-avec-mathilde-dupas"
        description={{
            body: '<p>L’orthophoniste, c’est la personne qui aide les élèves à mieux prononcer à l’école? Leur rôle est beaucoup plus large et compexe! </p>',
        }}
        cardCallToAction={{ body: 'Consulter l’article' }}
    />
));

// https://urbania.ca/article/recit-dune-date-parfaite-par-grand-froid

export const ThemeUrl = meta.story((args) => (
    <Article
        {...args}
        url="https://urbania.ca/article/expose-plonger-dans-lorthophonie-scolaire-avec-mathilde-dupas"
    />
));

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
