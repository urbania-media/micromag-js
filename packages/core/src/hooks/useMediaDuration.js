import { useEffect, useState, useRef } from 'react';

function useMediaDuration(element, { id = null } = {}) {
    const [duration, setDuration] = useState(element !== null ? element.duration || 0 : 0);

    const realDuration = useRef(duration);

    const lastIdRef = useRef(id);
    const idChanged = lastIdRef.current !== id;
    if (idChanged) {
        realDuration.current = element !== null ? element.duration || 0 : 0;
        lastIdRef.current = id;
    }

    useEffect(() => {
        if (element === null) {
            return () => {};
        }
        function updateDuration() {
            realDuration.current = element.duration || 0;
            setDuration(element.duration || 0);
        }
        updateDuration();
        element.addEventListener('loadedmetadata', updateDuration);
        element.addEventListener('durationchange', updateDuration);
        return () => {
            element.removeEventListener('loadedmetadata', updateDuration);
            element.removeEventListener('durationchange', updateDuration);
        };
    }, [element, id, setDuration]);

    return realDuration.current;
}

export default useMediaDuration;
