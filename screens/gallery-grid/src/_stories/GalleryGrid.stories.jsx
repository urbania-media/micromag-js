/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
import GalleryGrid from '../GalleryGrid';

import layouts from '../layouts';

const OnePlusThreeArrangement = layouts[0];
const OneTwoArrangement = layouts[1];
const FourArrangement = layouts[2];
const TwoOneArrangement = layouts[3];
const NineArrangement = layouts[4];

const images = [
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
];

const layoutProps = {
    spacing: 2,
};

export default {
    component: GalleryGrid,
    title: 'Screens/GalleryGrid',
};

export const Placeholders = () => (
    <div style={{ display: 'flex' }}>
        {layouts.map(layout => (
            <StoryByLayout
                key={layout.name}
                layout={layout}
                component={GalleryGrid}
                storyProps={{ isPlaceholder: true }}
            />
        ))}
    </div>
);

export const Previews = () => (
    <div style={{ display: 'flex' }}>
        {layouts.map(layout => (
            <StoryByLayout
                key={layout.name}
                layout={layout}
                component={GalleryGrid}
                storyProps={{
                    isPreview: true,
                    images,
                }}
            />
        ))}
    </div>
);

export const OnePlusThree = () => (
    <StoryByLayout
        layout={OnePlusThreeArrangement}
        component={GalleryGrid}
        storyProps={{
            images,
        }}
        layoutProps={{ ...layoutProps }}
    />
);

export const OneTwo = () => (
    <StoryByLayout
        layout={OneTwoArrangement}
        component={GalleryGrid}
        storyProps={{
            images,
        }}
        layoutProps={{ ...layoutProps }}
    />
);

export const Four = () => (
    <StoryByLayout
        layout={FourArrangement}
        component={GalleryGrid}
        storyProps={{
            images,
        }}
        layoutProps={{ ...layoutProps }}
    />
);

export const TwoOne = () => (
    <StoryByLayout
        layout={TwoOneArrangement}
        component={GalleryGrid}
        storyProps={{
            images,
        }}
        layoutProps={{ ...layoutProps }}
    />
);

export const Nine = () => (
    <StoryByLayout
        layout={NineArrangement}
        component={GalleryGrid}
        storyProps={{
            images,
        }}
        layoutProps={{ ...layoutProps }}
    />
);
