import { useState, useCallback, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';

import useSpringValue from './useSpringValue';

function useDragProgress ({
    progress: wantedProgress,
    onTap = null,
    disabled = false,
    dragDisabled = false,
    computeProgress = null,
    onProgress = null,
    springParams = undefined,
} = {}) {
    const [{ dragging, progress }, setDragState] = useState({
        dragging: false,
        progress: wantedProgress,
    });
    const onDragContent = useCallback(
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
            setDragState({
                dragging: active,
                progress: newProgress,
            });
            if (onProgress !== null) {
                onProgress(newProgress, gestureState);
            }
        },
        [setDragState, disabled, onTap, computeProgress, setDragState, onProgress],
    );

    const bind = useDrag(onDragContent, {
        filterTaps: true,
    });

    const springedProgress = useSpringValue(progress, dragging || disabled, springParams);

    useEffect(() => {
        if (wantedProgress !== progress && !dragging) {
            setDragState({
                dragging,
                progress: wantedProgress,
            });
        }
    }, [wantedProgress]);

    return {
        bind,
        dragging,
        progress: springedProgress,
    };
};

export default useDragProgress;
