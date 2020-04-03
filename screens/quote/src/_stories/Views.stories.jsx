/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { quote, author, source, background, renderFormats } from '../../../../.storybook/data';

import { Top, Center, Bottom, TopCentered, BottomCentered, Split } from '../components';

const props = {
    quote: { body: quote(), style: { text: { color: '#FFF' } } },
    author: { body: author() },
    source: { body: source() },
    background: background(),
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
