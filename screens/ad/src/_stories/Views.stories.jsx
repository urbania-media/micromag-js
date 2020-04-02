import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';

import { Default } from '../components';

export default {
    component: Default,
    title: 'Screens/Ad/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const MediumRectangle = () => (
    <Default
        width={300}
        height={250}
        image={{ url: 'https://picsum.photos/300/250' }}
        url="https://www.urbania.ca"
    />
);

export const LargeRectangle = () => (
    <Default
        width={336}
        height={280}
        image={{ url: 'https://picsum.photos/336/280' }}
        url="https://www.urbania.ca"
    />
);

export const Skyscraper = () => (
    <Default
        width={300}
        height={600}
        image={{ url: 'https://picsum.photos/300/600' }}
        url="https://www.urbania.ca"
    />
);

export const MobilePortrait = () => (
    <Default
        width={320}
        height={480}
        image={{ url: 'https://picsum.photos/320/480' }}
        url="https://www.urbania.ca"
    />
);
