/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
import { lorem } from 'faker'; // eslint-disable-line import/no-extraneous-dependencies

import TextVideo from '../TextVideo';

import layouts from '../layouts';

const TopArrangement = layouts[0];
const CenterArrangement = layouts[1];
const BottomArrangement = layouts[2];

const props = {
    text: { body: `<p>${lorem.paragraphs()}</p>` },
    background: {
        color: '#eee',
    },
};

export default {
    component: TextVideo,
    title: 'Screens/TextVideo',
};

export const TextVideoPlaceholders = () => (
    <div style={{ display: 'flex' }}>
        {layouts.map(layout => (
            <StoryByLayout
                key={layout.name}
                layout={layout}
                component={TextVideo}
                storyProps={{ isPlaceholder: true }}
            />
        ))}
    </div>
);

export const Top = () => (
    <StoryByLayout
        layout={TopArrangement}
        component={TextVideo}
        storyProps={{
            ...props,
        }}
    />
);

export const Center = () => (
    <StoryByLayout
        layout={CenterArrangement}
        component={TextVideo}
        storyProps={{
            ...props,
        }}
    />
);

export const Bottom = () => (
    <StoryByLayout
        layout={BottomArrangement}
        component={TextVideo}
        storyProps={{
            ...props,
        }}
    />
);
