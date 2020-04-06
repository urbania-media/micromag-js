/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPlaceholderSize } from '../../../../.storybook/decorators';

import { Single, Double, Triple, MixedDouble, MixedTriple } from '../components';

const props = {};

export default {
    component: Single,
    title: 'Screens/GalleryScroll/Placeholders',
    decorators: [withPlaceholderSize()],
};

export const PlaceholderSingle = () => <Single {...props} renderFormat="placeholder" />;

export const PlaceholderDouble = () => <Double {...props} renderFormat="placeholder" />;

export const PlaceholderTriple = () => <Triple {...props} renderFormat="placeholder" />;

export const PlaceholderMixedDouble = () => <MixedDouble {...props} renderFormat="placeholder" />;

export const PlaceholderMixedTriple = () => <MixedTriple {...props} renderFormat="placeholder" />;
