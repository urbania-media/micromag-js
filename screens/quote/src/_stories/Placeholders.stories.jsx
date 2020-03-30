/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import {
    QuoteTop,
    QuoteCenter,
    QuoteBottom,
    QuoteTopCentered,
    QuoteBottomCentered,
} from '../components';

export default {
    component: QuoteTop,
    title: 'Screens/Quote/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderTop = () => <QuoteTop isPlaceholder />;

export const PlaceholderCenter = () => <QuoteCenter isPlaceholder />;

export const PlaceholderBottom = () => <QuoteBottom isPlaceholder />;

export const PlaceholderTopCentered = () => <QuoteTopCentered isPlaceholder />;

export const PlaceholderBottomCentered = () => <QuoteBottomCentered isPlaceholder />;
