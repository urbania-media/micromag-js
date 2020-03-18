/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByArrangement } from '@micromag/core';
import Gallery from '../Gallery';
import Slideshow from './Slideshow';

import GridArrangements from './arrangements';

const Default = GridArrangements[0];

const images = [
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
];

export default {
    component: Gallery,
    title: 'Screens/Gallery/Slideshow',
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {GridArrangements.map(arr => (
            <StoryByArrangement
                arrangement={arr}
                component={Slideshow}
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
                component={Slideshow}
                itemProps={{
                    isPreview: true,
                    images,
                }}
            />
        ))}
    </div>
);

export const Normal = () => (
    <StoryByArrangement
        arrangement={Default}
        component={Slideshow}
        itemProps={{
            images,
        }}
    />
);
