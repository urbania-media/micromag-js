import { useEffect, useState, useCallback } from 'react';

// @todo
// doesn't really work when skipping ahead, it seems
function useMediaBuffered(media) {
    const [percentageLoaded, setPercentageLoaded] = useState(0);

    const updateBuffered = useCallback(
        (loaded) => {
            setPercentageLoaded(loaded);
        },
        [setPercentageLoaded],
    );

    useEffect(() => {
        if (media === null) {
            return () => {};
        }
        function onProgress(e) {
            const { target = null } = e || {};
            const { buffered = null, currentTime = null, duration: mediaDuration = null } = target || {};
            if (buffered === null || currentTime === null || mediaDuration === null ) return;

            let range = 0;

            while(!(buffered.start(range) <= currentTime && currentTime <= buffered.end(range))) {
                range += 1;
            }
            const start = buffered.start(range) / mediaDuration;
            const end = buffered.end(range) / mediaDuration;
            const loaded = Math.abs(start - end);

            updateBuffered(loaded);
        }

        media.addEventListener('progress', onProgress);
        return () => {
            media.removeEventListener('progress', onProgress);
        };
    }, [media, updateBuffered]);

    return percentageLoaded;
}

export default useMediaBuffered;
