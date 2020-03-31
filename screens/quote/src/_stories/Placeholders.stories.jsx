import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Top, Center, Bottom, TopCentered, BottomCentered, Split } from '../components';

export default {
    component: Top,
    title: 'Screens/Quote/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderTop = () => <Top renderFormat="placeholder" />;

export const PlaceholderCenter = () => <Center renderFormat="placeholder" />;

export const PlaceholderBottom = () => <Bottom renderFormat="placeholder" />;

export const PlaceholderTopCentered = () => <TopCentered renderFormat="placeholder" />;

export const PlaceholderBottomCentered = () => <BottomCentered renderFormat="placeholder" />;

export const PlaceholderSplit = () => <Split renderFormat="placeholder" />;
