/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Stories, StoryByLayout, StoryData } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies

import Quote from '../Quote';

import layouts from '../layouts';

const TopLayout = layouts[0];
const CenterLayout = layouts[1];
const BottomLayout = layouts[2];

const props = {
    quote: { body: StoryData.quote() },
    author: { body: StoryData.author() },
    source: { body: StoryData.source() },
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: Quote,
    title: 'Screens/Quote',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <>
        <Stories
            layouts={layouts}
            component={Quote}
            storyProps={{ ...props, isPlaceholder: true }}
        />
        <Stories
            layouts={layouts}
            component={Quote}
            storyProps={{ ...props, isPlaceholder: true, textAlign: 'left' }}
        />
        <Stories
            layouts={layouts}
            component={Quote}
            storyProps={{ ...props, isPlaceholder: true, textAlign: 'right' }}
        />
    </>
);

export const Previews = () => (
    <>
        <Stories
            layouts={layouts}
            component={Quote}
            storyProps={{
                ...props,
                isPreview: true,
            }}
        />
        <Stories
            layouts={layouts}
            component={Quote}
            storyProps={{
                ...props,
                isPreview: true,
                textAlign: 'left',
            }}
        />
        <Stories
            layouts={layouts}
            component={Quote}
            storyProps={{
                ...props,
                isPreview: true,
                textAlign: 'right',
            }}
        />
    </>
);

export const Top = () => (
    <StoryByLayout
        layout={TopLayout}
        component={Quote}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const Center = () => (
    <StoryByLayout
        layout={CenterLayout}
        component={Quote}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const Bottom = () => (
    <StoryByLayout
        layout={BottomLayout}
        component={Quote}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);
