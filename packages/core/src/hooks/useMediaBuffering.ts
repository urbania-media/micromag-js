import { useEffect, useState } from 'react';

import { getMediaIsBuffering } from '../utils';

import { MediaElement } from '../types';

const useMediaBuffering = (media: MediaElement | null = null) => {
    const [buffering, setBuffering] = useState(() => getMediaIsBuffering(media));

    useEffect(() => {
        if (media === null) {
            return () => {};
        }
        function onBufferingEvent(e) {
            setBuffering(getMediaIsBuffering(e.currentTarget));
        }

        media.addEventListener('canplay', onBufferingEvent);
        media.addEventListener('waiting', onBufferingEvent);
        media.addEventListener('stalled', onBufferingEvent);
        media.addEventListener('play', onBufferingEvent);
        media.addEventListener('playing', onBufferingEvent);
        media.addEventListener('pause', onBufferingEvent);
        media.addEventListener('ended', onBufferingEvent);
        return () => {
            media.removeEventListener('canplay', onBufferingEvent);
            media.removeEventListener('waiting', onBufferingEvent);
            media.removeEventListener('stalled', onBufferingEvent);
            media.removeEventListener('play', onBufferingEvent);
            media.removeEventListener('playing', onBufferingEvent);
            media.removeEventListener('pause', onBufferingEvent);
            media.removeEventListener('ended', onBufferingEvent);
        };
    }, [media]);

    return { buffering };
};

export default useMediaBuffering;
