/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, StoryByArrangement } from '@micromag/core';

// import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies

import Title from '../Title';
import Default from './Default';

export default {
    component: Title,
    title: 'Screens/Title/Default',
    // decorators: [withKnobs],
};

const props = {
    title: { body: 'Un titre' },
    subtitle: { body: 'Un sous-titre' },
    description: { body: 'Une courte description' },
};

export const Placeholder = () => (
    <StoryByArrangement
        arrangement={{ name: 'default', props: {} }}
        component={Default}
        itemProps={{ ...props, isPlaceholder: true }}
    />
);

export const Normal = () => (
    <Story>
        <Default {...props} />
    </Story>
);

export const Split = () => (
    <Story>
        <Default {...props} split />
    </Story>
);
