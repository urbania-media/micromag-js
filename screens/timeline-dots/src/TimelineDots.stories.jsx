/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
import { withKnobs, boolean } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { lorem } from 'faker'; // eslint-disable-line import/no-extraneous-dependencies

import layouts from './layouts';

import TimelineDots from './TimelineDots';

export default {
    component: TimelineDots,
    title: 'Screens/TimelineDots',
    decorators: [withKnobs],
};

const props = {
    items: [
        { text: { body: 'Allo' } },
        { text: { body: `<p>${lorem.paragraphs()}</p>` } },
        { text: { body: 'Allo' } },
    ],
    text: { body: `<p>${lorem.paragraphs()}</p>` },
    background: {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        color: '#ddd',
    },
};

const firstLayout = layouts[0];

export const Placeholders = () => (
    <div style={{ display: 'flex' }}>
        <StoryByLayout
            layout={firstLayout}
            component={TimelineDots}
            storyProps={{ isPlaceholder: true }}
        />
    </div>
);

export const Exemple = () => (
    <Story>
        <TimelineDots
            isPlaceholder={boolean('isPlaceholder', false)}
            isPreview={boolean('isPreview', false)}
            {...props}
        />
    </Story>
);
