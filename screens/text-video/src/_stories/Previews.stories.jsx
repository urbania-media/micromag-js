/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { text, video, background } from '../../../../.storybook/data';

import { Top, TopReverse, Center, CenterReverse, Bottom, BottomReverse } from '../components';

const props = {
    text: text(),
    video: video(),
    background: background(),
};

export default {
    component: Top,
    title: 'Screens/TextVideo/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewTop = () => <Top {...props} renderFormat="preview" />;

export const PreviewTopReverse = () => <TopReverse {...props} renderFormat="preview" />;

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;

export const PreviewCenterReverse = () => <CenterReverse {...props} renderFormat="preview" />;

export const PreviewBottom = () => <Bottom {...props} renderFormat="preview" />;

export const PreviewBottomReverse = () => <BottomReverse {...props} renderFormat="preview" />;
