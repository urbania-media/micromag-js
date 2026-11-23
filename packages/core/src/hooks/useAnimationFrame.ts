import { useEffect, useRef } from 'react';

/**
 * Calls `onFrame` at each animation frame (with the time since the first frame) while not
 * disabled. The latest `onFrame` is called: it can change between renders.
 */
const useAnimationFrame = (onFrame, { disabled = false } = {}) => {
    const onFrameRef = useRef(onFrame);
    const startTimeRef = useRef(null);

    useEffect(() => {
        onFrameRef.current = onFrame;
    });

    useEffect(() => {
        if (disabled) {
            return () => {};
        }
        let request = null;
        const callback = (time) => {
            if (!startTimeRef.current) {
                startTimeRef.current = time;
            }
            onFrameRef.current(time - startTimeRef.current);
            request = requestAnimationFrame(callback);
        };
        request = requestAnimationFrame(callback);
        return () => {
            if (request !== null) {
                cancelAnimationFrame(request);
            }
        };
    }, [disabled]);
};

export default useAnimationFrame;
