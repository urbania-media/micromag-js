import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import {
    OneOneSplit,
    OneOneSplitReverse,
    ThreeOneSplit,
    ThreeSplit,
    TwoOneSplit,
} from '../components';

export default {
    component: OneOneSplit,
    title: 'Screens/Title/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderOneOneSplit = () => <OneOneSplit renderFormat="placeholder" />;

export const PlaceholderOneOneSplitReverse = () => (
    <OneOneSplitReverse renderFormat="placeholder" />
);

export const PlaceholderThreeOneSplit = () => <ThreeOneSplit renderFormat="placeholder" />;

export const PlaceholderThreeSplit = () => <ThreeSplit renderFormat="placeholder" />;

export const PlaceholderTwoOneSplit = () => <TwoOneSplit renderFormat="placeholder" />;
