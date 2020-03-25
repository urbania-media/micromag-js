/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies

import TitleGrid from '../TitleGrid';

import layouts from '../layouts';

const ThreeSplitArrangement = layouts[0];
const OneOneSplitArrangement = layouts[1];
const OneOneSplitReverseArrangement = layouts[2];
const TwoOneSplitArrangement = layouts[3];
const ThreeOneSplitArrangement = layouts[4];

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
    component: TitleGrid,
    title: 'Screens/TitleGrid',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {layouts.map(arr => (
            <StoryByLayout
                key={arr.name}
                layout={arr}
                component={TitleGrid}
                storyProps={{ ...props, isPlaceholder: true }}
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
                component={TitleGrid}
                storyProps={{
                    ...props,
                    isPreview: true,
                }}
            />
        ))}
    </div>
);

export const ThreeSplit = () => (
    <StoryByLayout
        layout={ThreeSplitArrangement}
        component={TitleGrid}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const OneOneSplit = () => (
    <StoryByLayout
        layout={OneOneSplitArrangement}
        component={TitleGrid}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const OneOneSplitReverse = () => (
    <StoryByLayout
        layout={OneOneSplitReverseArrangement}
        component={TitleGrid}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TwoOneSplit = () => (
    <StoryByLayout
        layout={TwoOneSplitArrangement}
        component={TitleGrid}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const ThreeOneSplit = () => (
    <StoryByLayout
        layout={ThreeOneSplitArrangement}
        component={TitleGrid}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);
//
// export const TopSubtitleReverse = () => (
//     <StoryByLayout
//         layout={TopSubtitleReverseArrangement}
//         component={TitleGrid}
//         storyProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
//
// export const TopDescription = () => (
//     <StoryByLayout
//         layout={TopDescriptionArrangement}
//         component={TitleGrid}
//         storyProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
//
// export const TopDescriptionReverse = () => (
//     <StoryByLayout
//         layout={TopDescriptionReverseArrangement}
//         component={TitleGrid}
//         storyProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
//
// export const TopDescriptionBottomSubtitle = () => (
//     <StoryByLayout
//         layout={TopDescriptionBottomSubtitleArrangement}
//         component={TitleGrid}
//         storyProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
//
// export const TopDescriptionBottomSubtitleReverse = () => (
//     <StoryByLayout
//         layout={TopDescriptionBottomSubtitleReverseArrangement}
//         component={TitleGrid}
//         storyProps={{
//             ...props,
//             isPlaceholder: boolean('isPlaceholder', false),
//             textAlign: select('textAlign', options, 'center'),
//         }}
//     />
// );
