import { useEffect, useState } from 'react';

import { MediaElement } from '../types';

function useMediaReady(media: MediaElement | null, { id = null }: { id?: string | null } = {}) {
    const [ready, setReady] = useState(() => media !== null && media.readyState > 0);
    const finalId = id || media;
    const [identifier, setIdentifier] = useState(finalId);
    if (finalId !== identifier) {
        setReady(media !== null && media.readyState > 0);
        setIdentifier(finalId);
    } else if (media === null && ready) {
        setReady(false);
    } else if (!ready && media !== null && media.readyState > 0) {
        setReady(true);
    }

    useEffect(() => {
        if (media === null || ready) {
            return () => {};
        }
        function updateReady() {
            setReady(media.readyState > 0);
        }
        media.addEventListener('loadstart', updateReady);
        media.addEventListener('loadeddata', updateReady);
        media.addEventListener('loadedmetadata', updateReady);
        media.addEventListener('canplay', updateReady);
        media.addEventListener('canplaythrough', updateReady);
        return () => {
            media.removeEventListener('loadstart', updateReady);
            media.removeEventListener('loadeddata', updateReady);
            media.removeEventListener('loadedmetadata', updateReady);
            media.removeEventListener('canplay', updateReady);
            media.removeEventListener('canplaythrough', updateReady);
        };
    }, [media, id, ready]);

    return ready;
}

export default useMediaReady;
