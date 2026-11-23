import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { VideoRenditionProvider } from '@micromag/core/contexts';

import Video from '../Video';

const media = {
    type: 'video' as const,
    url: 'original.mp4',
    files: {
        original: { handle: 'original', mime: 'video/mp4', url: 'original.mp4', size: 9000 },
        h264: { handle: 'h264', mime: 'video/mp4', url: 'video-h264.mp4', size: 2000 },
        h264_720: { handle: 'h264_720', mime: 'video/mp4', url: 'video-h264_720.mp4', size: 1000 },
    },
};

const getSources = (html: string) =>
    [...html.matchAll(/<source src="([^"#]+)/g)].map(([, url]) => url);

describe('Video on the server', () => {
    it('renders the h264 source outside of a viewer, as before', () => {
        const html = renderToString(<Video media={media} />);
        expect(getSources(html)).toEqual(['video-h264.mp4']);
    });

    it('renders the forced rendering', () => {
        const html = renderToString(
            <VideoRenditionProvider rendition="h264_720">
                <Video media={media} />
            </VideoRenditionProvider>,
        );
        expect(getSources(html)).toEqual(['video-h264_720.mp4']);
    });

    it('renders no source and no src while the viewer has not chosen the rendering', () => {
        const html = renderToString(
            <VideoRenditionProvider rendition={null}>
                <Video media={media} />
            </VideoRenditionProvider>,
        );
        expect(html).toContain('<video');
        expect(getSources(html)).toEqual([]);
        expect(html).not.toMatch(/<video[^>]* src=/);
    });
});
