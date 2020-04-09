/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { images, background } from '../../../../.storybook/data';

import { Single, Double, Triple, MixedDouble, MixedTriple } from '../components';

const props = {
    background: background(),
    images: images({ count: 10 }),
};

export default {
    component: Single,
    title: 'Screens/GalleryScroll/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewSingle = () => <Single {...props} renderFormat="preview" />;

export const PreviewDouble = () => <Double {...props} renderFormat="preview" />;

export const PreviewTriple = () => <Triple {...props} renderFormat="preview" />;

export const PreviewMixedDouble = () => <MixedDouble {...props} renderFormat="preview" />;

export const PreviewMixedTriple = () => <MixedTriple {...props} renderFormat="preview" />;
