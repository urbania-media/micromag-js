/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { videoMedia, gifVideoMedia } from '../../../.storybook/data';
import Video from './Video';

export default {
    component: Video,
    title: 'Elements/Video',
};

export const Normal = () => <Video media={videoMedia()} autoPlay loop />;

export const Paused = () => <Video media={videoMedia()} loop shouldLoad paused />;

export const Gif = () => (
    <div>
        <h4>Gif without converted videos</h4>
        <Video
            media={gifVideoMedia({ withoutFiles: true })}
            width={500}
            height={281}
            autoPlay
            loop
        />
        <hr />
        <h4>Gif with converted videos</h4>
        <Video media={gifVideoMedia()} width={500} height={281} autoPlay loop />
    </div>
);
