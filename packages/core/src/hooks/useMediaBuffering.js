import { useCallback, useEffect, useState } from 'react';

const useMediaBuffering = (mediaElement = null, interval = 50.0) => {
    const [buffering, setBuffering] = useState(false);

    useEffect(() => {
        if (mediaElement === null) {
            return () => {};
        }
        function onBufferingEvent(e) {
            // networkstate
            if (mediaElement.networkState === mediaElement.NETWORK_LOADING) {
                // The user agent is actively trying to download data.
                console.log('buffering? NETWORK_LOADING', e);
                setBuffering(true);
            }

            // readystate
            if (mediaElement.readyState < mediaElement.HAVE_FUTURE_DATA) {
                // There is not enough data to keep playing from this point
                console.log('buffering? You have very little data', e);
                setBuffering(true);
            }
        }

        function onPlay() {
            setBuffering(false);
        }

        function onPlaying() {
            setBuffering(false);
        }

        function onPause() {
            setBuffering(false);
        }

        function onEnded() {
            setBuffering(false);
        }

        mediaElement.addEventListener('waiting', onBufferingEvent);
        mediaElement.addEventListener('stalled', onBufferingEvent);
        mediaElement.addEventListener('play', onPlay);
        mediaElement.addEventListener('playing', onPlaying);
        mediaElement.addEventListener('pause', onPause);
        mediaElement.addEventListener('ended', onEnded);
        return () => {
            mediaElement.removeEventListener('waiting', onBufferingEvent);
            mediaElement.removeEventListener('stalled', onBufferingEvent);
            mediaElement.removeEventListener('play', onPlay);
            mediaElement.removeEventListener('playing', onPlaying);
            mediaElement.removeEventListener('pause', onPause);
            mediaElement.removeEventListener('ended', onEnded);
        };
    }, [mediaElement]);

    // useEffect(() => {
    //     if (mediaElement === null) {
    //         return () => {};
    //     }
    //     let lastPlayPos = 0;
    //     let currentPlayPos = 0;
    //     let bufferingDetected = false;

    //     function checkBuffering(player, checkInterval) {
    //         currentPlayPos = player.currentTime;

    //         // checking offset should be at most the check interval
    //         // but allow for some margin
    //         const offset = (checkInterval - 20) / 1000;

    //         // if no buffering is currently detected,
    //         // and the position does not seem to increase
    //         // and the player isn't manually paused...
    //         if (!bufferingDetected && currentPlayPos < lastPlayPos + offset && !player.paused) {
    //             console.log('buffering!');
    //             bufferingDetected = true;
    //         }

    //         // if we were buffering but the player has advanced,
    //         // then there is no buffering
    //         if (bufferingDetected && currentPlayPos > lastPlayPos + offset && !player.paused) {
    //             console.log('not buffering anymore!');
    //             bufferingDetected = false;
    //         }
    //         lastPlayPos = currentPlayPos;

    //         return bufferingDetected;
    //     }

    //     const id = setInterval(() => {
    //         setBuffering(checkBuffering(mediaElement, interval));
    //     }, interval);

    //     return () => {
    //         clearInterval(id);
    //     };
    // }, [mediaElement, interval]);

    return { buffering };
};

export default useMediaBuffering;
