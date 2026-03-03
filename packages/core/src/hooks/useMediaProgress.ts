import raf from 'raf';
import { useEffect, useState, useRef, useCallback } from 'react';

import useMediaDuration from './useMediaDuration';

function useMediaProgress(media, { disabled = false, ...props } = {}) {
    const [playing, setPlaying] = useState(!disabled);

    const duration = useMediaDuration(media, {
        disabled: disabled || !playing,
        ...props,
    });

    const [progress, setProgress] = useState(0);
    const realProgressRef = useRef(progress);
    const updateTimeRef = useRef(Date.now() / 1000);

    const updateProgress = useCallback(
        (newProgress) => {
            updateTimeRef.current = Date.now() / 1000;
            realProgressRef.current = newProgress;
            setProgress(newProgress);
        },
        [setProgress],
    );

    useEffect(() => {
        if (media !== null) {
            const value =
                (media.currentTime || 0) > 0 && media.duration > 0
                    ? media.currentTime / media.duration
                    : 0;
            updateProgress(value);
            setPlaying(!media.paused && media.readyState === 4);
        } else {
            updateProgress(0);
            setPlaying(false);
        }
    }, [media, disabled, setPlaying]);

    useEffect(() => {
        if (media === null) {
            return () => {};
        }
        function onResume(e) {
            setPlaying(true);
            const newProgress = media.currentTime / media.duration;
            updateProgress(newProgress);
        }
        function onUpdate(e) {
            setPlaying(!e.currentTarget.paused && !e.currentTarget.ended);
            const newProgress = media.currentTime / media.duration;
            updateProgress(newProgress);
        }
        function onPause() {
            setPlaying(false);
            const newProgress = media.currentTime / media.duration;
            updateProgress(newProgress);
        }
        media.addEventListener('play', onResume);
        media.addEventListener('playing', onResume);
        media.addEventListener('seeked', onUpdate);
        // media.addEventListener('timeupdate', onUpdate);
        media.addEventListener('pause', onPause);
        media.addEventListener('ended', onPause);
        media.addEventListener('waiting', onPause);
        media.addEventListener('stalled', onPause);
        media.addEventListener('seeking', onPause);
        media.addEventListener('suspend', onUpdate);
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
            media.removeEventListener('suspend', onUpdate);
        };
    }, [media, updateProgress, setPlaying, playing]);

    useEffect(() => {
        if (media === null || !playing || disabled) {
            return () => {};
        }
        let handle;
        let canceled = false;

        let lastSync = 0;
        const syncTime = 0.7;
        function tick() {
            if (canceled) {
                return;
            }

            const newTime = Date.now() / 1000;
            const elapsed = newTime - updateTimeRef.current;
            const step = elapsed / duration;
            lastSync += elapsed;
            const shouldSync = lastSync > syncTime;
            const newProgress = realProgressRef.current < 0.1
                    ? media.currentTime / media.duration
                    : realProgressRef.current + step;
            if (shouldSync) {
                lastSync -= syncTime;
            }
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
