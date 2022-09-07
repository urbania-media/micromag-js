import { useSpring } from '@react-spring/core';
import { useDrag } from '@use-gesture/react';
import { useEffect, useState, useCallback, useRef } from 'react';

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
        preventDefault: true,
    },
} = {}) {
    const refDragging = useRef(false);
    const refProgress = useRef(wantedProgress);
    const [dragging, setDragging] = useState(false);
    const spring = useCallback( () => ({
        progress: wantedProgress,
        immediate: dragging || disabled,
        ...springParams,
    }), []);
    const [{ progress }, api] = useSpring(spring);
    const onDrag = useCallback(
        (gestureState) => {
            if (disabled) {
                return;
            }
            const { active, tap } = gestureState;

            if (tap) {
                if (onTap !== null) onTap(gestureState);
                return;
            }

            if (dragDisabled) {
                return;
            }

            const newProgress = computeProgress(gestureState);
            refDragging.current = active;
            refProgress.current = newProgress;
            if (active !== dragging) {
                setDragging(active);
            }
            api.start({
                progress: newProgress,
                immediate: active,
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
            refProgress.current = wantedProgress;
            api.start({
                progress: wantedProgress,
                immediate: false,
            });
        }
    }, [wantedProgress]);

    return {
        bind,
        dragging,
        progress,
    };
}

export default useDragProgress;
