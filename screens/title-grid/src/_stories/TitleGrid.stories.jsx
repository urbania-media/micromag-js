/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { title, subtitle, paragraph } from '../../../../.storybook/data';

import TitleGrid from '../TitleGrid';

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
    component: TitleGrid,
    title: 'Screens/TitleGrid',
    decorators: [withKnobs],
};

export const ThreeSplit = () => <TitleGrid {...props} />;

export const OneOneSplit = () => (
    <TitleGrid
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const OneOneSplitReverse = () => (
    <TitleGrid
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const TwoOneSplit = () => (
    <TitleGrid
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);

export const ThreeOneSplit = () => (
    <TitleGrid
        {...props}
        textAlign={select('textAlign', options, 'left')}
        reverse={boolean('reverse', false)}
    />
);
