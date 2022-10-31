import raf from 'raf';
import { useEffect, useState, useRef, useCallback } from 'react';

// import useMediaCurrentTime from './useMediaCurrentTime';
import useMediaDuration from './useMediaDuration';

function useMediaProgress(media, { disabled = false, ...props } = {}) {
    const [playing, setPlaying] = useState(!disabled);
    // const currentTime = useMediaCurrentTime(media, {
    //     disabled: disabled || !playing,
    //     ...props,
    // });
    const duration = useMediaDuration(media, {
        disabled: disabled || !playing,
        ...props,
    });

    const [progress, setProgress] = useState(
        media !== null && (media.currentTime || 0) > 0 && duration > 0 ? media.currentTime / duration : 0,
    );
    const realProgressRef = useRef(progress);
    const updateTimeRef = useRef(new Date().getTime());

    const updateProgress = useCallback(
        (newProgress) => {
            updateTimeRef.current = new Date().getTime();
            realProgressRef.current = newProgress;
            setProgress(newProgress);
        },
        [setProgress],
    );

    useEffect(() => {
        if (media === null) {
            return () => {};
        }
        function onResume() {
            if (!playing) {
                setPlaying(true);
            }
            updateProgress(media.currentTime / media.duration);
        }
        function onPause() {
            if (playing) {
                setPlaying(false);
            }
            updateProgress(media.currentTime / media.duration);
        }
        media.addEventListener('play', onResume);
        media.addEventListener('seeked', onResume);
        media.addEventListener('playing', onResume);
        // media.addEventListener('timeupdate', onResume);
        media.addEventListener('pause', onPause);
        media.addEventListener('ended', onPause);
        media.addEventListener('waiting', onPause);
        media.addEventListener('stalled', onPause);
        media.addEventListener('seeking', onPause);
        // media.addEventListener('suspend', onPause);
        // if (media.paused) {
        //     onPause();
        // } else {
        //     onResume();
        // }
        return () => {
            media.removeEventListener('play', onResume);
            media.removeEventListener('seeked', onResume);
            media.removeEventListener('playing', onResume);
            // media.removeEventListener('timeupdate', onResume);
            media.removeEventListener('pause', onPause);
            media.removeEventListener('ended', onPause);
            media.removeEventListener('waiting', onPause);
            media.removeEventListener('stalled', onPause);
            media.removeEventListener('seeking', onPause);
            // media.removeEventListener('suspend', onPause);
        };
    }, [media, updateProgress, setPlaying, playing]);

    useEffect(() => {
        if (media === null || !playing || disabled) {
            return () => {};
        }
        let handle;
        let canceled = false;
        function tick() {
            if (canceled) {
                return;
            }

            const newTime = new Date().getTime();
            const elapsed = newTime - updateTimeRef.current;
            updateTimeRef.current = newTime;
            const step = elapsed / (duration * 1000);
            const newProgress = realProgressRef.current + step;
            updateProgress(newProgress);
            handle = raf(tick);
        }
        tick();

        return () => {
            canceled = true;
            raf.cancel(handle);
        };
    }, [media, playing, disabled, duration, updateProgress]);

    return realProgressRef.current;
}

export default useMediaProgress;
