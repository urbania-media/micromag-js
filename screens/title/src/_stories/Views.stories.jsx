/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { title, subtitle, paragraph } from '../../../../.storybook/data';

import {
    OneOneSplit,
    OneOneSplitReverse,
    ThreeOneSplit,
    ThreeSplit,
    TwoOneSplit,
} from '../components';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    description: {
        body: paragraph(),
    },
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: OneOneSplit,
    title: 'Screens/Title/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const ViewOneOneSplit = () => (
    <OneOneSplit {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewOneOneSplitReverse = () => (
    <OneOneSplitReverse {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewThreeOneSplit = () => (
    <ThreeOneSplit {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewThreeSplit = () => (
    <ThreeSplit {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewTwoOneSplit = () => (
    <TwoOneSplit {...props} textAlign={select('textAlign', options, 'center')} />
);
