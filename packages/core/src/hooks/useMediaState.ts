import createDebug from 'debug';
import { useEffect, useState } from 'react';

import { getMediaIsBuffering, getMediaIsMuted, getMediaIsPlaying, getMediaSrc } from '../utils';

import { MediaElement } from '../types';

function useMediaState(
    media: MediaElement | null = null,
    { playing: wantedPlaying = false, muted: wantedMuted = false } = {},
) {
    const [currentMediaElement, setCurrentMediaElement] = useState(media);
    const [src, setSrc] = useState(() => getMediaSrc(media));
    const [playing, setPlaying] = useState(() => getMediaIsPlaying(media) || wantedPlaying);
    const [buffering, setBuffering] = useState(false);
    const [muted, setMuted] = useState(() => getMediaIsMuted(media) || wantedMuted);
    const mediaKey =
        src !== null ? src.split('/')[src.split('/').length - 1].split('#')[0] || null : null;
    const debug = createDebug(mediaKey !== null ? `micromag:media:${mediaKey}` : 'micromag:media');
    if (media !== currentMediaElement) {
        setPlaying(getMediaIsPlaying(media) || wantedPlaying);
        setBuffering(false);
        setMuted(getMediaIsMuted(media) || wantedMuted);
        setCurrentMediaElement(media);
        setSrc(getMediaSrc(media));
        debug('Unset media: %o', { wantedPlaying, wantedMuted });
    }

    useEffect(() => {
        debug('State change %o', { playing, buffering, muted });
    }, [playing, buffering, muted, debug]);

    useEffect(() => {
        if (media === null) {
            return () => {};
        }
        function onBufferingEvent(e) {
            // networkstate
            if (e.currentTarget.networkState === e.currentTarget.NETWORK_LOADING) {
                debug('onBufferingEvent: NETWORK_LOADING');
            } else if (e.currentTarget.readyState < e.currentTarget.HAVE_FUTURE_DATA) {
                debug('onBufferingEvent: HAVE_FUTURE_DATA');
            }

            setBuffering(getMediaIsBuffering(e.currentTarget));
        }

        let timeUpdated = false;
        function onPlay() {
            timeUpdated = false;
            debug('onPlay');
            setPlaying(true);
            setBuffering(false);
        }

        function onPlaying() {
            timeUpdated = false;
            debug('onPlaying');
            setPlaying(true);
            setBuffering(false);
        }

        function onTimeUpdate(e) {
            if (!timeUpdated) {
                debug('onTimeUpdate');
                timeUpdated = true;
            }
            setPlaying(true);
            setBuffering(false);
        }

        function onPause() {
            timeUpdated = false;
            debug('onPause');
            setPlaying(false);
            setBuffering(false);
        }

        function onEnded() {
            timeUpdated = false;
            debug('onEnded');
            setPlaying(false);
            setBuffering(false);
        }
        function onSuspend(e) {
            timeUpdated = false;
            debug('onSuspend');
            setPlaying(getMediaIsPlaying(e.currentTarget));
            setBuffering(getMediaIsBuffering(e.currentTarget));
        }
        function onVolumeChange(e) {
            debug('onVolumeChange');
            setMuted(getMediaIsMuted(e.currentTarget));
        }

        function onLoadChange(e) {
            debug('onLoadChange %s', e.type);
            setSrc(getMediaSrc(e.currentTarget));
            setBuffering(getMediaIsBuffering(e.currentTarget));
        }

        media.addEventListener('canplay', onLoadChange);
        media.addEventListener('loadstart', onLoadChange);
        media.addEventListener('loadeddata', onLoadChange);
        media.addEventListener('loadedmetadata', onLoadChange);
        media.addEventListener('waiting', onBufferingEvent);
        media.addEventListener('stalled', onBufferingEvent);
        media.addEventListener('timeupdate', onTimeUpdate);
        media.addEventListener('play', onPlay);
        media.addEventListener('playing', onPlaying);
        media.addEventListener('pause', onPause);
        media.addEventListener('suspend', onSuspend);
        media.addEventListener('ended', onEnded);
        media.addEventListener('volumechange', onVolumeChange);
        return () => {
            media.removeEventListener('canplay', onLoadChange);
            media.removeEventListener('loadstart', onLoadChange);
            media.removeEventListener('loadeddata', onLoadChange);
            media.removeEventListener('loadedmetadata', onLoadChange);
            media.removeEventListener('waiting', onBufferingEvent);
            media.removeEventListener('stalled', onBufferingEvent);
            media.removeEventListener('timeupdate', onTimeUpdate);
            media.removeEventListener('play', onPlay);
            media.removeEventListener('playing', onPlaying);
            media.removeEventListener('pause', onPause);
            media.removeEventListener('suspend', onSuspend);
            media.removeEventListener('ended', onEnded);
            media.removeEventListener('volumechange', onVolumeChange);
        };
    }, [media, debug, src]);

    return { playing, muted, buffering };
}

export default useMediaState;
