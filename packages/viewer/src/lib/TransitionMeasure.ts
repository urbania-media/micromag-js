import type { MediaElement } from '@micromag/core';

export interface ViewerTransitionMediaMetric {
    /** Tag of the media element of the next screen */
    type: 'video' | 'audio' | 'other';
    src: string | null;
    /** The element was in the DOM when the transition started */
    mountedAtStart: boolean;
    readyStateAtStart: number | null;
    /** A frame of the video could be shown when the transition started (readyState >= 2) */
    frameAtStart: boolean;
    /** The video had a poster when the transition started */
    posterAtStart: boolean;
    /** The media was already playing when the transition started */
    playingAtStart: boolean;
    readyStateAtEnd: number | null;
}

export interface ViewerTransitionMetric {
    fromIndex: number;
    toIndex: number;
    screenId: string | null;
    screenType: string | null;
    /** performance.now() when the viewer rendered the new screen index */
    startTime: number;
    /** performance.now() when the transition animation settled on the new screen */
    endTime: number | null;
    duration: number | null;
    /** The media of the next screen, null when it has none */
    media: ViewerTransitionMediaMetric | null;
    /** performance.now() of the first `playing` event of the next screen's media */
    playingTime: number | null;
    /** playingTime - endTime: negative when the media started during the animation */
    playingDelay: number | null;
    /** Animation frames during the transition, from requestAnimationFrame */
    frames: {
        count: number;
        /** Estimated number of frames missed (gaps longer than one frame interval) */
        dropped: number;
        /** Longest gap between two frames, in ms */
        maxGap: number;
        /** Frame interval of the display, estimated from the median gap */
        interval: number;
    };
    /** Long tasks or long animation frames overlapping the transition */
    longTasks: {
        type: 'long-animation-frame' | 'longtask' | null;
        count: number;
        totalDuration: number;
        maxDuration: number;
        /** Sum of blockingDuration (long-animation-frame only) */
        blockingDuration: number | null;
    };
    /** Another screen change started before this one was complete */
    interrupted: boolean;
    /**
     * The animation didn't settle within maxDuration: duration is not reliable (ex.: the page was
     * hidden and stopped requestAnimationFrame)
     */
    timedOut: boolean;
    /** The page was hidden at some point during the measure: timings are not reliable */
    pageHidden: boolean;
}

interface ProgressValue {
    get: () => number;
    isAnimating: boolean;
}

interface TransitionMeasureOptions {
    fromIndex: number;
    toIndex: number;
    screenId?: string | null;
    screenType?: string | null;
    progress: ProgressValue;
    getMedia: () => MediaElement | null;
    onComplete: (metric: ViewerTransitionMetric) => void;
    /** How long to wait for `playing` after the end of the animation */
    playingTimeout?: number;
    /** Stop waiting for the animation to settle after this delay */
    maxDuration?: number;
}

const HAVE_CURRENT_DATA = 2;
const HAVE_FUTURE_DATA = 3;

const getLongTaskType = (): 'long-animation-frame' | 'longtask' | null => {
    if (typeof PerformanceObserver === 'undefined') {
        return null;
    }
    const { supportedEntryTypes = [] } = PerformanceObserver;
    if (supportedEntryTypes.includes('long-animation-frame')) {
        return 'long-animation-frame';
    }
    if (supportedEntryTypes.includes('longtask')) {
        return 'longtask';
    }
    return null;
};

const getMediaType = (media: MediaElement): ViewerTransitionMediaMetric['type'] => {
    if (media.tagName === 'VIDEO') {
        return 'video';
    }
    return media.tagName === 'AUDIO' ? 'audio' : 'other';
};

const getMediaIsPlaying = (media: MediaElement) =>
    !media.paused && !media.ended && media.readyState >= HAVE_FUTURE_DATA;

/**
 * Frame count, dropped frames and longest gap from the gaps between animation frames. The frame
 * interval is the median gap: the shortest one can be a near-duplicate frame of a few ms, which
 * made every normal frame count as several dropped ones.
 */
export function getFrameStats(gaps: number[]): ViewerTransitionMetric['frames'] | null {
    if (gaps.length === 0) {
        return null;
    }
    const sorted = [...gaps].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const interval = Math.min(Math.max(median, 1000 / 240), 1000 / 30);
    return {
        count: gaps.length + 1,
        dropped: gaps.reduce(
            (total, gap) => total + Math.max(0, Math.round(gap / interval) - 1),
            0,
        ),
        maxGap: sorted[sorted.length - 1],
        interval,
    };
}

/**
 * Measures one screen change of the viewer: the animation (frames and long tasks), the state of
 * the next screen's media when it starts, and the delay between its end and the `playing` event of
 * that media. It only observes: requestAnimationFrame, a PerformanceObserver and a `playing`
 * listener, all removed once the metric is complete.
 */
class TransitionMeasure {
    options: TransitionMeasureOptions;

    metric: ViewerTransitionMetric;

    media: MediaElement | null = null;

    frameGaps: number[] = [];

    lastFrameTime: number | null = null;

    rafId: number | null = null;

    timeoutId: ReturnType<typeof setTimeout> | null = null;

    observer: PerformanceObserver | null = null;

    entries: PerformanceEntry[] = [];

    completed = false;

