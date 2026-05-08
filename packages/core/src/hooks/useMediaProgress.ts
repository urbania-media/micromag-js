import raf from 'raf';
import { startTransition, useEffect, useState } from 'react';

import { getMediaIsPlaying } from '../utils';

import useMediaDuration from './useMediaDuration';

function useMediaProgress(media = null, options = null) {
    const { disabled = false, ...props } = options || {};
    const [playing, setPlaying] = useState(() => !disabled && getMediaIsPlaying(media));

    const duration = useMediaDuration(media, {
        disabled: disabled || !playing,
        ...props,
    });

    const [progressMedia, setProgressMedia] = useState(media);
    const [progress, setProgress] = useState(0);
    const [updateTime, setUpdateTime] = useState(() => Date.now() / 1000);

    if (media !== progressMedia) {
        const newProgress =
            media !== null && (media?.currentTime || 0) > 0 && (media?.duration || 0) > 0
                ? media.currentTime / media.duration
                : 0;
        setUpdateTime(Date.now() / 1000);
        setProgress(newProgress);
        setPlaying(getMediaIsPlaying(media));
        setProgressMedia(media);
    }

    useEffect(() => {
        if (media === null) {
            return () => {};
        }

        function onUpdate(e) {
            setPlaying(getMediaIsPlaying(e.currentTarget));
            const newProgress = e.currentTarget.currentTime / e.currentTarget.duration;
            startTransition(() => {
                setUpdateTime(Date.now() / 1000);
                setProgress(newProgress);
            });
        }
        media.addEventListener('play', onUpdate);
        media.addEventListener('playing', onUpdate);
        media.addEventListener('seeked', onUpdate);
        media.addEventListener('pause', onUpdate);
        media.addEventListener('ended', onUpdate);
        media.addEventListener('waiting', onUpdate);
        media.addEventListener('stalled', onUpdate);
        media.addEventListener('seeking', onUpdate);
        media.addEventListener('suspend', onUpdate);
        return () => {
            media.removeEventListener('play', onUpdate);
            media.removeEventListener('playing', onUpdate);
            media.removeEventListener('seeked', onUpdate);
            media.removeEventListener('pause', onUpdate);
            media.removeEventListener('ended', onUpdate);
            media.removeEventListener('waiting', onUpdate);
            media.removeEventListener('stalled', onUpdate);
            media.removeEventListener('seeking', onUpdate);
            media.removeEventListener('suspend', onUpdate);
        };
    }, [media, setPlaying, playing]);

    useEffect(() => {
        if (media === null || !playing || disabled) {
            return () => {};
        }
        let handle;
        let canceled = false;

        let lastSync = 0;
        const syncTime = 0.7;
        let currentProgress = progress;
        let currentUpdateTime = updateTime;
        function tick() {
            if (canceled) {
                return;
            }

            const newTime = Date.now() / 1000;
            const elapsed = newTime - currentUpdateTime;
            const step = elapsed / duration;
            lastSync += elapsed;
            const shouldSync = lastSync > syncTime;
            const newProgress =
                currentProgress < 0.1 ? media.currentTime / media.duration : currentProgress + step;
            if (shouldSync) {
                lastSync -= syncTime;
            }
            startTransition(() => {
                setUpdateTime(Date.now() / 1000);
                setProgress(newProgress);
            });
            currentUpdateTime = newTime;
            currentProgress = newProgress;
            handle = raf(tick);
        }
        tick();

        return () => {
            canceled = true;
            raf.cancel(handle);
        };
    }, [media, playing, disabled, duration, setProgress]);

    return progress;
}

export default useMediaProgress;
