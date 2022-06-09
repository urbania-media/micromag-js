import { useRef, useState, useEffect } from 'react';

function useActivityDetector({ disabled = false, timeout: timeoutDelay = 2000 } = {}) {
    const ref = useRef(null);
    const [detected, setDetected] = useState(false);

    useEffect(() => {
        const { current: element = null } = ref;
        if (element === null || disabled) {
            return () => {};
        }
        let timeout = null;
        function onMove() {
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
            }
            setDetected(true);
            timeout = setTimeout(() => {
                setDetected(false);
            }, timeoutDelay);
        }
        element.addEventListener('mousemove', onMove);
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
            }
            element.removeEventListener('mousemove', onMove);
        };
    }, [disabled, timeoutDelay]);

    return {
        ref,
        detected,
    };
}

export default useActivityDetector;
