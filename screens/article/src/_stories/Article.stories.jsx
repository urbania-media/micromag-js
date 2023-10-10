/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    imageMedia,
    title,
    author,
    paragraph,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import ArticleScreen from '../Article';
import definition from '../definition';

const props = {
    image: imageMedia({ height: 900 }),
    title: { body: title() },
    surtitle: { body: title() },
    date: '1969-04-20',
    author: { body: author() },
    text: { body: paragraph({ min: 40, max: 400 }) },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Article',
    component: ArticleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ArticleScreen),
    },
};

export const Placeholder = (storyProps) => <ArticleScreen {...storyProps} />;

export const Preview = (storyProps) => <ArticleScreen {...storyProps} {...props} />;

export const Static = (storyProps) => <ArticleScreen {...storyProps} {...props} />;

export const Capture = (storyProps) => <ArticleScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ArticleScreen {...storyProps} />;

export const Normal = (storyProps) => <ArticleScreen {...storyProps} {...props} />;

export const WithHeaderFooter = (storyProps) => (
    <ArticleScreen {...storyProps} {...headerFooter()} {...props} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
