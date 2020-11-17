import { useCallback, useEffect, useRef, useState } from 'react';

const useMediaApi = ({
    initialMuted = false,
}) => {

    const ref = useRef(null);
    const [muted, setMuted] = useState(initialMuted);
    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [ready, setReady] = useState(false);

    const play = useCallback( () => {
        const { current: media } = ref;
        if (media !== null) {
            media.play();
        }
    }, []);

    const pause = useCallback( () => {
        const { current: media } = ref;
        if (media !== null) {
            media.pause();
        }
    }, []);

    const togglePlay = useCallback( () => {
        const { current: media } = ref;
        if (media !== null) {
            if (playing) {
                media.pause()
            } else {
                media.play()
            }
        }
    }, [playing]);

    const stop = useCallback( () => {
        const { current: media } = ref;
        if (media !== null) {
            media.pause();
            media.currentTime = 0;
        }
    }, []);

    const seek = useCallback( (time) => {
        const { current: media } = ref;
        if (media !== null) {
            media.currentTime = time;
        }
    }, []);

    const mute = useCallback( () => {
        const { current: media } = ref;
        if (media !== null) {
            media.muted = true;
        }
    }, []);

    const unMute = useCallback( () => {
        const { current: media } = ref;
        if (media !== null) {
            media.muted = false;
        }
    }, []);

    const toggleMute = useCallback( () => {
        const { current: media } = ref;
        if (media !== null) {
            media.muted = !muted;
        }
    }, [muted]);

    useEffect(() => {
        const { current: media } = ref;

        const onTimeUpdate = () => {
            setCurrentTime(media.currentTime);
        };

        const onDurationChange = () => {
            setDuration(media.duration);
        };

        const onVolumeChange = () => {
            setMuted(media.muted);
        };

        const onPlay = () => {
            setPlaying(true);
        };

        const onPause = () => {
            setPlaying(false);
        };

        const onEnded = () => {
            media.currentTime = 0;
        };

        const onLoadStart = () => {
            setReady(false);
        };

        const onCanPlayThrough = () => {
            setReady(true);
        };
        
        if (media !== null) {
            media.addEventListener('timeupdate', onTimeUpdate);
            media.addEventListener('durationchange', onDurationChange);
            media.addEventListener('volumechange', onVolumeChange);
            media.addEventListener('play', onPlay);
            media.addEventListener('pause', onPause);
            media.addEventListener('ended', onEnded);
            media.addEventListener('loadstart', onLoadStart);
            media.addEventListener('canplaythrough', onCanPlayThrough);
        }       

        return () => {
            if (media !== null) {
                media.removeEventListener('timeupdate', onTimeUpdate);
                media.removeEventListener('durationchange', onDurationChange);
                media.removeEventListener('volumechange', onVolumeChange);
                media.removeEventListener('play', onPlay);
                media.removeEventListener('pause', onPause);
                media.removeEventListener('ended', onEnded);
                media.removeEventListener('loadstart', onLoadStart);
                media.removeEventListener('canplaythrough', onCanPlayThrough);
            }            
        };
    }, [setCurrentTime, setDuration, setMuted, setPlaying]);

    return {
        ref,
        play,
        pause,
        togglePlay,
        stop,
        seek,
        mute,
        unMute,
        toggleMute,
        muted,
        currentTime,
        duration,
        playing,
        paused: !playing,
        ready,
    };
};

export default useMediaApi;
