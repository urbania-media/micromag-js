/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign, import/order */
import classNames from 'classnames';
import Hls from 'hls.js';
import isFunction from 'lodash/isFunction';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { ImageMedia, VideoMedia } from '@micromag/core';
import { Spinner } from '@micromag/core/components';
import {
    useMediaCurrentTime,
    useMediaDuration,
    useMediaReady,
    useMediaThumbnail,
    useProgressSteps,
} from '@micromag/core/hooks';
import { getMediaFilesAsArray, getVideoSupportedMimes } from '@micromag/core/utils';

import useSources from './useSources';

import styles from './styles.module.css';

interface VideoProps {
    media?: VideoMedia | null;
    thumbnail?: unknown | null;
    width?: number | null;
    height?: number | null;
    mediaRef?: ((...args: unknown[]) => void | { current?: unknown }) | null;
    muted?: boolean;
    autoPlay?: boolean;
    paused?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    preload?: 'auto' | 'metadata' | 'none' | null;
    disablePictureInPicture?: boolean;
    disableHls?: boolean;
    shouldLoad?: boolean;
    withoutCors?: boolean;
    className?: string | null;
    innerClassName?: string | null;
    onReady?: ((...args: unknown[]) => void) | null;
    onPlay?: ((...args: unknown[]) => void) | null;
    onPause?: ((...args: unknown[]) => void) | null;
    onEnded?: ((...args: unknown[]) => void) | null;
    onSeeked?: ((...args: unknown[]) => void) | null;
    onTimeUpdate?: ((...args: unknown[]) => void) | null;
    onProgressStep?: ((...args: unknown[]) => void) | null;
    onDurationChange?: ((...args: unknown[]) => void) | null;
    onVolumeChange?: ((...args: unknown[]) => void) | null;
    onSuspend?: ((...args: unknown[]) => void) | null;
    onSuspended?: ((...args: unknown[]) => void) | null;
    onPlayError?: ((...args: unknown[]) => void) | null;
    onQualityLevelChange?: ((...args: unknown[]) => void) | null;
    focusable?: boolean;
    withPoster?: boolean;
    withLoading?: boolean;
    qualityStartLevel?: number | null;
}

