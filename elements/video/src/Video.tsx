import classNames from 'classnames';
import { ForwardedRef, HTMLAttributes, useEffect, useRef, useState } from 'react';

import type { ImageMedia, VideoMedia } from '@micromag/core';
import { Spinner } from '@micromag/core/components';
import {
    useMediaCurrentTime,
    useMediaDuration,
    useMediaReady,
    useProgressSteps,
} from '@micromag/core/hooks';
import { getMediaIsPlaying, getMediaThumbnail, mergeRefs } from '@micromag/core/utils';

import useSources from './useSources';

import styles from './styles.module.css';

function resetForcePlaying(element: HTMLVideoElement) {
    if (element.dataset.forcePlaying === 'true') {
        element.dataset.forcePlaying = 'false';
    }
}

interface VideoProps extends HTMLAttributes<HTMLVideoElement> {
    media?: VideoMedia | null;
    thumbnail?: ImageMedia | null;
    width?: number | null;
    height?: number | null;
    ref?: ForwardedRef<HTMLVideoElement> | null;
    mediaRef?: ForwardedRef<HTMLVideoElement> | null;
    muted?: boolean;
    autoPlay?: boolean;
    paused?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    preload?: 'auto' | 'metadata' | 'none' | null;
    disablePictureInPicture?: boolean;
    shouldLoad?: boolean;
    withoutCors?: boolean;
    className?: string | null;
    innerClassName?: string | null;
    onReady?: ((...args: unknown[]) => void) | null;
    onSeeked?: ((...args: unknown[]) => void) | null;
    onProgressStep?: ((...args: unknown[]) => void) | null;
    onDurationChange?: ((...args: unknown[]) => void) | null;
    onVolumeChange?: ((...args: unknown[]) => void) | null;
    onSuspended?: ((...args: unknown[]) => void) | null;
    onPlayError?: ((...args: unknown[]) => void) | null;
    focusable?: boolean;
    withPoster?: boolean;
    withLoading?: boolean;
}

