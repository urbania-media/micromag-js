import { useCallback, useEffect, useRef } from 'react';

const useMediaBuffering = (mediaElement, interval = 50.0) => {
    const bufferingRef = useRef(false);

    const onBufferingEvent = useCallback(
        (e) => {
            // networkstate
            if (mediaElement.networkState === mediaElement.NETWORK_LOADING) {
                // The user agent is actively trying to download data.
                console.log('buffering? NETWORK_LOADING', e);
            }

            // readystate
            if (mediaElement.readyState < mediaElement.HAVE_FUTURE_DATA) {
                // There is not enough data to keep playing from this point
                console.log('buffering? You have very little data', e);
            }
        },
        [mediaElement],
    );

    useEffect(() => {
        mediaElement.addEventListener('waiting', onBufferingEvent);
        mediaElement.addEventListener('stalled', onBufferingEvent);
        return () => {
            mediaElement.removeEventListener('waiting', onBufferingEvent);
            mediaElement.removeEventListener('stalled', onBufferingEvent);
        };
    }, [mediaElement, onBufferingEvent]);

    useEffect(() => {
        let lastPlayPos = 0;
        let currentPlayPos = 0;
        let bufferingDetected = false;

        function checkBuffering(player, checkInterval) {
            currentPlayPos = player.currentTime;

            // checking offset should be at most the check interval
            // but allow for some margin
            const offset = (checkInterval - 20) / 1000;

            // if no buffering is currently detected,
            // and the position does not seem to increase
            // and the player isn't manually paused...
            if (!bufferingDetected && currentPlayPos < lastPlayPos + offset && !player.paused) {
                console.log('buffering!');
                bufferingDetected = true;
            }

            // if we were buffering but the player has advanced,
            // then there is no buffering
            if (bufferingDetected && currentPlayPos > lastPlayPos + offset && !player.paused) {
                console.log('not buffering anymore!');
                bufferingDetected = false;
            }
            lastPlayPos = currentPlayPos;

            return bufferingDetected;
        }

        const id = setInterval(() => {
            bufferingRef.current = checkBuffering(mediaElement, interval);
        }, interval);

        return () => {
            clearInterval(id);
        };
    }, [mediaElement, interval]);

    return bufferingRef.current;
};

export default useMediaBuffering;
