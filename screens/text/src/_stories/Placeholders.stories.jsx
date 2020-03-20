/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByArrangement } from '@micromag/core';

import { ScreenSize } from './storybook';

import Text from '../text/Text';
import textArrangements from '../text/arrangements';

import TextImage from '../text-image/TextImage';
import textImageArrangements from '../text-image/arrangements';

const layoutProps = { spacing: 4 };

export default {
    component: Text,
    title: 'Screens/Text/Placeholders',
    decorators: [ScreenSize({ width: 100, height: 150 })],
};

export const TextPlaceholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {textArrangements.map(arr => (
            <StoryByArrangement
                key={arr.name}
                arrangement={arr}
                component={Text}
                spacing={4}
                itemProps={{ isPlaceholder: true }}
                layoutProps={layoutProps}
            />
        ))}
    </div>
);

export const TextImagePlaceholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {textImageArrangements.map(arr => (
            <StoryByArrangement
                key={arr.name}
                arrangement={arr}
                component={TextImage}
                spacing={4}
                itemProps={{ isPlaceholder: true }}
                layoutProps={layoutProps}
            />
        ))}
    </div>
);
