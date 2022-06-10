import { useRef, useState, useEffect } from 'react';

function useActivityDetector({ disabled = false, timeout: timeoutDelay = 2000 } = {}) {
    const ref = useRef(null);
    const [detected, setDetected] = useState(false);
    const detectedRef = useRef(detected);

    useEffect(() => {
        const { current: element = null } = ref;
        if (element === null || disabled) {
            return () => {};
        }
        let timeout = null;
        function onActivity() {
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
            }
            if (!detectedRef.current) {
                detectedRef.current = true;
                setDetected(true);
            }
            timeout = setTimeout(() => {
                detectedRef.current = false;
                setDetected(false);
            }, timeoutDelay);
        }
        element.addEventListener('keydown', onActivity);
        element.addEventListener('mousedown', onActivity);
        element.addEventListener('mousemove', onActivity);
        element.addEventListener('mouseup', onActivity);
        element.addEventListener('pointerdown', onActivity);
        element.addEventListener('pointermove', onActivity);
        element.addEventListener('pointerup', onActivity);
        element.addEventListener('touchmove', onActivity);
        element.addEventListener('touchstart', onActivity);
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
            }
            element.removeEventListener('keydown', onActivity);
            element.removeEventListener('mousedown', onActivity);
            element.removeEventListener('mousemove', onActivity);
            element.removeEventListener('mouseup', onActivity);
            element.removeEventListener('pointerdown', onActivity);
            element.removeEventListener('pointermove', onActivity);
            element.removeEventListener('pointerup', onActivity);
            element.removeEventListener('touchmove', onActivity);
            element.removeEventListener('touchstart', onActivity);
        };
    }, [disabled, timeoutDelay]);

    return {
        ref,
        detected,
    };
}

export default useActivityDetector;
