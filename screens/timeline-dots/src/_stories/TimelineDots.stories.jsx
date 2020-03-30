/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StoryByLayout, StoryData } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies

import TimelineDots from '../TimelineDots';

export default {
    component: TimelineDots,
    title: 'Screens/TimelineDots',
    decorators: [withKnobs],
};

const title = {
    text: { body: StoryData.title() },
};

const items = [
    { text: { body: StoryData.description() } },
    { text: { body: StoryData.description() } },
    { text: { body: StoryData.description() } },
];

const background = {
    image: {
        url: 'https://picsum.photos/400/600',
    },
    color: '#ddd',
};

export const Placeholders = () => (
    <div style={{ display: 'flex' }}>
        <StoryByLayout
            layout={{ name: 'default' }}
            component={TimelineDots}
            storyProps={{ isPlaceholder: true, items }}
        />
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

export const DefaultTimelineDots = () => (
    <StoryByLayout
        layout={{ name: 'default' }}
        component={TimelineDots}
        storyProps={{
            title,
            items,
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
