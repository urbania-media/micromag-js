/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByLayout, StoryData } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies

import TextScreen from '../Text';
import background from './background.jpg';

import layouts from '../layouts';

const TopArrangement = layouts[0];
const CenterArrangement = layouts[1];
const BottomArrangement = layouts[2];

const props = {
    text: { body: `<p>${StoryData.description()}</p>` },
    background: {
        image: {
            url: background,
        },
        color: '#ddd',
    },
};

console.log(props, StoryData.description());

export default {
    component: TextScreen,
    title: 'Screens/Text',
    decorators: [],
};

export const Placeholders = () => (
    <div style={{ display: 'flex' }}>
        {layouts.map(layout => (
            <StoryByLayout
                key={layout.name}
                layout={layout}
                component={TextScreen}
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
                component={TextScreen}
                storyProps={{
                    text: { body: `<p>${StoryData.description()}</p>` },
                    isPreview: true,
                }}
            />
        ))}
    </div>
);

export const Top = () => (
    <StoryByLayout
        layout={TopArrangement}
        component={TextScreen}
        storyProps={{
            ...props,
        }}
    />
);

export const Center = () => (
    <StoryByLayout
        layout={CenterArrangement}
        component={TextScreen}
        storyProps={{
            ...props,
        }}
    />
);

export const Bottom = () => (
    <StoryByLayout
        layout={BottomArrangement}
        component={TextScreen}
        storyProps={{
            ...props,
        }}
    />
);
