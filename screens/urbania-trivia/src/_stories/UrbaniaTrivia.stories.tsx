/* eslint-disable react/jsx-props-no-spreading */
import ScreenDefinition from '#.storybook/components/ScreenDefinition';
import triviaData from '#.storybook/data/stories/urbania-trivia';
import preview from '#.storybook/preview';
import React from 'react';

import UrbaniaTrivia from '../UrbaniaTrivia';
import definition from '../definition';

import '../../../../.storybook/fonts/fonts.css';

const meta = preview.meta({
    title: 'Urbania Screens/Trivia',
    component: UrbaniaTrivia,

    parameters: {
        intl: true,
        screenDefinition: definition,
    },
});

export const Cool = meta.story(() => <p>Hello</p>);

export const Placeholder = meta.story((args) => <UrbaniaTrivia {...args} />);

export const Preview = meta.story((args) => <UrbaniaTrivia {...args} {...triviaData} />);

export const Static = meta.story((args) => <UrbaniaTrivia {...args} {...triviaData} />);

export const Capture = meta.story((args) => <UrbaniaTrivia {...args} {...triviaData} />);

export const Edit = meta.story((args) => <UrbaniaTrivia {...args} />);

export const Normal = meta.story((args) => <UrbaniaTrivia {...args} {...triviaData} />);

export const Definition = meta.story((args) => <ScreenDefinition {...args} />);