function Video({
    media = null,
    thumbnail = null,
    width = null,
    height = null,
    mediaRef = null,
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
    onQualityLevelChange = null,
    focusable = true,
    withPoster = false,
    withLoading = false,
    disablePictureInPicture = true,
    disableHls = true,
    qualityStartLevel = null,
}: VideoProps) {
    const { url: mediaUrl = null, metadata = null } = media || {};
    const { description = null, has_audio: hasAudio = null } = metadata || {};
    const { sources, isImage, files } = useSources(media);
    const finalThumbnail = useMediaThumbnail(media, thumbnail);

    const ref = useRef(null);

    const currentTime = useMediaCurrentTime(ref.current, {
        id: mediaUrl,
        disabled: paused || onProgressStep === null,
    });
    const duration = useMediaDuration(ref.current, {
        id: mediaUrl,
    });
    const [showLoading, setShowLoading] = useState(false);
    const ready = useMediaReady(ref.current, {
        id: mediaUrl,
    });

    useEffect(() => {
        let id = null;
        setShowLoading(false);
        if (mediaUrl && withLoading) {
            id = setTimeout(() => {
                setShowLoading(true);
            }, 2000);
        }
        return () => {
            clearTimeout(id);
        };
    }, [mediaUrl, withLoading]);

    const [hlsFailed, setHlsFailed] = useState(false);
    const hlsSources = useMemo(() => {
        if (files.length === 0 || disableHls || !Hls.isSupported() || hlsFailed) {
            return null;
        }
        return files.filter(
            ({ mime = null, name = null }) =>
                mime === 'application/vnd.apple.mpegurl' || (name || '').endsWith('.m3u8'),
        );
    }, [files, disableHls, hlsFailed]);

    const [hlsJs, setHlsJs] = useState(null);
    const [hlsTsOffset, setHlsTsOffset] = useState(0);

    // initialize hls instance if an hls source is provided
    useEffect(() => {
        setHlsTsOffset(0);
        setHlsFailed(false);

        if (!shouldLoad || hlsSources === null || hlsSources.length === 0) {
            setHlsJs(null);
            return;
        }

        const hls = new Hls({
            maxBufferLength: 15, // seconds. prevents loading too much per screen.
            startLevel: qualityStartLevel !== null ? qualityStartLevel : -1,
            enableWorker: true,
            // debug: true,
            // lowLatencyMode: true,
            // backBufferLength: 90,
            // testBandwidth: qualityStartLevel === null,
            // startFragPrefetch: true,
        });

        hls.on(Hls.Events.LEVEL_SWITCHED, (_, { level }) => {
            if (onQualityLevelChange !== null) {
                onQualityLevelChange(level, ref.current);
            }
        });

        hls.on(Hls.Events.ERROR, (_, { fatal: isFatal, type: errorType }) => {
            if (isFatal) {
                switch (errorType) {
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        // automatically try to recover from media errors
                        hls.recoverMediaError();
                        break;
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        // happens when all retries and media options have been exhausted. in that case, fallback to mp4/webm playback
                        setHlsJs(null);
                        setHlsFailed(true);
                        break;
                    default:
                        break;
                }
            }
        });

        // compute hls timestamp offset when we get the first video fragment
        const onHlsBufferAppended = (_, { frag }) => {
            const {
                start: fragStart,
                type: fragType,
                sn: fragSn = null,
                elementaryStreams: { video: videoStream = null },
            } = frag;
            const { startPTS: videoStartPTS = null } = videoStream || {};
            if (fragType === 'main' && fragSn !== 'initSegment' && videoStartPTS !== null) {
                const tOffset = videoStartPTS - fragStart;
                hls.off(Hls.Events.BUFFER_APPENDED, onHlsBufferAppended);
                setHlsTsOffset(tOffset);
            }
        };
        hls.on(Hls.Events.BUFFER_APPENDED, onHlsBufferAppended);

        hls.loadSource(hlsSources[0].url);
        setHlsJs(hls);
    }, [shouldLoad, hlsSources]);

    // attach hls.js when the <video> ref or the hls.js instance is ready
    useEffect(() => {
        if (hlsJs !== null && ref.current !== null) {
            hlsJs.attachMedia(ref.current);
            // if (onQualityLevelChange !== null) {
            //     onQualityLevelChange(hlsJs.currentLevel, ref.current);
            // }
        }

        return () => {
            if (hlsJs !== null) {
                hlsJs.detachMedia();
            }
        };
    }, [hlsJs, ref.current]);

    // cleanup hls.js instance when it is no longer needed
    useEffect(
        () =>
            // teardown func
            () => {
                if (hlsJs !== null) {
                    hlsJs.destroy();
                }
            },
        [hlsJs],
    );

    // handle changes of qualityStartLevel when an hls.js instance exists
    useEffect(() => {
        if (hlsJs !== null) {
            const qualityLevel = qualityStartLevel !== null ? qualityStartLevel : -1;
            hlsJs.startLevel = qualityLevel;
            if (ref.current !== null && ref.current.paused) {
                hlsJs.currentLevel = qualityLevel;
                hlsJs.nextLevel = -1; // force auto quality selection for the next fragment
            }
        }
    }, [qualityStartLevel]);

    const isImageWithoutSourceFile = isImage && (sources === null || sources.length === 0);

    const withSize = width !== null && height !== null;

    useEffect(() => {
        if (duration > 0 && customOnDurationChange !== null) {
            customOnDurationChange(duration);
        }
    }, [duration, customOnDurationChange]);

    const onVolumeChange = useCallback(() => {
        const { current: element = null } = ref;
        if (element === null) {
            return;
        }
        if (customOnVolumeChange !== null) {
            customOnVolumeChange(element.volume);
        }
    }, [customOnVolumeChange]);

    // Manage suspend
    const [isSuspended, setIsSuspended] = useState(false);
    const onPlay = useCallback(
        (e) => {
            if (isSuspended) {
                setIsSuspended(false);
            }
            if (customOnPlay !== null) {
                customOnPlay(e);
            }
        },
        [isSuspended, setIsSuspended, customOnPlay],
    );

    const onPlaying = useCallback(() => {
        if (isSuspended) {
            setIsSuspended(false);
        }
    }, [isSuspended, setIsSuspended]);

    const onSuspend = useCallback(
        (e) => {
            if (e.currentTarget.paused && !paused && !isSuspended) {
                setIsSuspended(true);

                if (onSuspended !== null) {
                    onSuspended();
                }
            }
            if (customOnSuspend !== null) {
                customOnSuspend(e);
            }
        },
        [isSuspended, paused, setIsSuspended, customOnSuspend, onSuspended],
    );

    useEffect(() => {
        if (ready && onReady !== null) {
            onReady();
        }
    }, [ready, onReady]);

    useEffect(() => {
        const { current: element = null } = ref;
        if (element === null) {
            return;
        }
        const { paused: isPaused } = element;

        if (paused && !isPaused) {
            element.pause();
        } else if (!paused && isPaused) {
            element.play().catch((e) => {
                if (onPlayError !== null) {
                    onPlayError(e);
                }
            });
        }
    }, [paused, media, onPlayError]); // test media here for fun

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
                    [className]: className !== null,
                    [styles.withSize]: withSize,
                },
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
                    tabIndex="-1"
                    className={classNames([
                        styles.media,
                        { [innerClassName]: innerClassName !== null },
                    ])}
                />
            ) : null}
            {!isImageWithoutSourceFile ? (
                <video
                    key={mediaUrl}
                    ref={(newRef) => {
                        ref.current = newRef;
                        if (mediaRef !== null && isFunction(mediaRef)) {
                            mediaRef(newRef);
                        } else if (mediaRef !== null) {
                            mediaRef.current = newRef;
                        }
                    }}
                    src={
                        sources === null &&
                        (hlsSources === null || hlsSources.length === 0) &&
                        shouldLoad
                            ? `${mediaUrl}#t=0.001`
                            : null
                    }
                    autoPlay={autoPlay && !paused}
                    loop={loop}
                    muted={muted}
                    poster={
                        shouldLoad && withPoster && finalThumbnail !== null
                            ? finalThumbnail.url || null
                            : null
                    }
                    preload={shouldLoad ? preload : 'none'}
                    playsInline={playsInline}
                    crossOrigin={withoutCors ? 'anonymous' : null}
                    disablePictureInPicture={disablePictureInPicture}
                    tabIndex={focusable ? '0' : '-1'}
                    className={classNames([
                        styles.media,
                        { [innerClassName]: innerClassName !== null },
                    ])}
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
                    data-hls={hlsJs !== null}
                    data-ts-offset={hlsTsOffset}
                    aria-hidden
                >
                    {(shouldLoad && sources !== null ? sources : []).map(
                        ({ url: sourceUrl, mime: sourceMime }) => (
                            <source
                                key={`${sourceUrl}-${sourceMime}`}
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

export default React.forwardRef((props, ref) => <Video mediaRef={ref} {...props} />);
