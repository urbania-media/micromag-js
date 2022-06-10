import { useEffect, useState, useRef } from 'react';

function useMediaDuration(element, { id = null } = {}) {
    const [duration, setDuration] = useState(element !== null ? element.duration || 0 : 0);

    const realDuration = useRef(duration);

    const finalId = id || element;
    const lastIdRef = useRef(finalId);
    const idChanged = lastIdRef.current !== finalId;
    if (idChanged) {
        realDuration.current = element !== null ? element.duration || 0 : 0;
        lastIdRef.current = finalId;
    }

    useEffect(() => {
        if (element === null) {
            return () => {};
        }
        function updateDuration() {
            const newDuration = element.duration || 0;
            if (newDuration !== realDuration.current) {
                realDuration.current = newDuration;
                setDuration(newDuration);
            }
        }
        updateDuration();
        element.addEventListener('canplay', updateDuration);
        element.addEventListener('loadedmetadata', updateDuration);
        element.addEventListener('durationchange', updateDuration);
        return () => {
            element.removeEventListener('canplay', updateDuration);
            element.removeEventListener('loadedmetadata', updateDuration);
            element.removeEventListener('durationchange', updateDuration);
        };
    }, [element, id, setDuration]);

    return realDuration.current;
}

export default useMediaDuration;
