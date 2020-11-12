/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { video} from '../../../.storybook/data';
import Video from './Video';

export default {
    component: Video,
    title: 'Elements/Video',
};

const props = {...video(), autoPlay: true, loop: true };

export const Normal = () => <Video {...props} />;