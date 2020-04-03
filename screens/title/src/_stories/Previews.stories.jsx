import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';

import {
    OneOneSplit,
    OneOneSplitReverse,
    ThreeOneSplit,
    ThreeSplit,
    TwoOneSplit,
} from '../components';

export default {
    component: OneOneSplit,
    title: 'Screens/Title/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewOneOneSplit = () => <OneOneSplit renderFormat="preview" />;

export const PreviewOneOneSplitReverse = () => <OneOneSplitReverse renderFormat="preview" />;

export const PreviewThreeOneSplit = () => <ThreeOneSplit renderFormat="preview" />;

export const PreviewThreeSplit = () => <ThreeSplit renderFormat="preview" />;

export const PreviewTwoOneSplit = () => <TwoOneSplit renderFormat="preview" />;
