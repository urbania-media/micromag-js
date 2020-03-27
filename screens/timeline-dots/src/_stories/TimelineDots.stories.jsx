/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies

import layouts from '../layouts';

import TimelineDots from '../TimelineDots';

export default {
    component: TimelineDots,
    title: 'Screens/TimelineDots',
    decorators: [withKnobs],
};

const title = {
    text: { body: "relkjzdglkjdflgdjb" },
};

const items = [
    { text: { body: "relkjzdglkjdflgdjb" } },
    { text: { body: "relkjzdglkjdflgdjb" } },
    { text: { body: "relkjzdglkjdflgdjb" } },
];

const itemsWithImage = [
    {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        text: { body: "relkjzdglkjdflgdjb" },
    },
    {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        text: { body: "relkjzdglkjdflgdjb"` },
    },
    {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        text: { body: "relkjzdglkjdflgdjb" },
    },
];

const itemsWithHeading = [
    { heading: { body: 'heading' }, text: { body: "relkjzdglkjdflgdjb" } },
    { heading: { body: 'heading' }, text: { body: "relkjzdglkjdflgdjb" } },
    { heading: { body: 'heading' }, text: { body: "relkjzdglkjdflgdjb" } },
];
const background = {
    image: {
        url: 'https://picsum.photos/400/600',
    },
    color: '#ddd',
};

const WithIntroArrangement = layouts[0];
const WithImageArrangement = layouts[1];
const WithHeaderArrangement = layouts[2];

export const Placeholders = () => (
    <div style={{ display: 'flex' }}>
        {layouts.map(layout => (
            <StoryByLayout
                key={layout.name}
                layout={layout}
                component={TimelineDots}
                storyProps={{ isPlaceholder: true }}
            />
        ))}
    </div>
);

// export const Preview = () => (
//     <div style={{ display: 'flex' }}>
//         {layouts.map(layout => (
//             <StoryByLayout
//                 key={layout.name}
//                 layout={layout}
//                 component={TimelineDots}
//                 storyProps={{ isPreview: true }}
//             />
//         ))}
//     </div>
// );

export const WithIntro = () => (
    <StoryByLayout
        layout={WithIntroArrangement}
        component={TimelineDots}
        storyProps={{
            title,
            items,
            background,
        }}
    />
);

export const WithImage = () => (
    <StoryByLayout
        layout={WithImageArrangement}
        component={TimelineDots}
        storyProps={{
            items : itemsWithImage,
            background,
        }}
    />
);

export const WithHeader = () => (
    <StoryByLayout
        layout={WithHeaderArrangement}
        component={TimelineDots}
        storyProps={{
            items: itemsWithHeading,
            background,
        }}
    />
);

// export const Exemple = () => (
//     <Story>
//         <TimelineDots
//             isPlaceholder={boolean('isPlaceholder', false)}
//             isPreview={boolean('isPreview', false)}
//             {...props}
//         />
//     </Story>
// );
