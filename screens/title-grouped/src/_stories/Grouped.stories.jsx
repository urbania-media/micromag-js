/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies

import Title from '../TitleGrouped';

import layouts from '../layouts-normal';

const TopTitleArrangement = layouts[0];
const TopTitleReverseArrangement = layouts[1];
const TopSubtitleArrangement = layouts[2];
const TopSubtitleReverseArrangement = layouts[3];
const TopDescriptionArrangement = layouts[4];
const TopDescriptionReverseArrangement = layouts[5];
const TopDescriptionBottomSubtitleArrangement = layouts[6];
const TopDescriptionBottomSubtitleReverseArrangement = layouts[7];

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
    title: 'Screens/TitleGrouped',
    decorators: [withKnobs],
};

export const Placeholders = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {layouts.map(layout => (
            <StoryByLayout
                key={layout.name}
                layout={layout}
                component={Title}
                storyProps={{ ...props, isPlaceholder: true }}
            />
        ))}
    </div>
);

export const Previews = () => (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
        {layouts.map(layout => (
            <StoryByLayout
                key={layout.name}
                layout={layout}
                component={Title}
                storyProps={{
                    ...props,
                    isPreview: true,
                }}
            />
        ))}
    </div>
);

export const TopTitle = () => (
    <StoryByLayout
        layout={TopTitleArrangement}
        component={Title}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopTitleReverse = () => (
    <StoryByLayout
        layout={TopTitleReverseArrangement}
        component={Title}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopSubtitle = () => (
    <StoryByLayout
        layout={TopSubtitleArrangement}
        component={Title}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopSubtitleReverse = () => (
    <StoryByLayout
        layout={TopSubtitleReverseArrangement}
        component={Title}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopDescription = () => (
    <StoryByLayout
        layout={TopDescriptionArrangement}
        component={Title}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopDescriptionReverse = () => (
    <StoryByLayout
        layout={TopDescriptionReverseArrangement}
        component={Title}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopDescriptionBottomSubtitle = () => (
    <StoryByLayout
        layout={TopDescriptionBottomSubtitleArrangement}
        component={Title}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);

export const TopDescriptionBottomSubtitleReverse = () => (
    <StoryByLayout
        layout={TopDescriptionBottomSubtitleReverseArrangement}
        component={Title}
        storyProps={{
            ...props,
            isPlaceholder: boolean('isPlaceholder', false),
            textAlign: select('textAlign', options, 'center'),
        }}
    />
);
