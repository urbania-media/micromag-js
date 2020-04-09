/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { images, backgroundImage } from '../../../../.storybook/data';

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

const props = {
    images: images({ count: 20 }),
};

export default {
    component: OnePlusTwo,
    title: 'Screens/Gallery/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const ViewOnePlusTwo = () => <OnePlusTwo {...props} />;

export const ViewOnePlusThree = () => <OnePlusThree {...props} />;

export const ViewTwoPlusOne = () => <TwoPlusOne {...props} />;

export const ViewTwoByTwo = () => <TwoByTwo {...props} />;

export const ViewFourByFour = () => <FourByFour {...props} />;

export const ViewSixByTwo = () => <SixByTwo {...props} background={backgroundImage()} />;

export const ViewThreeByThree = () => <ThreeByThree {...props} />;

export const ViewTwoWide = () => <TwoWide {...props} />;
