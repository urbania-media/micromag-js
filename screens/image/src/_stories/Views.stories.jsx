/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import {
    imageWithRandomSize,
    background,
    backgroundWithImage,
    shortText,
} from '../../../../.storybook/data';

import { Top, Center, Bottom } from '../components';

const props = {
    image: imageWithRandomSize(),
    background: background(),
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: Center,
    title: 'Screens/Image/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const ViewTop = () => <Top {...props} />;

export const ViewCenter = () => <Center {...props} />;

export const ViewBottom = () => <Bottom {...props} />;

export const ViewCenterWithText = () => (
    <Center
        {...props}
        text={{ body: shortText() }}
        textAlign={select('textAlign', options, 'center')}
    />
);

export const ViewCenterWithTextAndBackground = () => (
    <Center
        {...props}
        text={{
            body: shortText(),
            style: { text: { color: '#999', font: { size: '30px', style: { bold: true } } } },
        }}
        textAlign={select('textAlign', options, 'center')}
        background={backgroundWithImage()}
    />
);
