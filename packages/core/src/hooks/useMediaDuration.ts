import { useEffect, useState } from 'react';

import useMediaTimestampOffset from './useMediaTimestampOffset';

function useMediaDuration(element, { id = null } = {}) {
    const tsOffset = useMediaTimestampOffset(element);
    const [duration, setDuration] = useState(() =>
        element !== null ? Math.max((element?.duration || 0) - tsOffset, 0) : 0,
    );
    const finalId = id || element;
    const [identifier, setIdentifier] = useState(finalId);
    if (finalId !== identifier) {
        setDuration(element !== null ? Math.max((element?.duration || 0) - tsOffset, 0) : 0);
        setIdentifier(finalId);
    } else if (element === null && duration !== 0) {
        setDuration(0);
    } else if (
        duration === 0 &&
        element !== null &&
        Math.max((element?.duration || 0) - tsOffset, 0) > 0
    ) {
        setDuration(Math.max((element?.duration || 0) - tsOffset, 0));
    }

    useEffect(() => {
        if (element === null) {
            return () => {};
        }
        function updateDuration(e) {
            const newDuration = Math.max((e.currentTarget.duration || 0) - tsOffset, 0);
            setDuration(newDuration);
        }
        element.addEventListener('canplay', updateDuration);
        element.addEventListener('loadedmetadata', updateDuration);
        element.addEventListener('durationchange', updateDuration);
        return () => {
            element.removeEventListener('canplay', updateDuration);
            element.removeEventListener('loadedmetadata', updateDuration);
            element.removeEventListener('durationchange', updateDuration);
        };
    }, [element, id, setDuration, tsOffset]);

    return duration;
}

export default useMediaDuration;
