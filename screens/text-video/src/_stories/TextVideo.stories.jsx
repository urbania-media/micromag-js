/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { paragraph, video } from '../../../../.storybook/data';

import TextVideo from '../index';

import { Top, Center, Bottom } from '../components';

const props = {
    text: { body: paragraph() },
    video: video(),
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
    title: 'Screens/TextVideo',
    decorators: [withKnobs, withScreenSize()],
};

export const Layouts = () => <TextVideo layout={select('layout', types, 'Top')} {...props} />;

export const TextVideoTop = () => (
    <Top
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TextVideoCenter = () => (
    <Center
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TextVideoBottom = () => (
    <Bottom
        {...props}
        isPreview={boolean('isPreview', false)}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);
