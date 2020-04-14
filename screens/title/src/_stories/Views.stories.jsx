/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { title, subtitle, text } from '../../../../.storybook/data';

import {
    Split,
    SplitReverse,
    ThreeOneSplit,
    ThreeSplit,
    TwoOneSplit,
    Top,
    Center,
    Bottom,
    TopSubtitle,
    TopSubtitleReverse,
    TopDescriptionBottomSubtitle,
    TopSubtitleBottomDescription,
} from '../components';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    description: text(),
};

const options = {
    Center: 'center',
    Left: 'left',
    Right: 'right',
    None: null,
};

export default {
    component: Split,
    title: 'Screens/Title/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const ViewSplit = () => (
    <Split {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewSplitReverse = () => (
    <SplitReverse {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewThreeOneSplit = () => (
    <ThreeOneSplit {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewThreeSplit = () => (
    <ThreeSplit {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewTwoOneSplit = () => (
    <TwoOneSplit {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewTop = () => <Top {...props} textAlign={select('textAlign', options, 'center')} />;

export const ViewCenter = () => (
    <Center {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewBottom = () => (
    <Bottom {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewTopSubtitle = () => (
    <TopSubtitle {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewTopSubtitleReverse = () => (
    <TopSubtitleReverse {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewTopDescriptionBottomSubtitle = () => (
    <TopDescriptionBottomSubtitle {...props} textAlign={select('textAlign', options, 'center')} />
);

export const ViewTopSubtitleBottomDescription = () => (
    <TopSubtitleBottomDescription {...props} textAlign={select('textAlign', options, 'center')} />
);
