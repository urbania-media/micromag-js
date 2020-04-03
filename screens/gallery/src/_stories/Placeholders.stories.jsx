/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import {
    OnePlusTwo,
    OnePlusThree,
    TwoPlusOne,
    TwoByTwo,
    FourByFour,
    SixByTwo,
    ThreeByThree,
    TwoWide,
} from '../components';

const props = {};

export default {
    component: OnePlusTwo,
    title: 'Screens/Gallery/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderOnePlusTwo = () => <OnePlusTwo {...props} renderFormat="placeholder" />;

export const PlaceholderOnePlusThree = () => <OnePlusThree {...props} renderFormat="placeholder" />;

export const PlaceholderTwoPlusOne = () => <TwoPlusOne {...props} renderFormat="placeholder" />;

export const PlaceholderTwoByTwo = () => <TwoByTwo {...props} renderFormat="placeholder" />;

export const PlaceholderFourByFour = () => <FourByFour {...props} renderFormat="placeholder" />;

export const PlaceholderSixByTwo = () => <SixByTwo {...props} renderFormat="placeholder" />;

export const PlaceholderThreeByThree = () => <ThreeByThree {...props} renderFormat="placeholder" />;

export const PlaceholderTwoWide = () => <TwoWide {...props} renderFormat="placeholder" />;
