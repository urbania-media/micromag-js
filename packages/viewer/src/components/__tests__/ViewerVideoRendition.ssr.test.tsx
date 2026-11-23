import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import type { ScreenDefinition } from '@micromag/core';
import { PlaybackProvider, ScreensProvider, SettingsProvider } from '@micromag/core/contexts';
import { IntlProvider } from '@micromag/intl';
import videoScreen from '@micromag/screen-video';

import Viewer from '../Viewer';

const video = {
    type: 'video',
    url: 'original.mp4',
    files: {
        h264: { handle: 'h264', mime: 'video/mp4', url: 'video-h264.mp4', size: 2000 },
        h264_720: { handle: 'h264_720', mime: 'video/mp4', url: 'video-h264_720.mp4', size: 1000 },
    },
};

const story = {
    id: '1',
    components: [{ id: 'screen-1', type: 'video', video: { media: video, autoPlay: true } }],
};

const render = (settings: Record<string, unknown> | null = null) =>
    renderToString(
        <SettingsProvider settings={settings}>
            <IntlProvider locale="en">
                <ScreensProvider screens={[videoScreen as unknown as ScreenDefinition]}>
                    <PlaybackProvider>
                        <Viewer
                            story={story}
                            storyIsParsed
                            width={390}
                            height={844}
                            screen="screen-1"
                        />
                    </PlaybackProvider>
                </ScreensProvider>
            </IntlProvider>
        </SettingsProvider>,
    );

const getSources = (html: string) =>
    [...html.matchAll(/<source src="([^"#]+)/g)].map(([, url]) => url);

describe('Viewer on the server', () => {
    it('renders the video without source in auto: the client chooses the rendering', () => {
        const html = render();
        expect(html).toContain('<video');
        expect(getSources(html)).toEqual([]);
    });

    it('renders the rendering forced by the host', () => {
        expect(getSources(render({ videoRendition: 'h264_720' }))).toEqual(['video-h264_720.mp4']);
        expect(getSources(render({ videoRendition: 'h264' }))).toEqual(['video-h264.mp4']);
    });
});
