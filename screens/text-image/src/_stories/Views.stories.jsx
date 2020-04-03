/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { paragraph, image } from '../../../../.storybook/data';

import TextImage from '../index';

import { Top, Center, Bottom } from '../components';

const props = {
    text: { body: paragraph() },
    image: image({ width: 400, height: 400 }),
};

const types = {
    Top: 'Top',
    Center: 'Center',
    Bottom: 'Bottom',
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: Top,
    title: 'Screens/TextImage/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => <TextImage layout={select('layout', types, 'Top')} {...props} />;

export const TextTop = () => (
    <Top
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TextCenter = () => (
    <Center
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TextBottom = () => (
    <Bottom
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);
