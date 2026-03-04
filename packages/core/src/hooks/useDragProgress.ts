import { useSpring, useSpringRef } from '@react-spring/core';
import { useGesture } from '@use-gesture/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function useDragProgress({
    progress: wantedProgress,
    onTap = null,
    disabled = false,
    dragDisabled = false,
    computeProgress = null,
    onProgress = null,
    onPointerDown = null,
    onScroll = null,
    springParams = undefined,
    dragOptions = {
        filterTaps: true,
    },
} = {}) {
    const refDragging = useRef(false);
    const refProgress = useRef(wantedProgress);
    const wantedProgressRef = useRef(wantedProgress);
    if (wantedProgress !== wantedProgressRef.current) {
        wantedProgressRef.current = wantedProgress;
    }
    const [dragging, setDragging] = useState(false);
    const [direction, setDirection] = useState(0);

    // In react-spring v10, useSpring(fn) without deps stores the initial update and
    // re-applies it via ctrl.start() in a layout effect on EVERY render, resetting the
    // spring to its initial value. To prevent this, we pass a dummy SpringRef as `ref`
    // in the props — when ctrl.ref is set, the layout effect queues updates instead of
    // starting them, so our imperative api.start() calls are not overridden.
    const imperativeRef = useSpringRef();
    const [{ progress }, api] = useSpring(() => ({
        ref: imperativeRef,
        from: { progress: wantedProgress },
        ...springParams,
    }));
    const onDrag = useCallback(
        (gestureState) => {
            const { active, tap } = gestureState;

            if (disabled) {
                refDragging.current = false;
                return;
            }

            if (tap) {
                refDragging.current = false;
                if (onTap !== null) onTap(gestureState);
                return;
            }

            if (dragDisabled) {
                refDragging.current = false;
                return;
            }

            const newProgress = computeProgress(gestureState);
            refDragging.current = active;
            setDirection(newProgress < wantedProgressRef.current ? -1 : 1);
            refProgress.current = newProgress;
            if (active !== dragging) {
                setDragging(active);
            }
            api.start({
                progress: newProgress,
                immediate: active,
                onResolve: !active
                    ? () => {
                          setDirection(0);
                      }
                    : () => {},
                ...springParams,
            });
            if (onProgress !== null) {
                onProgress(newProgress, gestureState);
            }
        },
        [setDragging, disabled, onTap, computeProgress, dragging, onProgress],
    );

    const bind = useGesture(
        {
            onDrag,
            onPointerDown: onPointerDown !== null ? onPointerDown : () => {},
            onScroll: onScroll !== null ? onScroll : () => {},
        },
        {
            drag: dragOptions,
        },
    );

    useEffect(() => {
        if (!refDragging.current && wantedProgress !== refProgress.current) {
            setDirection(wantedProgress < refProgress.current ? -1 : 1);
            refProgress.current = wantedProgress;
            api.start({
                progress: wantedProgress,
                immediate: disabled,
                onResolve: () => {
                    setDirection(0);
                },
                ...springParams,
            });
        }
    }, [wantedProgress, disabled]);

    const transitioning = useMemo(
        () => wantedProgress !== progress.get() || progress.isAnimating || dragging,
        [wantedProgress, progress.isAnimating, dragging],
    );

    return {
        transitioning,
        bind,
        dragging,
        progress,
        direction,
    };
}

export default useDragProgress;
