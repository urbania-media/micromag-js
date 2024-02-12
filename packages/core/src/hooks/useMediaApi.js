import { useCallback, useEffect, useRef, useState } from 'react';

const progressSteps = [0.1, 0.25, 0.5, 0.75, 0.9];

const useMediaApi = ({
    url = null,
    onTimeUpdate = null,
    onProgressStep = null,
    onDurationChange = null,
    onVolumeChange = null,
    onPlay = null,
    onPause = null,
    onEnded = null,
    onSeeked = null,
    onSuspend = null,
    onLoadStart = null,
    onCanPlayThough = null,
    onCanPlay = null,
    onLoadedData = null,
    onLoadedMetadata = null,
} = {}) => {
    const ref = useRef(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [ready, setReady] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [initialPlay, setInitialPlay] = useState(true);
    const [suspended, setSuspended] = useState(false);
    const progressStepsReached = useRef({});

    const paused = !playing;

    // Exposed methods

    const play = useCallback(() => {
        const { current: media } = ref;
        if (media !== null) {
            media.play();
        }
    }, []);

    const pause = useCallback(() => {
        const { current: media } = ref;
        if (media !== null) {
            media.pause();
        }
    }, []);

    const stop = useCallback(() => {
        const { current: media } = ref;
        if (media !== null) {
            media.pause();
            media.currentTime = 0;
        }
    }, []);

    const seek = useCallback((time) => {
        const { current: media } = ref;
        if (media !== null) {
            media.currentTime = time;
        }
    }, []);

    // const mute = useCallback(() => {
    //     const { current: media } = ref;
    //     if (media !== null) {
    //         media.muted = true;
    //     }
    // }, []);

    // const unMute = useCallback(() => {
    //     const { current: media } = ref;
    //     if (media !== null) {
    //         media.muted = false;
    //     }
    // }, []);

    // Media events callbacks

    const onCustomPlay = useCallback(() => {
        if (onPlay !== null) {
            onPlay({ initial: initialPlay });
        }

        if (initialPlay) {
            setInitialPlay(false);
        }
        setPlaying(true);
        setSuspended(false);
    }, [initialPlay, setPlaying, onPlay]);

    const onCustomPlaying = useCallback(() => {
        setPlaying(true);
        setSuspended(false);
    }, []);

    const onCustomPause = useCallback(
        (e) => {
            const { currentTarget: eventMedia } = e;
            setPlaying(false);

            if (onPause !== null) {
                onPause({
                    midway:
                        eventMedia.currentTime > 0 && eventMedia.currentTime < eventMedia.duration,
                });
            }
        },
        [setPlaying, onPause],
    );

    const onCustomEnded = useCallback(
        (e) => {
            const { currentTarget: eventMedia } = e;
            eventMedia.currentTime = 0;
            if (onEnded !== null) {
                onEnded();
            }
            setInitialPlay(true);
        },
        [setInitialPlay, onEnded],
    );

    const onCustomTimeUpdate = useCallback(
        (e) => {
            const { currentTarget: eventMedia } = e;

            setCurrentTime(eventMedia.currentTime);

            if (onTimeUpdate !== null) {
                onTimeUpdate(eventMedia.currentTime);
            }

            const progress = eventMedia.currentTime / eventMedia.duration;
            const currentSteps = progressStepsReached.current;
            const stepsToTrack = progressSteps.filter(
                (step) => progress > step && typeof currentSteps[step] === 'undefined',
            );
            stepsToTrack.forEach((step) => {
                if (onProgressStep !== null) {
                    onProgressStep(step);
                }
                currentSteps[step] = true;
            });
        },
        [setCurrentTime, onTimeUpdate, onProgressStep],
    );

    const onCustomDurationChange = useCallback(
        (e) => {
            const { currentTarget: eventMedia } = e;

            setDuration(eventMedia.duration);

            if (onDurationChange !== null) {
                onDurationChange(eventMedia.duration);
            }
        },
        [setDuration, onDurationChange],
    );

    const onCustomSeeked = useCallback(
        (e) => {
            const { currentTarget: eventMedia } = e;

            if (onSeeked !== null) {
                onSeeked(eventMedia.currentTime);
            }
        },
        [onSeeked],
    );

    const onCustomVolumeChange = useCallback(
        (e) => {
            const { currentTarget: eventMedia } = e;

            // setMuted(eventMedia.muted);
            if (onVolumeChange !== null) {
                onVolumeChange(eventMedia.volume);
            }
        },
        [onVolumeChange],
    );

    const onCustomLoadStart = useCallback(() => {
        if (onLoadStart !== null) {
            onLoadStart();
        }
    }, [setReady, onLoadStart]);

    const onCustomCanPlayThrough = useCallback(() => {
        setReady(true);

        if (onCanPlayThough !== null) {
            onCanPlayThough();
        }
    }, [setReady, onCanPlayThough]);

    const onCustomCanPlay = useCallback(() => {
        setReady(true);

        if (onCanPlay !== null) {
            onCanPlay();
        }
    }, [setReady, onCanPlay]);

    const onCustomLoadedMetadata = useCallback(() => {
        setReady(true);

        if (onLoadedMetadata !== null) {
            onLoadedMetadata();
        }
    }, [setReady, onLoadedMetadata]);

    const onCustomLoadedData = useCallback(() => {
        setDataReady(true);

        if (onLoadedData !== null) {
            onLoadedData();
        }
    }, [setDataReady, onLoadedData]);

    const onCustomSuspended = useCallback(() => {
        setSuspended(true);

        if (onSuspend !== null) {
            onSuspend();
        }
    }, [setSuspended, onSuspended]);

    useEffect(() => {
        const { current: media = null } = ref;

        // console.log('actions', url);

        if (media !== null) {
            media.addEventListener('volumechange', onCustomVolumeChange);
            media.addEventListener('play', onCustomPlay);
            media.addEventListener('playing', onCustomPlaying);
            media.addEventListener('pause', onCustomPause);
            media.addEventListener('ended', onCustomEnded);
            media.addEventListener('seeked', onCustomSeeked);
            // media.addEventListener('loadstart', onCustomLoadStart);
            // media.addEventListener('canplaythrough', onCustomCanPlayThrough);
            // media.addEventListener('canplay', onCustomCanPlay);
            // media.addEventListener('loadedmetadata', onCustomLoadedMetadata);
            // media.addEventListener('loadeddata', onCustomLoadedData);
        }

        return () => {
            if (media !== null) {
                media.removeEventListener('volumechange', onCustomVolumeChange);
                media.removeEventListener('play', onCustomPlay);
                media.removeEventListener('playing', onCustomPlaying);
                media.removeEventListener('pause', onCustomPause);
                media.removeEventListener('ended', onCustomEnded);
                media.removeEventListener('seeked', onCustomSeeked);
                // media.removeEventListener('loadstart', onCustomLoadStart);
                // media.removeEventListener('canplaythrough', onCustomCanPlayThrough);
                // media.removeEventListener('canplay', onCustomCanPlay);
                // media.removeEventListener('loadedmetadata', onCustomLoadedMetadata);
            }
        };
    }, [
        url,
        onCustomVolumeChange,
        onCustomPlay,
        onCustomPause,
        onCustomEnded,
        onCustomSeeked,
        onCustomSuspended,
        // onCustomLoadStart,
        // onCustomCanPlayThrough,
        // onCustomCanPlay,
        // onCustomLoadedMetadata,
    ]);

    useEffect(() => {
        const { current: media = null } = ref;

        if (media !== null) {
            media.addEventListener('loadstart', onCustomLoadStart);
            media.addEventListener('canplaythrough', onCustomCanPlayThrough);
            media.addEventListener('canplay', onCustomCanPlay);
            media.addEventListener('loadedmetadata', onCustomLoadedMetadata);
            media.addEventListener('loadeddata', onCustomLoadedData);
            media.addEventListener('suspend', onCustomSuspended);
        }

        return () => {
            if (media !== null) {
                media.removeEventListener('loadstart', onCustomLoadStart);
                media.removeEventListener('canplaythrough', onCustomCanPlayThrough);
                media.removeEventListener('canplay', onCustomCanPlay);
                media.removeEventListener('loadedmetadata', onCustomLoadedMetadata);
                media.removeEventListener('suspend', onCustomSuspended);
            }
        };
    }, [
        url,
        onCustomLoadStart,
        onCustomCanPlayThrough,
        onCustomCanPlay,
        onCustomLoadedMetadata,
        onCustomSuspended,
    ]);

    // Duration
    useEffect(() => {
        const { current: media = null } = ref;
        if (media !== null) {
            media.addEventListener('durationchange', onCustomDurationChange);
        }
        return () => {
            if (media !== null) {
                media.removeEventListener('durationchange', onCustomDurationChange);
            }
        };
    }, [url, onCustomDurationChange]);

    // Timeupdate
    useEffect(() => {
        const { current: media = null } = ref;
        // console.log('timeupdate', url);
        if (media !== null) {
            media.addEventListener('timeupdate', onCustomTimeUpdate);
        }
        return () => {
            if (media !== null) {
                media.removeEventListener('timeupdate', onCustomTimeUpdate);
            }
        };
    }, [url, onCustomTimeUpdate, onCustomDurationChange]);

    useEffect(() => {
        const { current: media = null } = ref;

        if (media !== null && media.readyState > 1) {
            setDataReady(true);
        } else {
            setDataReady(false);
        }

        if (media !== null && media.readyState > 3) {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [url]);

    return {
        ref,
        play,
        pause,
        stop,
        seek,
        currentTime,
        duration,
        playing,
        paused,
        ready,
        dataReady,
        suspended,
    };
};

export default useMediaApi;
