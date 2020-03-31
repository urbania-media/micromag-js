import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';

import { Top, Center, Bottom, TopCentered, BottomCentered, Split } from '../components';

export default {
    component: Top,
    title: 'Screens/Quote/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTop = () => <Top renderFormat="preview" />;

export const PreviewCenter = () => <Center renderFormat="preview" />;

export const PreviewBottom = () => <Bottom renderFormat="preview" />;

export const PreviewTopCentered = () => <TopCentered renderFormat="preview" />;

export const PreviewBottomCentered = () => <BottomCentered renderFormat="preview" />;

export const PreviewSplit = () => <Split renderFormat="preview" />;
