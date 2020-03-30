/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { quote, author, source } from '../../../../.storybook/data';

import Quote from '../index';
import {
    QuoteTop,
    QuoteCenter,
    QuoteBottom,
    QuoteTopCentered,
    QuoteBottomCentered,
    QuoteSplit,
} from '../components';

const props = {
    quote: { body: quote() },
    author: { body: author() },
    source: { body: source() },
};

const types = {
    QuoteTop: 'QuoteTop',
    QuoteCenter: 'QuoteCenter',
    QuoteBottom: 'QuoteBottom',
    QuoteTopCentered: 'QuoteTopCentered',
    QuoteBottomCentered: 'QuoteBottomCentered',
    QuoteSplit: 'QuoteSplit',
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: QuoteTop,
    title: 'Screens/Quote',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => <Quote layout={select('layout', types, 'QuoteTop')} {...props} />;

export const Top = () => (
    <QuoteTop
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const Center = () => (
    <QuoteCenter
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const Bottom = () => (
    <QuoteBottom
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const TopCentered = () => (
    <QuoteTopCentered
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const BottomCentered = () => (
    <QuoteBottomCentered
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const Split = () => (
    <QuoteSplit
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);
