/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { text, title, backgroundColor, transitions } from '../../../../.storybook/data';
import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
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

export const Edit = (storyProps) => <RankingScreen {...storyProps} />;

export const Normal = (storyProps) => <RankingScreen {...storyProps} {...props} />;
export const Ascending = (storyProps) => <RankingScreen {...storyProps} {...props} ascending />;

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
