import React, { use } from 'react';

import type { VideoRendition } from '../utils/getVideoRendition';

/**
 * The H.264 rendering played by every video of a viewer, so the preloaded next video and the
 * playing one use the same file. `null` while the viewer has not chosen it yet: videos then
 * render without source, so nothing is downloaded twice. Outside a viewer (editor, previews), `h264`.
 */
export const VideoRenditionContext = React.createContext<VideoRendition | null>('h264');

export const useVideoRendition = () => use(VideoRenditionContext);

interface VideoRenditionProviderProps {
    children: React.ReactNode;
    rendition?: VideoRendition | null;
}

export function VideoRenditionProvider({
    rendition = null,
    children,
}: VideoRenditionProviderProps) {
    return <VideoRenditionContext value={rendition}>{children}</VideoRenditionContext>;
}
