import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';

import getMediaFilesAsArray from './getMediaFilesAsArray';

export interface VideoPoster {
    url: string;
    metadata: { width?: number; height?: number };
}

// Frames extracted from the video by the media server, at full size: `thumbnails.0`… when several
// frames are extracted, `thumbnails` alone on older medias
const POSTER_HANDLES = ['thumbnails.0', 'thumbnails'];

/**
 * Image to show in place of a video until its first frame is painted.
 *
 * In order: an explicit thumbnail (an image object, or the handle of one of the media's files),
 * the first full size frame of the media (`files['thumbnails.0']`, or `files.thumbnails` on older
 * medias), then `thumbnail_url` (a small square thumbnail, present on every media).
 */
function getVideoPoster(media, thumbnail: unknown = null): VideoPoster | null {
    if (isObject(thumbnail)) {
        const { url = null } = thumbnail as { url?: string | null };
        if (isString(url) && url.length > 0) {
            return thumbnail as VideoPoster;
        }
    }
    const {
        thumbnail_url: thumbnailUrl = null,
        files = null,
        metadata = null,
    } = (media || {}) as {
        thumbnail_url?: string | null;
        files?: unknown;
        metadata?: { width?: number; height?: number } | null;
    };
    const { width, height } = metadata || {};
    const filesArray = (getMediaFilesAsArray(files) || []) as {
        handle?: string;
        url?: string | null;
    }[];
    const handles = isString(thumbnail) ? [thumbnail, ...POSTER_HANDLES] : POSTER_HANDLES;
    const file =
        handles
            .map((handle) =>
                filesArray.find(
                    ({ handle: fileHandle = null, url = null }) =>
                        fileHandle === handle && isString(url) && url.length > 0,
                ),
            )
            .find((it) => typeof it !== 'undefined') || null;
    const url = file !== null ? file.url : thumbnailUrl;
    return isString(url) && url.length > 0 ? { url, metadata: { width, height } } : null;
}

export default getVideoPoster;
