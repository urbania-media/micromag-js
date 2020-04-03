/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { title, subtitle, paragraph, renderFormats } from '../../../../.storybook/data';

import Title from '../index';

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

const types = {
    Top: 'Top',
    Center: 'Center',
    Bottom: 'Bottom',
    TopCentered: 'TopCentered',
    BottomCentered: 'BottomCentered',
    Split: 'Split',
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

export const Layouts = () => <Title layout={select('layout', types, 'Top')} {...props} />;

export const ViewOneOneSplit = () => (
    <OneOneSplit
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewOneOneSplitReverse = () => (
    <OneOneSplitReverse
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewThreeOneSplit = () => (
    <ThreeOneSplit
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewThreeSplit = () => (
    <ThreeSplit
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewTwoOneSplit = () => (
    <TwoOneSplit
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);
