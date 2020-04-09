/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { images, background } from '../../../../.storybook/data';

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
    background: background(),
    images: images({ count: 20 }),
};

export default {
    component: OnePlusTwo,
    title: 'Screens/Gallery/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewOnePlusTwo = () => <OnePlusTwo {...props} renderFormat="preview" />;

export const PreviewOnePlusThree = () => <OnePlusThree {...props} renderFormat="preview" />;

export const PreviewTwoPlusOne = () => <TwoPlusOne {...props} renderFormat="preview" />;

export const PreviewTwoByTwo = () => <TwoByTwo {...props} renderFormat="preview" />;

export const PreviewFourByFour = () => <FourByFour {...props} renderFormat="preview" />;

export const PreviewSixByTwo = () => <SixByTwo {...props} renderFormat="preview" />;

export const PreviewThreeByThree = () => <ThreeByThree {...props} renderFormat="preview" />;

export const PreviewTwoWide = () => <TwoWide {...props} renderFormat="preview" />;