    constructor(options: TransitionMeasureOptions) {
        const {
            fromIndex,
            toIndex,
            screenId = null,
            screenType = null,
            maxDuration = 5000,
        } = options;
        this.options = options;
        const longTaskType = getLongTaskType();
        this.metric = {
            fromIndex,
            toIndex,
            screenId,
            screenType,
            startTime: performance.now(),
            endTime: null,
            duration: null,
            media: null,
            playingTime: null,
            playingDelay: null,
            frames: { count: 0, dropped: 0, maxGap: 0, interval: 0 },
            longTasks: {
                type: longTaskType,
                count: 0,
                totalDuration: 0,
                maxDuration: 0,
                blockingDuration: longTaskType === 'long-animation-frame' ? 0 : null,
            },
            interrupted: false,
            timedOut: false,
            pageHidden: TransitionMeasure.pageIsHidden(),
        };

        if (longTaskType !== null) {
            try {
                this.observer = new PerformanceObserver((list) => {
                    this.entries.push(...list.getEntries());
                });
                this.observer.observe({ type: longTaskType });
            } catch {
                this.observer = null;
            }
        }

        const media = options.getMedia();
        if (media !== null) {
            const { readyState } = media;
            const playing = getMediaIsPlaying(media);
            this.metric.media = {
                type: getMediaType(media),
                src: media.currentSrc || media.getAttribute('src') || null,
                mountedAtStart: true,
                readyStateAtStart: readyState,
                frameAtStart: readyState >= HAVE_CURRENT_DATA,
                posterAtStart:
                    media.tagName === 'VIDEO' && (media.getAttribute('poster') || '') !== '',
                playingAtStart: playing,
                readyStateAtEnd: null,
            };
            if (playing) {
                this.metric.playingTime = this.metric.startTime;
            }
            this.listenMedia(media);
        }

        this.rafId = requestAnimationFrame(this.onFrame);
        this.timeoutId = setTimeout(() => {
            this.metric.timedOut = true;
            this.end();
        }, maxDuration);
    }

    static pageIsHidden() {
        return typeof document !== 'undefined' && document.visibilityState === 'hidden';
    }

    listenMedia(media: MediaElement) {
        this.media = media;
        media.addEventListener('playing', this.onPlaying);
    }

    onPlaying = () => {
        if (this.metric.playingTime === null) {
            this.metric.playingTime = performance.now();
        }
        if (this.metric.endTime !== null) {
            this.complete();
        }
    };

    onFrame = (time: number) => {
        if (this.lastFrameTime !== null) {
            this.frameGaps.push(time - this.lastFrameTime);
        }
        this.lastFrameTime = time;
        const { progress, toIndex } = this.options;
        const settled = !progress.isAnimating && Math.abs(progress.get() - toIndex) < 0.001;
        if (settled) {
            this.end();
            return;
        }
        this.rafId = requestAnimationFrame(this.onFrame);
    };

    end() {
        if (this.metric.endTime !== null || this.completed) {
            return;
        }
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        const { metric } = this;
        metric.endTime = performance.now();
        metric.pageHidden = metric.pageHidden || TransitionMeasure.pageIsHidden();
        metric.duration = metric.endTime - metric.startTime;

        // The media can be mounted during the transition
        if (this.media === null) {
            const media = this.options.getMedia();
            if (media !== null) {
                metric.media = {
                    type: getMediaType(media),
                    src: media.currentSrc || media.getAttribute('src') || null,
                    mountedAtStart: false,
                    readyStateAtStart: null,
                    frameAtStart: false,
                    posterAtStart: false,
                    playingAtStart: false,
                    readyStateAtEnd: null,
                };
                if (getMediaIsPlaying(media)) {
                    metric.playingTime = metric.endTime;
                }
                this.listenMedia(media);
            }
        }
        if (this.media !== null && metric.media !== null) {
            metric.media.readyStateAtEnd = this.media.readyState;
        }

        if (this.media === null || metric.playingTime !== null) {
            this.complete();
            return;
        }
        const { playingTimeout = 5000 } = this.options;
        this.timeoutId = setTimeout(() => this.complete(), playingTimeout);
    }

    interrupt() {
        if (this.completed) {
            return;
        }
        this.metric.interrupted = true;
        if (this.metric.endTime === null) {
            this.end();
        }
        this.complete();
    }

    complete() {
        if (this.completed) {
            return;
        }
        this.completed = true;
        const { metric } = this;
        metric.pageHidden = metric.pageHidden || TransitionMeasure.pageIsHidden();
        if (metric.playingTime !== null && metric.endTime !== null) {
            metric.playingDelay = metric.playingTime - metric.endTime;
        }

        // Frames
        const frames = getFrameStats(this.frameGaps);
        if (frames !== null) {
            metric.frames = frames;
        }

        // Long tasks: the entries arrive after the frame, so they are read at the end
        if (this.observer !== null) {
            this.entries.push(...this.observer.takeRecords());
            this.observer.disconnect();
            this.observer = null;
            const { startTime, endTime } = metric;
            const end = endTime !== null ? endTime : performance.now();
            const entries = this.entries.filter(
                (entry) => entry.startTime < end && entry.startTime + entry.duration > startTime,
            );
            metric.longTasks.count = entries.length;
            metric.longTasks.totalDuration = entries.reduce((sum, it) => sum + it.duration, 0);
            metric.longTasks.maxDuration = entries.reduce(
                (max, it) => Math.max(max, it.duration),
                0,
            );
            if (metric.longTasks.blockingDuration !== null) {
                metric.longTasks.blockingDuration = entries.reduce(
                    (sum, it) =>
                        sum +
                        ((it as PerformanceEntry & { blockingDuration?: number })
                            .blockingDuration || 0),
                    0,
                );
            }
        }

        this.dispose();
        this.options.onComplete(metric);
    }

    dispose() {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.observer !== null) {
            this.observer.disconnect();
            this.observer = null;
        }
        if (this.media !== null) {
            this.media.removeEventListener('playing', this.onPlaying);
            this.media = null;
        }
    }
}

export default TransitionMeasure;
