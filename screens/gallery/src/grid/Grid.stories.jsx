/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByArrangement } from '@micromag/core';
import Gallery from '../Gallery';
import GridGallery from './Grid';

import GridArrangements from './arrangements';

const OnePlusThreeArrangement = GridArrangements[0];
const OneTwoArrangement = GridArrangements[1];
const FourArrangement = GridArrangements[2];
const TwoOneArrangement = GridArrangements[3];
const NineArrangement = GridArrangements[4];

const images = [
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
];

export default {
    component: Gallery,
    title: 'Screens/Gallery/Grid',
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {GridArrangements.map(arr => (
            <StoryByArrangement
                arrangement={arr}
                component={GridGallery}
                itemProps={{ isPlaceholder: true }}
            />
        ))}
    </div>
);

export const Previews = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {GridArrangements.map(arr => (
            <StoryByArrangement
                arrangement={arr}
                component={GridGallery}
                itemProps={{
                    isPreview: true,
                    images,
                }}
            />
        ))}
    </div>
);

export const OnePlusThree = () => (
    <StoryByArrangement
        arrangement={OnePlusThreeArrangement}
        component={GridGallery}
        itemProps={{
            images,
        }}
    />
);

export const OneTwo = () => (
    <StoryByArrangement
        arrangement={OneTwoArrangement}
        component={GridGallery}
        itemProps={{
            images,
        }}
    />
);

export const Four = () => (
    <StoryByArrangement
        arrangement={FourArrangement}
        component={GridGallery}
        itemProps={{
            images,
        }}
    />
);

export const TwoOne = () => (
    <StoryByArrangement
        arrangement={TwoOneArrangement}
        component={GridGallery}
        itemProps={{
            images,
        }}
    />
);

export const Nine = () => (
    <StoryByArrangement
        arrangement={NineArrangement}
        component={GridGallery}
        itemProps={{
            images,
        }}
    />
);
