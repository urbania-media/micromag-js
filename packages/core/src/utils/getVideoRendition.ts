import getMediaFilesAsArray from './getMediaFilesAsArray';

/**
 * The H.264 renderings of a video, as keys of `media.files`: `h264` (1080p) and `h264_720`
 * (short side at most 720, about half the bytes). They can be swapped for one another.
 */
export type VideoRendition = 'h264' | 'h264_720';

/** Value of the viewer setting `videoRendition`: `auto` applies the rule below */
export type VideoRenditionSetting = 'auto' | VideoRendition;

export const VIDEO_RENDITIONS: VideoRendition[] = ['h264', 'h264_720'];

/** Thresholds of the rule, in one place (see `getVideoRendition`) */
export const VIDEO_RENDITION_RULES = {
    /** `navigator.connection.effectiveType` values that take the 720p rendering */
    slowEffectiveTypes: ['slow-2g', '2g', '3g'],
    /** A frame up to this width in CSS px (phones) takes the 720p rendering, whatever the DPR */
    maxPhoneFrameWidth: 430,
    /** A frame up to this width in device pixels (width × DPR) is fully served by 720 pixels */
    maxLightFrameDeviceWidth: 800,
};

export interface VideoRenditionConnection {
    saveData?: boolean;
    effectiveType?: string;
}

export interface GetVideoRenditionOptions {
    /** The host setting: `h264` or `h264_720` force it, `auto` (default) applies the rule */
    setting?: VideoRenditionSetting | string | null;
    /** Width in CSS px of the frame the video fills (defaults to the window width) */
    width?: number | null;
    /** Defaults to `window.devicePixelRatio` */
    devicePixelRatio?: number | null;
    /** Defaults to `navigator.connection` (Chromium only) */
    connection?: VideoRenditionConnection | null;
}

function getBrowserConnection(): VideoRenditionConnection | null {
    if (typeof navigator === 'undefined') {
        return null;
    }
    const { connection = null } = navigator as Navigator & {
        connection?: VideoRenditionConnection;
    };
    return connection || null;
}

/**
 * The H.264 rendering a viewer plays, chosen once when it loads on the client:
 *
 * 1. setting `h264` or `h264_720` → that rendering;
 * 2. `saveData`, or a connection of `slow-2g`, `2g` or `3g` → `h264_720`;
 * 3. frame up to 430 CSS px wide (phones), whatever the DPR → `h264_720`;
 * 4. frame width × DPR up to 800 → `h264_720`;
 * 5. otherwise `h264`.
 *
 * Without a known width (ex.: on the server) the rule stops at step 2 and answers `h264`.
 * Hosts that preload the first video should use the same answer, or force it with the setting.
 */
export default function getVideoRendition(
    options: GetVideoRenditionOptions | null = null,
): VideoRendition {
    const {
        setting = null,
        width = null,
        devicePixelRatio = null,
        connection = getBrowserConnection(),
    } = options || {};

    if (setting === 'h264' || setting === 'h264_720') {
        return setting;
    }

    const { saveData = false, effectiveType = null } = connection || {};
    if (
        saveData === true ||
        (effectiveType !== null &&
            VIDEO_RENDITION_RULES.slowEffectiveTypes.indexOf(effectiveType) !== -1)
    ) {
        return 'h264_720';
    }

    const hasWindow = typeof window !== 'undefined';
    const frameWidth = width !== null && width > 0 ? width : (hasWindow && window.innerWidth) || 0;
    if (frameWidth <= 0) {
        return 'h264';
    }
    if (frameWidth <= VIDEO_RENDITION_RULES.maxPhoneFrameWidth) {
        return 'h264_720';
    }
    const pixelRatio = devicePixelRatio || (hasWindow && window.devicePixelRatio) || 1;
    return frameWidth * pixelRatio <= VIDEO_RENDITION_RULES.maxLightFrameDeviceWidth
        ? 'h264_720'
        : 'h264';
}

interface VideoRenditionFile {
    handle?: string;
    id?: string;
    url?: string | null;
    [key: string]: unknown;
}

/**
 * The file of a rendering among the files of a video (`media.files`, as an object or an array).
 * A missing `h264_720` falls back to `h264` and the reverse; null when the video has neither,
 * the viewer then falls back to the other files as before.
 */
export function getVideoRenditionFile<T extends VideoRenditionFile>(
    files: Record<string, Omit<T, 'handle'>> | T[] | null,
    rendition: VideoRendition = 'h264',
): T | null {
    const filesArray: T[] = getMediaFilesAsArray(files) || [];
    const findRendition = (handle: VideoRendition) =>
        filesArray.find((file) => (file.handle || file.id) === handle) || null;
    const fallback = rendition === 'h264_720' ? 'h264' : 'h264_720';
    return findRendition(rendition) || findRendition(fallback);
}
