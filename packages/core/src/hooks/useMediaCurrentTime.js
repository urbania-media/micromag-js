import { useState, useEffect, useRef } from 'react';

function useMediaCurrentTime(
    element,
    {
        id = null,
        disabled = false,
        updateInterval = 1000,
        onUpdate: customOnUpdate = null,
    } = {},
) {
    const [currentTime, setCurrentTime] = useState(0);
    const realCurrentTime = useRef(currentTime);

    const lastIdRef = useRef(id);
    const idChanged = lastIdRef.current !== id;
    if (idChanged) {
        realCurrentTime.current = 0;
        lastIdRef.current = id;
    }

    // Check time update
    useEffect(() => {
        if (disabled || element === null) {
            return () => {};
        }
        let canceled = false;
        const updateTime = (time) => {
            if (canceled) {
                return;
            }
            realCurrentTime.current = time;
            setCurrentTime(time);

            if (customOnUpdate !== null) {
                customOnUpdate(time);
            }
        };
        const interval = setInterval(() => {
            const time = element.currentTime;
            if (typeof time.then !== 'undefined') {
                time.then(updateTime);
            } else {
                updateTime(time);
            }
        }, updateInterval);
        return () => {
            canceled = true;
            clearInterval(interval);
        };
    }, [id, element, setCurrentTime, disabled, updateInterval]);

    return realCurrentTime.current;
}

export default useMediaCurrentTime;
