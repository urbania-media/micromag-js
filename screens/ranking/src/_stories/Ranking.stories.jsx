/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    text,
    title,
    backgroundColor,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import RankingScreen from '../Ranking';
import definition from '../definition';

const props = {
    items: [...new Array(10)].map(() => ({
        title: { body: title() },
        description: text('long'),
    })),
    numbersStyle: {
        fontSize: '3em',
    },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Ranking',
    component: RankingScreen,
    parameters: {
        intl: true,
        screenDefinition: definition,
    },
};

export const Placeholder = (storyProps) => <RankingScreen {...storyProps} />;

export const Preview = (storyProps) => <RankingScreen {...storyProps} {...props} />;
export const Static = (storyProps) => <RankingScreen {...storyProps} {...props} />;
export const Capture = (storyProps) => <RankingScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <RankingScreen {...storyProps} />;

export const Normal = (storyProps) => <RankingScreen {...storyProps} {...props} />;

export const WithHeaderFooter = (storyProps) => (
    <RankingScreen {...storyProps} {...props} {...headerFooter()} />
);

export const WithTitle = (storyProps) => (
    <RankingScreen {...storyProps} {...props} title={{ body: title() }} />
);

export const Ascending = (storyProps) => <RankingScreen {...storyProps} {...props} ascending />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
