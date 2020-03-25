/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
import Slideshow from '../Slideshow';

import layouts from '../layouts';

const Default = layouts[0];

const images = [
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
    { url: 'https://picsum.photos/100/150' },
];

export default {
    component: Slideshow,
    title: 'Screens/Slideshow',
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {layouts.map(arr => (
            <StoryByLayout
                layout={arr}
                component={Slideshow}
                storyProps={{ isPlaceholder: true }}
            />
        ))}
    </div>
);

export const Previews = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {layouts.map(arr => (
            <StoryByLayout
                layout={arr}
                component={Slideshow}
                storyProps={{
                    isPreview: true,
                    images,
                }}
            />
        ))}
    </div>
);

export const Normal = () => (
    <StoryByLayout
        layout={Default}
        component={Slideshow}
        storyProps={{
            images,
        }}
    />
);
