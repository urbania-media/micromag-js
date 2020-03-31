import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Ad from '../Ad';

export default {
    component: Ad,
    title: 'Screens/Ad',
    decorators: [withKnobs],
};

export const MediumRectangle = () => (
    <Ad
        width={300}
        height={250}
        image="https://picsum.photos/300/250"
        url="https://www.urbania.ca"
        isPlaceholder={boolean('isPlaceholder', false)}
    />
);

export const LargeRectangle = () => (
    <Ad
        width={336}
        height={280}
        image="https://picsum.photos/336/280"
        url="https://www.urbania.ca"
        isPlaceholder={boolean('isPlaceholder', false)}
    />
);

export const Skyscraper = () => (
    <Ad
        width={300}
        height={600}
        image="https://picsum.photos/300/600"
        url="https://www.urbania.ca"
        isPlaceholder={boolean('isPlaceholder', false)}
    />
);

export const MobilePortrait = () => (
    <Ad
        width={320}
        height={480}
        image="https://picsum.photos/320/480"
        url="https://www.urbania.ca"
        isPlaceholder={boolean('isPlaceholder', false)}
    />
);
