/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withPreviewSize } from '../../../../.storybook/decorators';
import { background, videoFile } from '../../../../.storybook/data';

import { Full, Center, Loop } from '../components';

const props = {
    video: videoFile(),
    background: background(),
};

export default {
    component: Full,
    title: 'Screens/Video/Previews',
    decorators: [withPreviewSize()],
};

export const PreviewFull = () => <Full {...props} renderFormat="preview" />;

export const PreviewCenter = () => <Center {...props} renderFormat="preview" />;

export const PreviewLoop = () => <Loop {...props} renderFormat="preview" />;
