import createDebug from 'debug';
import { useEffect, useMemo, useState } from 'react';

const useMediaState = (
    mediaElement: HTMLMediaElement | null = null,
    { playing: wantedPlaying = false, muted: wantedMuted = false } = {},
) => {
    const src = mediaElement !== null ? mediaElement.currentSrc || mediaElement.src : null;
    const debug = useMemo(() => {
        const mediaKey =
            src !== null ? src.split('/')[src.split('/').length - 1].split('#')[0] || null : null;
        return createDebug(mediaKey !== null ? `micromag:media:${mediaKey}` : 'micromag:media');
    }, [src]);
    const [playing, setPlaying] = useState(wantedPlaying);
    const [buffering, setBuffering] = useState(false);
    const [muted, setMuted] = useState(
        (mediaElement !== null && (mediaElement.muted || mediaElement.volume === 0)) || wantedMuted,
    );

    useEffect(() => {
        debug('State change %o', { playing, buffering, muted });
    }, [playing, buffering, muted, debug]);

    useEffect(() => {
        if (mediaElement === null) {
            setPlaying(wantedPlaying);
            setBuffering(false);
            setMuted(wantedMuted);
            debug('Unset media: %o', { wantedPlaying, wantedMuted });
        }
    }, [mediaElement, src, debug, wantedPlaying, wantedMuted]);

    useEffect(() => {
        if (mediaElement === null) {
            return () => {};
        }
        function onBufferingEvent(e) {
            // networkstate
            if (
                mediaElement !== null &&
                mediaElement.networkState === mediaElement.NETWORK_LOADING
            ) {
                debug('onBufferingEvent: NETWORK_LOADING');
                setBuffering(true);
            }

            // readystate
            if (mediaElement !== null && mediaElement.readyState < mediaElement.HAVE_FUTURE_DATA) {
                debug('onBufferingEvent: HAVE_FUTURE_DATA');
                setBuffering(true);
            }
        }

        function onPlay() {
            debug('onPlay');
            setPlaying(true);
            setBuffering(false);
        }

        function onPlaying() {
            debug('onPlaying');
            setPlaying(true);
            setBuffering(false);
        }

        function onTimeUpdate(e) {
            debug('onTimeUpdate');
            setPlaying(!e.currentTarget.paused && !e.currentTarget.ended);
            setBuffering(false);
        }

        function onPause() {
            debug('onPause');
            setPlaying(false);
            setBuffering(false);
        }

        function onEnded() {
            debug('onEnded');
            setPlaying(false);
            setBuffering(false);
        }
        function onSuspend(e) {
            debug('onSuspend');
            setPlaying(!e.currentTarget.paused && !e.currentTarget.ended);
            setBuffering(false);
        }
        function onVolumeChange() {
            setMuted(mediaElement.muted || mediaElement.volume === 0);
        }

        if (mediaElement.paused || mediaElement.ended) {
            setPlaying(false);
        }

        if (muted !== mediaElement.muted) {
            setMuted(mediaElement.muted);
        }

        mediaElement.addEventListener('waiting', onBufferingEvent);
        mediaElement.addEventListener('stalled', onBufferingEvent);
        mediaElement.addEventListener('timeupdate', onTimeUpdate);
        mediaElement.addEventListener('play', onPlay);
        mediaElement.addEventListener('playing', onPlaying);
        mediaElement.addEventListener('pause', onPause);
        mediaElement.addEventListener('suspend', onSuspend);
        mediaElement.addEventListener('ended', onEnded);
        mediaElement.addEventListener('volumechange', onVolumeChange);
        return () => {
            mediaElement.removeEventListener('waiting', onBufferingEvent);
            mediaElement.removeEventListener('stalled', onBufferingEvent);
            mediaElement.removeEventListener('timeupdate', onTimeUpdate);
            mediaElement.removeEventListener('play', onPlay);
            mediaElement.removeEventListener('playing', onPlaying);
            mediaElement.removeEventListener('pause', onPause);
            mediaElement.removeEventListener('suspend', onSuspend);
            mediaElement.removeEventListener('ended', onEnded);
            mediaElement.removeEventListener('volumechange', onVolumeChange);
        };
    }, [mediaElement, debug, src]);

    return { playing, muted, buffering };
};

export default useMediaState;
