/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { paragraph } from '../../../../.storybook/data';

import { Top, Center, Bottom } from '../components';

const props = {
    text: { body: paragraph() },
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: Top,
    title: 'Screens/Text/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const TextTop = () => <Top {...props} textAlign={select('textAlign', options, 'center')} />;

export const TextCenter = () => (
    <Center {...props} textAlign={select('textAlign', options, 'center')} />
);

export const TextBottom = () => (
    <Bottom {...props} textAlign={select('textAlign', options, 'center')} />
);
