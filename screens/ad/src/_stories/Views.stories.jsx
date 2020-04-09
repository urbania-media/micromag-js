/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { advertising, background, backgroundWithPattern } from '../../../../.storybook/data';

import { Center } from '../components';

const props = {
    background: background(),
};

export default {
    component: Center,
    title: 'Screens/Ad/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const MediumRectangle = () => <Center ad={advertising({ width: 300, height: 250 })} />;

export const LargeRectangle = () => <Center ad={advertising({ width: 336, height: 280 })} />;

export const Skyscraper = () => <Center ad={advertising({ width: 300, height: 600 })} />;

export const MobilePortrait = () => <Center ad={advertising({ width: 320, height: 480 })} />;

export const MediumRectangleWithBackground = () => (
    <Center ad={advertising({ width: 300, height: 250 })} {...props} />
);

export const MediumRectangleWithBackgroundPattern = () => (
    <Center ad={advertising({ width: 300, height: 250 })} background={backgroundWithPattern()} />
);

export const FullScreen = () => (
    <Center ad={advertising({ width: 500, height: 700 })} {...props} isFullScreen />
);
