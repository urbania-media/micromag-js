import { SpringValue, useSpringValue } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

import type { MediaElement } from '@micromag/core';
import { useMediaDuration } from '@micromag/core/hooks';
import { getMediaIsPlaying } from '@micromag/core/utils';

import getNextMediaProgress from '../lib/getNextMediaProgress';

const MEDIA_EVENTS = [
    'play',
    'playing',
    'seeked',
    'pause',
    'ended',
    'waiting',
    'stalled',
    'seeking',
    'suspend',
];

function getMediaProgress(media: MediaElement | null): number {
    return media !== null && (media?.currentTime || 0) > 0 && (media?.duration || 0) > 0
        ? media.currentTime / media.duration
        : 0;
}

/**
 * Same progress as `useMediaProgress` from `@micromag/core`, as a spring value instead of state:
 * the seek bar is animated at every frame while a media plays, and rendering it with React at
 * each frame re-rendered the playback controls about 60 times per second.
 */
function useMediaProgressSpring(
    media: MediaElement | null = null,
    { disabled = false }: { disabled?: boolean } = {},
): SpringValue<number> {
    const progress = useSpringValue(getMediaProgress(media));
    // Time of the last update, set when the media is set
    const updateTimeRef = useRef(0);
    const [playing, setPlaying] = useState(() => !disabled && getMediaIsPlaying(media));
    const duration = useMediaDuration(media);

    const [progressMedia, setProgressMedia] = useState(media);
    if (media !== progressMedia) {
        setPlaying(getMediaIsPlaying(media));
        setProgressMedia(media);
    }

    useEffect(() => {
        updateTimeRef.current = Date.now() / 1000;
        progress.set(getMediaProgress(media));
    }, [media, progress]);

    useEffect(() => {
        if (media === null) {
            return () => {};
        }
        function onUpdate(e) {
            setPlaying(getMediaIsPlaying(e.currentTarget));
            updateTimeRef.current = Date.now() / 1000;
            progress.set(e.currentTarget.currentTime / e.currentTarget.duration);
        }
        MEDIA_EVENTS.forEach((event) => media.addEventListener(event, onUpdate));
        return () => {
            MEDIA_EVENTS.forEach((event) => media.removeEventListener(event, onUpdate));
        };
    }, [media, progress]);

    useEffect(() => {
        if (media === null || !playing || disabled) {
            return () => {};
        }
        let handle: number;
        let canceled = false;
        let currentProgress = progress.get();
        let currentUpdateTime = updateTimeRef.current;
        function tick() {
            if (canceled) {
                return;
            }
            const newTime = Date.now() / 1000;
            const newProgress = getNextMediaProgress({
                progress: currentProgress,
                elapsed: newTime - currentUpdateTime,
                duration,
                currentTime: media.currentTime,
                mediaDuration: media.duration,
            });
            updateTimeRef.current = newTime;
            progress.set(newProgress);
            currentUpdateTime = newTime;
            currentProgress = newProgress;
            handle = window.requestAnimationFrame(tick);
        }
        tick();

        return () => {
            canceled = true;
            window.cancelAnimationFrame(handle);
        };
    }, [media, playing, disabled, duration, progress]);

    return progress;
}

export default useMediaProgressSpring;
