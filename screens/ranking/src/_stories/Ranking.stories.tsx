/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import { backgroundColor, headerFooter, text, title, transitions } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

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

const meta = preview.meta({
    title: 'Screens/Ranking',
    component: RankingScreen,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Placeholder = meta.story((args) => <RankingScreen {...args} />);

export const Preview = meta.story((args) => <RankingScreen {...args} {...props} />);
export const Static = meta.story((args) => <RankingScreen {...args} {...props} />);
export const Capture = meta.story((args) => <RankingScreen {...args} {...props} />);

export const Edit = meta.story((args) => <RankingScreen {...args} />);

export const Normal = meta.story((args) => <RankingScreen {...args} {...props} />);

export const WithHeaderFooter = meta.story((args) => (
    <RankingScreen {...args} {...props} {...headerFooter()} />
));

export const WithTitle = meta.story((args) => (
    <RankingScreen {...args} {...props} title={{ body: title() }} />
));

export const Ascending = meta.story((args) => <RankingScreen {...args} {...props} ascending />);

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
