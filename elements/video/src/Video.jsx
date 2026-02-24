/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign, import/order */
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Spinner } from '@micromag/core/components';
import {
    useMediaCurrentTime,
    useMediaDuration,
    useMediaReady,
    useMediaThumbnail,
    useProgressSteps,
} from '@micromag/core/hooks';

import useSources from './useSources';

import styles from './styles.module.css';

const propTypes = {
    media: MicromagPropTypes.videoMedia,
    thumbnail: PropTypes.oneOf([PropTypes.string, MicromagPropTypes.imageMedia]),
    width: PropTypes.number,
    height: PropTypes.number,
    mediaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    muted: PropTypes.bool,
    autoPlay: PropTypes.bool,
    paused: PropTypes.bool,
    loop: PropTypes.bool,
    playsInline: PropTypes.bool,
    preload: PropTypes.oneOf(['auto', 'metadata', 'none', null]),
    disablePictureInPicture: PropTypes.bool,
    shouldLoad: PropTypes.bool,
    withoutCors: PropTypes.bool,
    className: PropTypes.string,
    innerClassName: PropTypes.string,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onSeeked: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onProgressStep: PropTypes.func,
    onDurationChange: PropTypes.func,
    onVolumeChange: PropTypes.func,
    onSuspend: PropTypes.func,
    onSuspended: PropTypes.func,
    onPlayError: PropTypes.func,
    focusable: PropTypes.bool,
    withPoster: PropTypes.bool,
    withLoading: PropTypes.bool,
};

const Video = ({
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
    focusable = true,
    withPoster = false,
    withLoading = false,
    disablePictureInPicture = true,
}) => {
    const { url: mediaUrl = null, metadata = null } = media || {};
    const { description = null, has_audio: hasAudio = null } = metadata || {};
    const finalThumbnail = useMediaThumbnail(media, thumbnail);
    const { sources, isImage } = useSources(media);
    const isImageWithoutSourceFile = isImage && (sources === null || sources.length === 0);

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

    const finalPreload = shouldLoad ? preload : 'none';

    useEffect(() => {
        const { current: element = null } = ref;
        if (element === null || mediaUrl === null) {
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
                    tabIndex="-1"
                    className={classNames([styles.media, innerClassName])}
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
                    src={sources === null && shouldLoad ? `${mediaUrl}#t=0.001` : null}
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
                    tabIndex={focusable ? '0' : '-1'}
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
};

Video.propTypes = propTypes;

export default React.forwardRef((props, ref) => <Video mediaRef={ref} {...props} />);
