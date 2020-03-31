/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies

import TimelineDots from './TimelineDots';

export default {
    component: TimelineDots,
    title: 'Screens/TimelineDots',
    decorators: [withKnobs],
};

const props = {
    items: [
        { text: { body: 'Allo' } },
        { text: { body: `<p>Plusieurs paragraphes</p>` } },
        { text: { body: 'Allo' } },
    ],
    text: { body: `<p>Description</p>` },
    background: {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        color: '#ddd',
    },
};

export const Default = () => (
    <div style={{ display: 'flex' }}>
        <TimelineDots {...props} />
    </div>
);
