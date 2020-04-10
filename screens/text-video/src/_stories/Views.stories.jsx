/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { text, video, background } from '../../../../.storybook/data';

import { Top, TopReverse, Center, CenterReverse, Bottom, BottomReverse } from '../components';

const props = {
    text: text(),
    video: video(),
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
    title: 'Screens/TextVideo/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const ViewTop = () => <Top {...props} textAlign={select('textAlign', options, 'left')} />;

export const ViewTopReverse = () => (
    <TopReverse {...props} textAlign={select('textAlign', options, 'left')} />
);

export const ViewCenter = () => (
    <Center {...props} textAlign={select('textAlign', options, 'left')} />
);

export const ViewCenterReverse = () => (
    <CenterReverse {...props} textAlign={select('textAlign', options, 'left')} />
);

export const ViewBottom = () => (
    <Bottom {...props} textAlign={select('textAlign', options, 'left')} />
);

export const ViewBottomReverse = () => (
    <BottomReverse {...props} textAlign={select('textAlign', options, 'left')} />
);
