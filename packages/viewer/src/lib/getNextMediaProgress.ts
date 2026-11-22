/**
 * Progress of a playing media at the next animation frame, as computed by `useMediaProgress` in
 * `@micromag/core`: read from the media at the start, then advanced by the elapsed time, so the
 * bar moves smoothly between the coarse `currentTime` updates of some browsers.
 */
export default function getNextMediaProgress({
    progress,
    elapsed,
    duration,
    currentTime,
    mediaDuration,
}: {
    /** Progress at the previous frame (0 to 1) */
    progress: number;
    /** Seconds since the previous frame */
    elapsed: number;
    /** Duration of the media, in seconds */
    duration: number;
    /** `currentTime` of the media element */
    currentTime: number;
    /** `duration` of the media element */
    mediaDuration: number;
}): number {
    return progress < 0.1 ? currentTime / mediaDuration : progress + elapsed / duration;
}
