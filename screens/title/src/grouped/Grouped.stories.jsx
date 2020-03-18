/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { StoryByArrangement } from '@micromag/core';

import Title from '../Title';
import Grouped from './Grouped';

import arrangements from './arrangements';

const TopTitleArrangement = arrangements[0];
const TopTitleReverseArrangement = arrangements[1];
const TopSubtitleArrangement = arrangements[2];
const TopSubtitleReverseArrangement = arrangements[3];
const TopDescriptionArrangement = arrangements[4];
const TopDescriptionReverseArrangement = arrangements[5];
const TopDescriptionBottomSubtitleArrangement = arrangements[6];
const TopDescriptionBottomSubtitleReverseArrangement = arrangements[7];

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
    title: 'Screens/Title/Grouped',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {arrangements.map(arr => (
            <StoryByArrangement
                key={arr.name}
                arrangement={arr}
                component={Grouped}
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
                component={Grouped}
                itemProps={{
                    ...props,
                    isPreview: true,
                }}
            />
        ))}
    </div>
);

export const TopTitle = () => (
    <StoryByArrangement
        arrangement={TopTitleArrangement}
        component={Grouped}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopTitleReverse = () => (
    <StoryByArrangement
        arrangement={TopTitleReverseArrangement}
        component={Grouped}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopSubtitle = () => (
    <StoryByArrangement
        arrangement={TopSubtitleArrangement}
        component={Grouped}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopSubtitleReverse = () => (
    <StoryByArrangement
        arrangement={TopSubtitleReverseArrangement}
        component={Grouped}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopDescription = () => (
    <StoryByArrangement
        arrangement={TopDescriptionArrangement}
        component={Grouped}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopDescriptionReverse = () => (
    <StoryByArrangement
        arrangement={TopDescriptionReverseArrangement}
        component={Grouped}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopDescriptionBottomSubtitle = () => (
    <StoryByArrangement
        arrangement={TopDescriptionBottomSubtitleArrangement}
        component={Grouped}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopDescriptionBottomSubtitleReverse = () => (
    <StoryByArrangement
        arrangement={TopDescriptionBottomSubtitleReverseArrangement}
        component={Grouped}
        itemProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);
