/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { paragraph } from '../../../../.storybook/data';

import TextComponent from '../index';

import { TextTop, TextCenter, TextBottom } from '../components';

const props = {
    text: { body: paragraph() },
};

const types = {
    TextTop: 'TextTop',
    TextCenter: 'TextCenter',
    TextBottom: 'TextBottom',
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: TextTop,
    title: 'Screens/Text',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => (
    <TextComponent layout={select('layout', types, 'TextTop')} {...props} />
);

export const Top = () => (
    <TextTop
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const Center = () => (
    <TextCenter
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const Bottom = () => (
    <TextBottom
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'center')}
    />
);
