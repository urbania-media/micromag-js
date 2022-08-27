import { useDrag } from '@use-gesture/react';
import { useCallback, useEffect, useState } from 'react';

const useVerticalDrag = ({
    value = 0,
    onSwipeUp = null,
    onSwipeDown = null,
    disabled = false,
    velocityThreshold = 0.3,
    progressThreshold = 0.3,
    maxDistance = null,
} = {}) => {
    const [dragging, setDragging] = useState(false);
    const [progress, setProgress] = useState(0);

    const onDrag = useCallback(
        ({ active, delta, movement: [, my], velocity: [, vy], canceled, tap }) => {
            if (canceled || tap || disabled) {
                return;
            }

            const up = delta < 0;
            const height = maxDistance === null ? window.innerHeight : maxDistance;
            const p = Math.max(0, my) / height;
            const reachedThreshold =
                vy > velocityThreshold || Math.abs(progress) > progressThreshold;

            if (!tap) {
                setProgress(p);
                setDragging(true);
            }

            if (!active) {
                setDragging(false);
                if (reachedThreshold) {
                    if (up && onSwipeUp !== null) onSwipeUp(); // @todo what to pass as params?
                    if (!up && onSwipeDown !== null) onSwipeDown();
                } else {
                    setProgress(0);
                }
            }
        },
        [setProgress, setDragging, onSwipeUp, onSwipeDown, value],
    );

    const bind = useDrag(onDrag, { axis: 'y', filterTaps: true });

    useEffect(() => {
        setProgress(value);
    }, [value, setProgress]);

    return { bind, dragging, progress };
};

export default useVerticalDrag;
