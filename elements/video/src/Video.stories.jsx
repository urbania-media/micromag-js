/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { videoMedia } from '../../../.storybook/data';
import Video from './Video';

export default {
    component: Video,
    title: 'Elements/Video',
};

const props = { media: videoMedia(), autoPlay: true, loop: true };

export const Normal = () => <Video {...props} />;
