/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { images, background } from '../../../../.storybook/data';

import { Single, Double, Triple, MixedDouble, MixedTriple } from '../components';

const props = {
    images: images({ count: 20 }),
    background: background(),
};

export default {
    component: Single,
    title: 'Screens/GalleryScroll/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const ViewSingle = () => <Single {...props} />;

export const ViewDouble = () => <Double {...props} />;

export const ViewTriple = () => <Triple {...props} />;

export const ViewMixedDouble = () => <MixedDouble {...props} />;

export const ViewMixedTriple = () => <MixedTriple {...props} />;
