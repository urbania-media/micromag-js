import { useState, useEffect, useRef } from 'react';

function useMediaCurrentTime(
    element,
    { id = null, disabled = false, updateInterval = 1000, onUpdate: customOnUpdate = null } = {},
) {
    const [currentTime, setCurrentTime] = useState(0);
    const realCurrentTime = useRef(currentTime);

    const finalId = id || element;
    const lastIdRef = useRef(finalId);
    const idChanged = lastIdRef.current !== finalId;
    if (idChanged) {
        realCurrentTime.current = element !== null ? element.currentTime || 0 : 0;
        lastIdRef.current = finalId;
    }

    // Check time update
    useEffect(() => {
        if (element === null) {
            return () => {};
        }
        function updateTime() {
            const time = element.currentTime;
            if (time !== realCurrentTime.current) {
                realCurrentTime.current = time;
                setCurrentTime(time);

                if (customOnUpdate !== null) {
                    customOnUpdate(time);
                }
            }
            return time;
        }
        if (disabled) {
            updateTime();
            return () => {};
        }
        let timeout = null;
        function loop() {
            const time = updateTime();
            const remainingTime = Math.floor((element.duration - time) * 1000);
            timeout = setTimeout(loop, Math.min(updateInterval, remainingTime));
        }
        loop();
        return () => {
            if (timeout !== null) {
                clearInterval(timeout);
            }
        };
    }, [id, element, setCurrentTime, disabled, updateInterval]);

    return realCurrentTime.current;
}

export default useMediaCurrentTime;
