/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, StoryByLayout } from '@micromag/helper-storybook'; // eslint-disable-line import/no-extraneous-dependencies
// import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies

import Title from '../Title';

export default {
    component: Title,
    title: 'Screens/Title',
    // decorators: [withKnobs],
};

const props = {
    title: { body: 'Un titre' },
    subtitle: { body: 'Un sous-titre' },
    description: { body: 'Une courte description' },
};

export const Placeholder = () => (
    <StoryByLayout
        layout={{ name: 'default', props: {} }}
        component={Title}
        storyProps={{ ...props, isPlaceholder: true }}
    />
);

export const Normal = () => (
    <Story>
        <Title {...props} />
    </Story>
);

export const Split = () => (
    <Story>
        <Title {...props} split />
    </Story>
);
