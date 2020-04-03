/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { background } from '../../../../.storybook/data';

import { Top, Center, Bottom, TopCentered, BottomCentered, Split } from '../components';

const props = {
    background: background(),
};

export default {
    component: Top,
    title: 'Screens/Quote/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTop = () => <Top {...props} renderFormat="preview" />;

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;

export const PreviewBottom = () => <Bottom {...props} renderFormat="preview" />;

export const PreviewTopCentered = () => <TopCentered {...props} renderFormat="preview" />;

export const PreviewBottomCentered = () => <BottomCentered {...props} renderFormat="preview" />;

export const PreviewSplit = () => <Split {...props} renderFormat="preview" />;
