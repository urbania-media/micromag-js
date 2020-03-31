/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { quote, author, source, renderFormats } from '../../../../.storybook/data';

import { Quote } from '../index';

import {
    Top,
    Center,
    Bottom,
    TopCentered,
    BottomCentered,
    Split,
    SplitReverse,
} from '../components';

const props = {
    quote: { body: quote() },
    author: { body: author() },
    source: { body: source() },
};

const types = {
    Top: 'Top',
    Center: 'Center',
    Bottom: 'Bottom',
    TopCentered: 'TopCentered',
    BottomCentered: 'BottomCentered',
    Split: 'Split',
    SplitReverse: 'SplitReverse',
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: Top,
    title: 'Screens/Quote/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => <Quote layout={select('layout', types, 'Top')} {...props} />;

export const ViewTop = () => (
    <Top
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewCenter = () => (
    <Center
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewBottom = () => (
    <Bottom
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewTopCentered = () => (
    <TopCentered
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewBottomCentered = () => (
    <BottomCentered
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewSplit = () => (
    <Split
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewSplitReverse = () => (
    <SplitReverse
        {...props}
        renderFormat={select('renderFormat', renderFormats, 'view')}
        textAlign={select('textAlign', options, 'center')}
    />
);
