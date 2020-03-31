/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { paragraph } from '../../../../.storybook/data';

import TextComponent from '../index';

import { Top, Center, Bottom } from '../components';

const props = {
    text: { body: paragraph() },
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
    title: 'Screens/Text',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => <TextComponent layout={select('layout', types, 'Top')} {...props} />;

export const TextTop = () => (
    <Top
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const TextCenter = () => (
    <Center
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const TextBottom = () => (
    <Bottom
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);