function Video({
    media = null,
    thumbnail = null,
    width = null,
    height = null,
    mediaRef = null,
    ref: externalRef = null,
    muted = false,
    autoPlay = false,
    paused = false,
    loop = false,
    playsInline = true,
    preload = 'auto',
    shouldLoad = true,
    withoutCors = false,
    className = null,
    innerClassName = null,
    onReady = null,
    onPlay: customOnPlay = null,
    onPlaying: customOnPlaying = null,
    onPause = null,
    onEnded = null,
    onSeeked = null,
    onTimeUpdate = null,
    onProgressStep = null,
    onDurationChange: customOnDurationChange = null,
    onVolumeChange: customOnVolumeChange = null,
    onSuspend: customOnSuspend = null,
    onSuspended = null,
    onPlayError = null,
    focusable = true,
    withPoster = false,
    withLoading = false,
    disablePictureInPicture = true,
}: VideoProps) {
    const { url: mediaUrl = null, metadata = null } = media || {};
    const { description = null, has_audio: hasAudio = null } = metadata || {};
    const finalThumbnail = getMediaThumbnail(media, thumbnail);
    const { sources, isImage } = useSources(media);
    // console.log('media', media, sources, isImage);

    const isImageWithoutSourceFile = isImage && (sources === null || sources.length === 0);

    const ref = useRef<HTMLVideoElement | null>(null);
    const [mediaElement, setMediaElement] = useState<HTMLVideoElement | null>(null);

    const currentTime = useMediaCurrentTime(mediaElement, {
        id: mediaUrl,
        disabled: paused || onProgressStep === null,
    });
    const duration = useMediaDuration(mediaElement, {
        id: mediaUrl,
    });
    const [showLoading, setShowLoading] = useState(false);
    const ready = useMediaReady(mediaElement, {
        id: mediaUrl,
    });

    useEffect(() => {
        const { current: element = null } = ref;
        setMediaElement(element);
    }, [isImageWithoutSourceFile, mediaUrl, ref]);

    useEffect(() => {
        if (mediaUrl === null || !withLoading) {
            return () => {};
        }
        setShowLoading(false);
        const id = setTimeout(() => {
            setShowLoading(true);
        }, 2000);
        return () => {
            clearTimeout(id);
        };
    }, [mediaUrl, withLoading]);

    const withSize = width !== null && height !== null;

    useEffect(() => {
        if (duration > 0 && customOnDurationChange !== null) {
            customOnDurationChange(duration);
        }
    }, [duration, customOnDurationChange]);

    const onVolumeChange = (e) => {
        if (customOnVolumeChange !== null) {
            customOnVolumeChange(e.currentTarget.volume);
        }
    };

    // Manage suspend
    const [isSuspended, setIsSuspended] = useState(false);
    const onPlay = (e) => {
        if (isSuspended) {
            setIsSuspended(false);
        }
        if (customOnPlay !== null) {
            customOnPlay(e);
        }
    };

    const onPlaying = (e) => {
        if (isSuspended) {
            setIsSuspended(false);
        }
        if (customOnPlaying !== null) {
            customOnPlaying(e);
        }
    };

    const onSuspend = (e) => {
        if (e.currentTarget.paused && !paused && !isSuspended) {
            setIsSuspended(true);

            if (onSuspended !== null) {
                onSuspended();
            }
        }
        if (customOnSuspend !== null) {
            customOnSuspend(e);
        }
    };

    useEffect(() => {
        if (ready && onReady !== null) {
            onReady();
        }
    }, [ready, onReady]);

    const finalPreload = shouldLoad ? preload : 'none';
    const [wasPreloaded, setWasPreloaded] = useState(
        finalPreload === 'auto' || finalPreload === 'metadata',
    );

    useEffect(() => {
        const { current: element = null } = ref;
        if (shouldLoad && !wasPreloaded && element !== null) {
            try {
                element.load();
            } catch {}
            setWasPreloaded(true);
        }
    }, [shouldLoad, wasPreloaded]);

    useEffect(() => {
        const { current: element = null } = ref;
        if (element === null || mediaUrl === null) {
            return;
        }
        const isPlaying = getMediaIsPlaying(element);
        if (paused && isPlaying) {
            element.pause();
        } else if (!paused && !isPlaying && element.dataset.forcePlaying !== 'true') {
            element.play().catch((e) => {
                if (onPlayError !== null) {
                    onPlayError(e);
                }
            });
        }
        resetForcePlaying(element);
    }, [paused, media, mediaUrl, onPlayError]);

    useProgressSteps({
        currentTime,
        duration,
        disabled: paused,
        onStep: onProgressStep,
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withSize]: withSize,
                },
                className,
            ])}
            style={
                withSize
                    ? {
                          width,
                          height,
                      }
                    : null
            }
        >
            {isImageWithoutSourceFile && shouldLoad ? (
                <img
                    src={mediaUrl}
                    alt={description}
                    tabIndex={-1}
                    className={classNames([styles.media, innerClassName])}
                />
            ) : null}
            {!isImageWithoutSourceFile ? (
                <video
                    key={mediaUrl}
                    ref={mergeRefs(ref, mediaRef, externalRef)}
                    src={sources === null && shouldLoad ? `${mediaUrl}#t=0.001` : undefined}
                    autoPlay={autoPlay && !paused}
                    loop={loop}
                    muted={muted}
                    poster={
                        shouldLoad && withPoster && finalThumbnail !== null
                            ? finalThumbnail.url || null
                            : null
                    }
                    preload={finalPreload}
                    playsInline={playsInline}
                    crossOrigin={withoutCors ? 'anonymous' : null}
                    disablePictureInPicture={disablePictureInPicture}
                    tabIndex={focusable ? 0 : -1}
                    className={classNames([styles.media, innerClassName])}
                    onPlay={onPlay}
                    onPlaying={onPlaying}
                    onPause={onPause}
                    onEnded={onEnded}
                    onSeeked={onSeeked}
                    onVolumeChange={onVolumeChange}
                    onTimeUpdate={onTimeUpdate}
                    onSuspend={onSuspend}
                    data-has-audio={hasAudio}
                    data-is-suspended={isSuspended}
                    aria-hidden
                >
                    {(shouldLoad && sources !== null ? sources : []).map(
                        ({ url: sourceUrl, mime: sourceMime }) => (
                            <source
                                key={`source-${sourceUrl}-${sourceMime}`}
                                src={sourceUrl !== null ? `${sourceUrl}#t=0.001` : null}
                                type={sourceMime}
                            />
                        ),
                    )}
                </video>
            ) : null}
            {!isImageWithoutSourceFile && !ready && showLoading ? (
                <Spinner className={styles.spinner} />
            ) : null}
        </div>
    );
}

export default Video;
