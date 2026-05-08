import { MediaElement } from '../types';

export function getMediaCurrentTime(media: MediaElement | null, tsOffset = 0): number {
    return media !== null ? Math.max((media?.currentTime || 0) - tsOffset, 0) : 0;
}

export function getMediaDuration(media: MediaElement | null, tsOffset = 0): number {
    return media !== null ? Math.max((media?.duration || 0) - tsOffset, 0) : 0;
}

export function getMediaTimestampOffset(
    media: MediaElement | null,
    attributeName = 'data-ts-offset',
): number {
    return media !== null && media.hasAttribute(attributeName)
        ? parseFloat(media.getAttribute(attributeName))
        : 0;
}

export function getMediaIsMuted(media: MediaElement | null): boolean {
    return media !== null && (media.muted || media.volume === 0);
}

export function getMediaIsPlaying(media: MediaElement | null): boolean {
    return (
        media !== null &&
        !!(media.currentTime > 0 && !media.paused && !media.ended && media.readyState > 2)
    );
}

export function getMediaIsBuffering(media: MediaElement | null): boolean {
    return (
        media !== null &&
        (media.networkState === media.NETWORK_LOADING || media.readyState < media.HAVE_FUTURE_DATA)
    );
}

export function getMediaIsReady(media: MediaElement | null): boolean {
    return media !== null && media.readyState >= 0;
}

export function getMediaSrc(media: MediaElement | null): string | null {
    return media !== null ? media.currentSrc || media.src : null;
}

export function getMediaHasAudio(media: MediaElement | null): boolean {
    return (
        media !== null &&
        (media.tagName.toLowerCase() === 'audio' || media.dataset.hasAudio === 'true')
    );
}

export function getMediaFilename(src: string | null): string | null {
    return src !== null ? src.split('/')[src.split('/').length - 1].split('#')[0] || null : null;
}
