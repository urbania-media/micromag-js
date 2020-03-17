import React from 'react';
import { Story } from '@micromag/core';
import Gallery from './Gallery';
import Grid from './grid/Grid';
import Slideshow from './slideshow/Slideshow';

export default {
    component: Gallery,
    title: 'Screens/Gallery',
};

export const GridStyle = () => (
    <Story>
        <Grid
            spacing={10}
            isPlaceholder
            images={[
                { url: 'https://picsum.photos/250/250' },
                { url: 'https://picsum.photos/250/250' },
                { url: 'https://picsum.photos/300/250' },
            ]}
        />
    </Story>
);

export const SlideshowStyle = () => (
    <Story>
        <Slideshow
            images={[
                { url: 'https://picsum.photos/250/250' },
                { url: 'https://picsum.photos/250/250' },
                { url: 'https://picsum.photos/300/250' },
            ]}
        />
    </Story>
);
