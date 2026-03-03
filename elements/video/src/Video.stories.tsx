/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { gifVideoMedia, videoMedia } from '../../../.storybook/data';
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

const newMedia = videoMedia();
const tearsOfSteel = {
    ...newMedia,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    files: {
        ...newMedia.files,
        h264: {
            handle: 'h264',
            mime: 'video/mp4',
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        },
        hls: {
            handle: 'hls',
            mime: 'application/vnd.apple.mpegurl',
            url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
        },
    },
};
export const Hls = () => <Video media={tearsOfSteel} autoPlay loop muted />;
