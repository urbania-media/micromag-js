import { useEffect, useState } from 'react';

import { getMediaCurrentTime, getMediaDuration } from '../utils';

import { MediaElement } from '../types';
import useMediaTimestampOffset from './useMediaTimestampOffset';

function useMediaCurrentTime(
    media: MediaElement | null,
    { id = null, disabled = false, updateInterval = 1000, onUpdate: customOnUpdate = null } = {},
) {
    const tsOffset = useMediaTimestampOffset(media);
    const [currentTime, setCurrentTime] = useState(() => getMediaCurrentTime(media, tsOffset));
    const [currentDisabled, setCurrentDisabled] = useState(disabled);

    const finalId = id || media;
    const [identifier, setIdentifier] = useState(finalId);
    if (finalId !== identifier) {
        setCurrentTime(getMediaCurrentTime(media, tsOffset));
        setIdentifier(finalId);
    } else if (disabled !== currentDisabled) {
        setCurrentTime(getMediaCurrentTime(media, tsOffset));
        setCurrentDisabled(disabled);
    }

    // Check time update
    useEffect(() => {
        if (media === null) {
            return () => {};
        }
        let lastTime = getMediaCurrentTime(media, tsOffset);
        function updateTime() {
            const newTime = getMediaCurrentTime(media, tsOffset);
            if (newTime !== lastTime) {
                lastTime = newTime;
                setCurrentTime(newTime);

                if (customOnUpdate !== null) {
                    customOnUpdate(newTime);
                }
            }
            return newTime;
        }
        let timeout = null;
        function loop() {
            const duration = getMediaDuration(media, tsOffset);
            const time = updateTime();
            const remainingTime = Math.floor(((duration || 0) - time) * 1000);
            timeout = setTimeout(
                loop,
                Math.max(Math.min(updateInterval, remainingTime), updateInterval),
            );
        }
        timeout = setTimeout(loop, updateInterval);
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [identifier, media, tsOffset, setCurrentTime, disabled, updateInterval, customOnUpdate]);

    return currentTime;
}

export default useMediaCurrentTime;
