/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { background } from '../../../../.storybook/data';

import {
    OneOneSplit,
    OneOneSplitReverse,
    ThreeOneSplit,
    ThreeSplit,
    TwoOneSplit,
} from '../components';

const props = {
    background: background(),
};

export default {
    component: OneOneSplit,
    title: 'Screens/Title/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewOneOneSplit = () => <OneOneSplit {...props} renderFormat="preview" />;

export const PreviewOneOneSplitReverse = () => (
    <OneOneSplitReverse {...props} renderFormat="preview" />
);

export const PreviewThreeOneSplit = () => <ThreeOneSplit {...props} renderFormat="preview" />;

export const PreviewThreeSplit = () => <ThreeSplit {...props} renderFormat="preview" />;

export const PreviewTwoOneSplit = () => <TwoOneSplit {...props} renderFormat="preview" />;
