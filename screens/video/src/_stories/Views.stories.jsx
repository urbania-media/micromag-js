/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { withScreenSize } from '../../../../.storybook/decorators';
import { video, videoFile, background } from '../../../../.storybook/data';

import { Full, Center, Loop } from '../components';

const props = {
    video: videoFile(),
    background: background(),
};

export default {
    component: Full,
    title: 'Screens/Video/Views',
    decorators: [withKnobs, withScreenSize()],
};

export const VideoFull = () => <Full {...props} />;

export const VideoCenter = () => <Center {...props} />;

export const VideoCenterTY = () => <Center {...props} video={video()} />;

export const VideoLoop = () => <Loop {...props} />;
