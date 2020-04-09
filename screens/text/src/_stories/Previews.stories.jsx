/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { text, background } from '../../../../.storybook/data';

import { Top, Center, Bottom } from '../components';

const props = {
    background: background(),
    text: text(),
};

export default {
    component: Top,
    title: 'Screens/Text/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTop = () => <Top {...props} renderFormat="preview" />;

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;

export const PreviewBottom = () => <Bottom {...props} renderFormat="preview" />;
