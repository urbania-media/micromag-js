/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story } from '@micromag/core';
import Title from './Title';
import Default from './Default';
import Split from './Split';

export default {
    component: Title,
    title: 'Screens/Title',
};

const props = {
    title: { body: 'Un titre' },
    subtitle: { body: 'Un sous-titre' },
    description: { body: 'Une courte description' },
};

export const DefaultStyle = () => (
    <Story>
        <Default {...props} />
    </Story>
);

export const SplitStyle = () => (
    <Story>
        <Split {...props} />
    </Story>
);
