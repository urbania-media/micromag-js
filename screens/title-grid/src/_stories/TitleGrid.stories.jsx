/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { Stories, StoryByLayout, StoryData } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies

import TitleGrid from '../TitleGrid';

import layouts from '../layouts';

const ThreeSplitArrangement = layouts[0];
const OneOneSplitArrangement = layouts[1];
const OneOneSplitReverseArrangement = layouts[2];
const TwoOneSplitArrangement = layouts[3];
const ThreeOneSplitArrangement = layouts[4];

const props = {
    title: { body: StoryData.title() },
    subtitle: { body: StoryData.subtitle() },
    description: {
        body: StoryData.description(),
    },
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: TitleGrid,
    title: 'Screens/TitleGrid',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <>
        <Stories
            layouts={layouts}
            component={TitleGrid}
            storyProps={{ ...props, isPlaceholder: true }}
        />
        <Stories
            layouts={layouts}
            component={TitleGrid}
            storyProps={{ ...props, isPlaceholder: true, textAlign: 'left' }}
        />
        <Stories
            layouts={layouts}
            component={TitleGrid}
            storyProps={{ ...props, isPlaceholder: true, textAlign: 'right' }}
        />
    </>
);

export const Previews = () => (
    <>
        <Stories
            layouts={layouts}
            component={TitleGrid}
            storyProps={{
                ...props,
                isPreview: true,
            }}
        />
        <Stories
            layouts={layouts}
            component={TitleGrid}
            storyProps={{
                ...props,
                isPreview: true,
                textAlign: 'left',
            }}
        />
        <Stories
            layouts={layouts}
            component={TitleGrid}
            storyProps={{
                ...props,
                isPreview: true,
                textAlign: 'right',
            }}
        />
    </>
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
