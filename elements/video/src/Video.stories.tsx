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
