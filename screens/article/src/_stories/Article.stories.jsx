/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import { backgroundColor, transitions, headerFooter } from '../../../../.storybook/data';
import ArticleScreen from '../Article';
import definition from '../definition';

const props = {
    body: '<p>Hello</p>',
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
