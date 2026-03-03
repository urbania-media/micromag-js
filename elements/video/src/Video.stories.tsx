/* eslint-disable react/jsx-props-no-spreading */
import { gifVideoMedia, videoMedia } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Video from './Video';

const meta = preview.meta({
    component: Video,
    title: 'Elements/Video',
});

export const Normal = meta.story(() => {
    return <Video media={videoMedia()} autoPlay loop />;
});

export const Paused = meta.story(() => {
    return <Video media={videoMedia()} loop shouldLoad paused />;
});

export const Gif = meta.story(() => {
    return (
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
});

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

export const Hls = meta.story(() => {
    return <Video media={tearsOfSteel} autoPlay loop muted />;
});
