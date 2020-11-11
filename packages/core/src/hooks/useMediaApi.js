import { useEffect, useMemo, useRef, useState } from 'react';

const useMediaApi = ({
    initialMuted = false,
    initialVolume = 1,
}) => {

    const ref = useRef(null);
    const [muted, setMuted] = useState(initialMuted);
    const [volume, setVolume] = useState(initialVolume);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [ready, setReady] = useState(false);

    const paused = !playing;

    const api = useMemo(() => {
        const mediaEl = ref.current;
        return {
            play: () => {
                if (mediaEl !== null) {
                    mediaEl.play();
                }
            },
            pause: () => {
                if (mediaEl !== null) {
                    mediaEl.pause();
                }
            },
            playPause: () => {
                if (mediaEl !== null) {
                    if (playing) {
                        mediaEl.pause();
                    } else {
                        mediaEl.play();
                    }
                }
            },
            stop: () => {
                if (mediaEl !== null) {
                    mediaEl.pause();
                    mediaEl.currentTime = 0;
                }
            },
            seek: (time) => {
                if (mediaEl !== null) {
                    mediaEl.currentTime = time;
                }
            },
            mute: () => {
                if (mediaEl !== null) {
                    mediaEl.muted = true;
                }
            },
            unMute: () => {
                if (mediaEl !== null) {
                    mediaEl.muted = false;
                }
            },
            muteUnmute: () => {
                if (mediaEl !== null) {
                    mediaEl.muted = !muted;
                }
            },
            setVolume: (vol) => {
                if (mediaEl !== null) {
                    mediaEl.volume = vol;
                }
            },
            duration,
            currentTime,
            volume,
            muted,
            playing,
            paused,
        };
    }, [muted, volume, currentTime, duration, playing, paused]);

    // Audio events handlers

    useEffect(() => {
        const media = ref.current;

        const onTimeUpdate = () => {
            setCurrentTime(media.currentTime);
        };

        const onDurationChange = () => {
            setDuration(media.duration);
        };

        const onVolumeChange = () => {
            setMuted(media.muted);
            setVolume(media.volume);
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

        media.addEventListener('timeupdate', onTimeUpdate);
        media.addEventListener('durationchange', onDurationChange);
        media.addEventListener('volumechange', onVolumeChange);
        media.addEventListener('play', onPlay);
        media.addEventListener('pause', onPause);
        media.addEventListener('ended', onEnded);
        media.addEventListener('loadstart', onLoadStart);
        media.addEventListener('canplaythrough', onCanPlayThrough);

        return () => {
            media.removeEventListener('timeupdate', onTimeUpdate);
            media.removeEventListener('durationchange', onDurationChange);
            media.removeEventListener('volumechange', onVolumeChange);
            media.removeEventListener('play', onPlay);
            media.removeEventListener('pause', onPause);
            media.removeEventListener('ended', onEnded);
            media.removeEventListener('loadstart', onLoadStart);
            media.removeEventListener('canplaythrough', onCanPlayThrough);
        };
    }, [setCurrentTime, setDuration, setMuted, setVolume, setPlaying]);

    return {
        ref,
        api,
        muted,
        volume,
        currentTime,
        duration,
        playing,
        paused,
        ready,
    };
};

export default useMediaApi;
