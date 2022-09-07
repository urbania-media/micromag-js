import { useSpring } from '@react-spring/core';
import { useDrag } from '@use-gesture/react';
import { useState, useCallback, useRef } from 'react';

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
    const [dragging, setDragging] = useState(false);
    const [{ progress }, api] = useSpring(() => ({
        progress: wantedProgress,
        immediate: dragging || disabled,
        ...springParams,
    }));
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

    return {
        bind,
        dragging,
        progress,
    };
}

export default useDragProgress;

// import { useDrag } from '@use-gesture/react';
// import { useState, useCallback, useEffect, useRef } from 'react';

// import useSpringValue from './useSpringValue';

// function useDragProgress({
//     progress: wantedProgress,
//     onTap = null,
//     disabled = false,
//     dragDisabled = false,
//     computeProgress = null,
//     onProgress = null,
//     springParams = undefined,
//     dragOptions = {
//         filterTaps: true,
//         preventDefault: true,
//     },
// } = {}) {
//     const refDragging = useRef(false);
//     const [{ dragging, progress }, setDragState] = useState({
//         dragging: false,
//         progress: wantedProgress,
//     });
//     const onDrag = useCallback(
//         (gestureState) => {
//             if (disabled) {
//                 return;
//             }
//             const { active, tap } = gestureState;

//             if (tap) {
//                 if (onTap !== null) onTap(gestureState);
//                 return;
//             }

//             if (dragDisabled) {
//                 return;
//             }

//             const newProgress = computeProgress(gestureState);
//             refDragging.current = active;
//             setDragState({
//                 dragging: active,
//                 progress: newProgress,
//             });
//             if (onProgress !== null) {
//                 onProgress(newProgress, gestureState);
//             }
//         },
//         [setDragState, disabled, onTap, computeProgress, setDragState, onProgress],
//     );

//     const bind = useDrag(onDrag, dragOptions);

//     const springedProgress = useSpringValue(progress, dragging || disabled, springParams);

//     useEffect(() => {
//         if (wantedProgress !== progress && !refDragging.current) {
//             setDragState({
//                 dragging: refDragging.current,
//                 progress: wantedProgress,
//             });
//         }
//     }, [wantedProgress]);

//     return {
//         bind,
//         dragging,
//         progress: springedProgress,
//     };
// }

// export default useDragProgress;
