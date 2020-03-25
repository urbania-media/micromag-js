/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
import { lorem } from 'faker'; // eslint-disable-line import/no-extraneous-dependencies

import TextImage from '../TextImage';
// import background from './background.jpg';

import layouts from '../layouts';

const TopArrangement = layouts[0];
const CenterArrangement = layouts[1];
const BottomArrangement = layouts[2];

const props = {
    text: { body: `<p>${lorem.paragraphs()}</p>` },
    image: {
        url: 'https://picsum.photos/300/500',
    },
    background: {
        color: '#eee',
    },
};

export default {
    component: TextImage,
    title: 'Screens/TextImage',
    decorators: [],
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {layouts.map(arr => (
            <StoryByLayout
                key={arr.name}
                layout={arr}
                component={TextImage}
                spacing={4}
                storyProps={{ isPlaceholder: true }}
            />
        ))}
    </div>
);

export const Previews = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {layouts.map(arr => (
            <StoryByLayout
                key={arr.name}
                layout={arr}
                component={TextImage}
                storyProps={{ text: { body: `<p>${lorem.sentences()}</p>` }, isPreview: true }}
            />
        ))}
    </div>
);

export const Top = () => (
    <StoryByLayout
        layout={TopArrangement}
        component={TextImage}
        storyProps={{
            ...props,
        }}
    />
);

export const Center = () => (
    <StoryByLayout
        layout={CenterArrangement}
        component={TextImage}
        storyProps={{
            ...props,
        }}
    />
);

export const Bottom = () => (
    <StoryByLayout
        layout={BottomArrangement}
        component={TextImage}
        storyProps={{
            ...props,
        }}
    />
);
