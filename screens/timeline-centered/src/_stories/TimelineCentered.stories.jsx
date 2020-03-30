import React from 'react';
import { StoryByLayout, StoryData } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies

import TimelineCentered from '../TimelineCentered';

export default {
    component: TimelineCentered,
    title: 'Screens/TimelineCentered',
    decorators: [withKnobs],
};

const items = [
    { heading: { body: StoryData.title() }, text: { body: StoryData.description() } },
    { heading: { body: StoryData.title() }, text: { body: StoryData.description() } },
    { heading: { body: StoryData.title() }, text: { body: StoryData.description() } },
];

const itemsWithImage = [
    {
        image: {
            url: 'https://picsum.photos/400/300',
        },
        text: { body: StoryData.description() },
    },
    {
        image: {
            url: 'https://picsum.photos/400/400',
        },
        text: { body: StoryData.description() },
    },
    {
        image: {
            url: 'https://picsum.photos/400/500',
        },
        text: { body: StoryData.description() },
    },
];

const background = {
    image: {
        url: 'https://picsum.photos/400/600',
    },
    color: '#ddd',
};

export const Placeholders = () => (
    <div style={{ display: 'flex' }}>
        <StoryByLayout
            layout={{ name: 'default' }}
            component={TimelineCentered}
            itemProps={{ isPlaceholder: true, items }}
        />
    </div>
);

export const TimelineCenteredText = () => (
    <StoryByLayout
        component={TimelineCentered}
        storyProps={{
            items,
            background,
        }}
    />
);

export const TimelineCenteredImage = () => (
    <StoryByLayout
        component={TimelineCentered}
        storyProps={{
            items: itemsWithImage,
            background,
        }}
    />
);
