import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import {
    Split,
    SplitReverse,
    ThreeOneSplit,
    ThreeSplit,
    TwoOneSplit,
    Top,
    Center,
    Bottom,
} from '../components';

export default {
    component: Split,
    title: 'Screens/Title/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderSplit = () => <Split renderFormat="placeholder" />;

export const PlaceholderSplitReverse = () => <SplitReverse renderFormat="placeholder" />;

export const PlaceholderThreeOneSplit = () => <ThreeOneSplit renderFormat="placeholder" />;

export const PlaceholderThreeSplit = () => <ThreeSplit renderFormat="placeholder" />;

export const PlaceholderTwoOneSplit = () => <TwoOneSplit renderFormat="placeholder" />;

export const PlaceholderTop = () => <Top renderFormat="placeholder" />;

export const PlaceholderCenter = () => <Center renderFormat="placeholder" />;

export const PlaceholderBottom = () => <Bottom renderFormat="placeholder" />;
