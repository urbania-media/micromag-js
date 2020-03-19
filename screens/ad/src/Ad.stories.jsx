import React from 'react';
import { Story, StoryByArrangement } from '@micromag/core';
import { withKnobs, boolean } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Ad from './Ad';

export default {
    component: Ad,
    title: 'Screens/Ad',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        <StoryByArrangement
            arrangement={{ name: 'default' }}
            component={Ad}
            itemProps={{ isPlaceholder: true }}
        />
    </div>
);

export const MediumRectangle = () => (
    <Story>
        <Ad
            width={300}
            height={250}
            image="https://picsum.photos/300/250"
            url="https://www.urbania.ca"
            isPlaceholder={boolean('isPlaceholder', false)}
        />
    </Story>
);

export const LargeRectangle = () => (
    <Story>
        <Ad
            width={336}
            height={280}
            image="https://picsum.photos/336/280"
            url="https://www.urbania.ca"
            isPlaceholder={boolean('isPlaceholder', false)}
        />
    </Story>
);

export const Skyscraper = () => (
    <Story>
        <Ad
            width={300}
            height={600}
            image="https://picsum.photos/300/600"
            url="https://www.urbania.ca"
            isPlaceholder={boolean('isPlaceholder', false)}
        />
    </Story>
);

export const MobilePortrait = () => (
    <Story>
        <Ad
            width={320}
            height={480}
            image="https://picsum.photos/320/480"
            url="https://www.urbania.ca"
            isPlaceholder={boolean('isPlaceholder', false)}
        />
    </Story>
);
