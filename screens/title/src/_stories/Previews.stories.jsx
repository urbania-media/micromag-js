/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { title, subtitle, text, background } from '../../../../.storybook/data';

import {
    Split,
    SplitReverse,
    ThreeOneSplit,
    ThreeSplit,
    TwoOneSplit,
    Top,
    Center,
    Bottom,
} from '../components';

const props = {
    title: { body: title() },
    subtitle: { body: subtitle() },
    description: text(),
    background: background(),
};

export default {
    component: Split,
    title: 'Screens/Title/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewSplit = () => <Split {...props} renderFormat="preview" />;

export const PreviewSplitReverse = () => <SplitReverse {...props} renderFormat="preview" />;

export const PreviewThreeOneSplit = () => <ThreeOneSplit {...props} renderFormat="preview" />;

export const PreviewThreeSplit = () => <ThreeSplit {...props} renderFormat="preview" />;

export const PreviewTwoOneSplit = () => <TwoOneSplit {...props} renderFormat="preview" />;

export const PreviewTop = () => <Top {...props} renderFormat="preview" />;

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;

export const PreviewBottom = () => <Bottom {...props} renderFormat="preview" />;
