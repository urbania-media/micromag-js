import { useEffect, useState } from 'react';

import { getMediaDuration } from '../utils';

import { MediaElement } from '../types';
import useMediaTimestampOffset from './useMediaTimestampOffset';

function useMediaDuration(media: MediaElement | null, { id = null } = {}) {
    const tsOffset = useMediaTimestampOffset(media);
    const [duration, setDuration] = useState(() => getMediaDuration(media, tsOffset));
    const finalId = id || media;
    const [identifier, setIdentifier] = useState(finalId);
    if (finalId !== identifier) {
        setDuration(getMediaDuration(media, tsOffset));
        setIdentifier(finalId);
    } else if (media === null && duration !== 0) {
        setDuration(0);
    } else if (duration === 0 && getMediaDuration(media, tsOffset) > 0) {
        setDuration(getMediaDuration(media, tsOffset));
    }

    useEffect(() => {
        if (media === null) {
            return () => {};
        }
        function updateDuration(e) {
            setDuration(getMediaDuration(e.currentTarget, tsOffset));
        }
        media.addEventListener('canplay', updateDuration);
        media.addEventListener('loadedmetadata', updateDuration);
        media.addEventListener('durationchange', updateDuration);
        return () => {
            media.removeEventListener('canplay', updateDuration);
            media.removeEventListener('loadedmetadata', updateDuration);
            media.removeEventListener('durationchange', updateDuration);
        };
    }, [identifier, media, setDuration, tsOffset]);

    return duration;
}

export default useMediaDuration;
