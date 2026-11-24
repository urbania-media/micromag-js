/**
 * Longest wait for the measured frame before the viewer chooses the video rendering from the
 * window width instead. The frame is measured on the first layout after mount (ResizeObserver),
 * so this only applies to a viewer that never gets a size (ex.: a hidden container).
 */
export const VIDEO_RENDITION_FRAME_TIMEOUT = 500;

/**
 * When the viewer commits its choice of video rendering in `auto`: at once when the frame is
 * measured, after `VIDEO_RENDITION_FRAME_TIMEOUT` when the screens show before it is (setting
 * `readyWithoutSize`), never before the screens show. Null: not yet.
 */
export default function getVideoRenditionCommitDelay({
    ready,
    hasSize,
}: {
    ready: boolean;
    hasSize: boolean;
}): number | null {
    if (hasSize) {
        return 0;
    }
    return ready ? VIDEO_RENDITION_FRAME_TIMEOUT : null;
}
