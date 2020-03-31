/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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

export const Placeholder = () => <Title {...props} />;

export const Normal = () => <Title {...props} />;

export const Split = () => <Title {...props} />;
