import createDebug from 'debug';
import { RefObject, useEffect, useRef } from 'react';

import type { MediaElement, ScreenComponent } from '@micromag/core';

import TransitionMeasure, { type ViewerTransitionMetric } from '../lib/TransitionMeasure';

// Log the metrics with localStorage.debug = 'micromag:viewer:transition'
const debug = createDebug('micromag:viewer:transition');

const formatMs = (value: number | null) => (value !== null ? `${Math.round(value)} ms` : 'n/a');

const logMetric = (metric: ViewerTransitionMetric) => {
    const { fromIndex, toIndex, screenType, duration, media, playingDelay, frames, longTasks } =
        metric;
    debug(
        'Screen %d → %d (%s): animation %s, %s, %d/%d frames dropped, %d long tasks (%s)%s',
        fromIndex,
        toIndex,
        screenType,
        formatMs(duration),
        media !== null
            ? `${media.type} playing ${playingDelay !== null ? `${playingDelay >= 0 ? '+' : ''}${formatMs(playingDelay)} after the end` : 'not started'}, frame at start: ${media.frameAtStart ? 'yes' : 'no'}, poster: ${media.posterAtStart ? 'yes' : 'no'}`
            : 'no media',
        frames.dropped,
        frames.count + frames.dropped,
        longTasks.count,
        formatMs(longTasks.totalDuration),
        `${metric.interrupted ? ', interrupted' : ''}${metric.timedOut ? ', timed out' : ''}${metric.pageHidden ? ', page hidden' : ''}`,
    );
    debug('%O', metric);
};

interface UseTransitionMetricsOptions {
    screens: ScreenComponent[];
    screenIndex: number;
    progress: { get: () => number; isAnimating: boolean };
    mediasRef: RefObject<MediaElement[]>;
    onMetric?: ((metric: ViewerTransitionMetric) => void) | null;
    disabled?: boolean;
}

/**
 * Measures each screen change, when a callback is given or when the debug namespace
 * `micromag:viewer:transition` is enabled. Otherwise it does nothing.
 */
function useTransitionMetrics({
    screens,
    screenIndex,
    progress,
    mediasRef,
    onMetric = null,
    disabled = false,
}: UseTransitionMetricsOptions) {
    const enabled = !disabled && (onMetric !== null || debug.enabled);
    const lastIndexRef = useRef(screenIndex);
    const measureRef = useRef<TransitionMeasure | null>(null);
    const onMetricRef = useRef(onMetric);

    useEffect(() => {
        onMetricRef.current = onMetric;
    }, [onMetric]);

    useEffect(() => {
        const fromIndex = lastIndexRef.current;
        lastIndexRef.current = screenIndex;
        if (!enabled || fromIndex === screenIndex) {
            return;
        }
        if (measureRef.current !== null) {
            measureRef.current.interrupt();
        }
        const { id: screenId = null, type: screenType = null } = screens[screenIndex] || {};
        measureRef.current = new TransitionMeasure({
            fromIndex,
            toIndex: screenIndex,
            screenId: screenId !== null ? `${screenId}` : null,
            screenType,
            progress,
            getMedia: () => mediasRef.current?.[screenIndex] || null,
            onComplete: (metric) => {
                if (debug.enabled) {
                    logMetric(metric);
                }
                if (onMetricRef.current !== null) {
                    onMetricRef.current(metric);
                }
            },
        });
    }, [enabled, screenIndex, screens, progress, mediasRef]);

    useEffect(
        () => () => {
            if (measureRef.current !== null) {
                measureRef.current.dispose();
                measureRef.current = null;
            }
        },
        [],
    );
}

export default useTransitionMetrics;
