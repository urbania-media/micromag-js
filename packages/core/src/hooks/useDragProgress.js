import { useSpring } from '@react-spring/core';
import { useDrag } from '@use-gesture/react';
import { useCallback, useEffect, useRef, useState } from 'react';

function useDragProgress({
    progress: wantedProgress,
    onTap = null,
    disabled = false,
    dragDisabled = false,
    computeProgress = null,
    onProgress = null,
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
    const spring = useCallback(
        () => ({
            progress: wantedProgress,
            immediate: dragging || disabled,
            onResolve: () => {
                setDirection(0);
            },
            ...springParams,
        }),
        [wantedProgress, disabled],
    );
    const [{ progress }, api] = useSpring(spring);
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
            });
            if (onProgress !== null) {
                onProgress(newProgress, gestureState);
            }
        },
        [setDragging, disabled, onTap, computeProgress, dragging, onProgress],
    );

    const bind = useDrag(onDrag, dragOptions);

    useEffect(() => {
        if (!refDragging.current && wantedProgress !== refProgress.current) {
            setDirection(wantedProgress < refProgress.current ? -1 : 1);
            refProgress.current = wantedProgress;
            api.start({
                progress: wantedProgress,
                immediate: false,
                onResolve: () => {
                    setDirection(0);
                },
            });
        }
    }, [wantedProgress]);

    return {
        bind,
        dragging,
        progress,
        direction,
    };
}

export default useDragProgress;
