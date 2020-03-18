/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { StoryByArrangement } from '@micromag/core';

import Title from '../Title';
import Grid from './Grid';

import arrangements from './arrangements';

const ThreeSplitArrangement = arrangements[0];
const OneOneSplitArrangement = arrangements[1];
const OneOneSplitReverseArrangement = arrangements[2];
const TwoOneSplitArrangement = arrangements[3];
const ThreeOneSplitArrangement = arrangements[4];

const props = {
    title: { body: 'Un titre' },
    subtitle: { body: 'Un sous-titre' },
    description: { body: 'Une courte description' },
};

const options = {
    Centre: 'center',
    Gauche: 'left',
    Droite: 'right',
    Aucun: null,
};

export default {
    component: Title,
    title: 'Screens/Title/Grid',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {arrangements.map(arr => (
            <StoryByArrangement
                key={arr.name}
                arrangement={arr}
                component={Grid}
                itemProps={{ ...props, isPlaceholder: true }}
            />
        ))}
    </div>
);

export const Previews = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {arrangements.map(arr => (
            <StoryByArrangement
                key={arr.name}
                arrangement={arr}
                component={Grid}
                itemProps={{
                    ...props,
                    isPreview: true,
                }}
            />
        ))}
    </div>
);

export const ThreeSplit = () => (
    <StoryByArrangement
        arrangement={ThreeSplitArrangement}
        component={Grid}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const OneOneSplit = () => (
    <StoryByArrangement
        arrangement={OneOneSplitArrangement}
        component={Grid}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const OneOneSplitReverse = () => (
    <StoryByArrangement
        arrangement={OneOneSplitReverseArrangement}
        component={Grid}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TwoOneSplit = () => (
    <StoryByArrangement
        arrangement={TwoOneSplitArrangement}
        component={Grid}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const ThreeOneSplit = () => (
    <StoryByArrangement
        arrangement={ThreeOneSplitArrangement}
        component={Grid}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);
//
// export const TopSubtitleReverse = () => (
//     <StoryByArrangement
//         arrangement={TopSubtitleReverseArrangement}
//         component={Grid}
//         itemProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
//
// export const TopDescription = () => (
//     <StoryByArrangement
//         arrangement={TopDescriptionArrangement}
//         component={Grid}
//         itemProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
//
// export const TopDescriptionReverse = () => (
//     <StoryByArrangement
//         arrangement={TopDescriptionReverseArrangement}
//         component={Grid}
//         itemProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
//
// export const TopDescriptionBottomSubtitle = () => (
//     <StoryByArrangement
//         arrangement={TopDescriptionBottomSubtitleArrangement}
//         component={Grid}
//         itemProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
//
// export const TopDescriptionBottomSubtitleReverse = () => (
//     <StoryByArrangement
//         arrangement={TopDescriptionBottomSubtitleReverseArrangement}
//         component={Grid}
//         itemProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
