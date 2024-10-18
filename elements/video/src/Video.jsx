/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign, import/order */
import classNames from 'classnames';
import Hls from 'hls.js';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Spinner } from '@micromag/core/components';
import {
    useMediaCurrentTime,
    useMediaDuration,
    useMediaReady,
    useMediaThumbnail,
    useProgressSteps,
} from '@micromag/core/hooks';
import { getMediaFilesAsArray, getVideoSupportedMimes } from '@micromag/core/utils';

import styles from './styles.module.scss';

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
    disableHls: PropTypes.bool,
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
    onQualityLevelChange: PropTypes.func,
    focusable: PropTypes.bool,
    withPoster: PropTypes.bool,
    withLoading: PropTypes.bool,
    qualityStartLevel: PropTypes.number,
};

const defaultProps = {
    media: null,
    thumbnail: null,
    width: null,
    height: null,
    mediaRef: null,
    muted: false,
    autoPlay: false,
    paused: false,
    loop: false,
    playsInline: true,
    preload: 'auto',
    disablePictureInPicture: true,
    disableHls: true,
    shouldLoad: true,
    withoutCors: false,
    className: null,
    innerClassName: null,
    onReady: null,
    onPlay: null,
    onPause: null,
    onEnded: null,
    onSeeked: null,
    onTimeUpdate: null,
    onProgressStep: null,
    onDurationChange: null,
    onVolumeChange: null,
    onSuspend: null,
    onSuspended: null,
    onPlayError: null,
    onQualityLevelChange: null,
    focusable: true,
    withPoster: false,
    withLoading: false,
    qualityStartLevel: null,
};

const Video = ({
    media,
    thumbnail,
    width,
    height,
    mediaRef,
    muted,
    autoPlay,
    paused,
    loop,
    playsInline,
    preload,
    shouldLoad,
    withoutCors,
    className,
    innerClassName,
    onReady,
    onPlay: customOnPlay,
    onPause,
    onEnded,
    onSeeked,
    onTimeUpdate,
    onProgressStep,
    onDurationChange: customOnDurationChange,
    onVolumeChange: customOnVolumeChange,
    onSuspend: customOnSuspend,
    onSuspended,
    onPlayError,
    onQualityLevelChange,
    focusable,
    withPoster,
    withLoading,
    disablePictureInPicture,
    disableHls,
    qualityStartLevel,
}) => {
    const { url: mediaUrl = null, files = null, metadata = null } = media || {};
    const {
        description = null,
        mime: mediaMime = null,
        has_audio: hasAudio = null,
    } = metadata || {};
    const filesArray = useMemo(() => getMediaFilesAsArray(files), [files]);
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
        if (filesArray.length === 0 || disableHls || !Hls.isSupported() || hlsFailed) {
            return null;
        }
        return filesArray.filter(
            ({ mime = null, name = null }) =>
                mime === 'application/vnd.apple.mpegurl' || (name || '').endsWith('.m3u8'),
        );
    }, [filesArray, disableHls, hlsFailed]);

    const [hlsJs, setHlsJs] = useState(null);
    const [hlsTsOffset, setHlsTsOffset] = useState(0);

    // initialize hls instance if an hls source is provided
    useEffect(() => {
        setHlsTsOffset(0);
        setHlsFailed(false);

        if (!shouldLoad || ref.current === null || hlsSources === null || hlsSources.length === 0) {
            setHlsJs(null);
            return;
        }

        const hls = new Hls({
            maxBufferLength: 15, // seconds. prevents loading too much per screen.
            startLevel: qualityStartLevel !== null ? qualityStartLevel : -1,
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
    }, [shouldLoad, hlsSources, ref]);

    // attach hls.js when the <video> ref is ready
    useEffect(() => {
        if (hlsJs !== null && ref.current !== null) {
            hlsJs.attachMedia(ref.current);
        }

        return () => {
            if (hlsJs !== null) {
                hlsJs.detachMedia();
                hlsJs.destroy();
            }
        };
    }, [hlsJs, ref.current]);

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

    const sourceFiles = useMemo(() => {
        if (filesArray.length === 0 || (hlsSources !== null && hlsSources.length > 0)) {
            return null;
        }
        const supportedMimes = getVideoSupportedMimes();
        if (supportedMimes.length === 0) {
            return null;
        }
        const sourceFilesMap = filesArray
            .filter((file) => {
                const fileHandle = file.handle || file.id;
                const { mime = `video/${fileHandle === 'h264' ? 'mp4' : fileHandle}` } = file;
                return supportedMimes.indexOf(mime) !== -1;
            })
            .reduce((filesMap, file) => {
                const fileHandle = file.handle || file.id;
                const { mime = `video/${fileHandle === 'h264' ? 'mp4' : fileHandle}` } = file;
                const currentMimeFile = filesMap[mime] || null;
                const { id: currentId = null, handle: currentHandle = null } =
                    currentMimeFile || {};
                const currentMimeHandle = currentHandle || currentId;
                return currentMimeFile === null || currentMimeHandle === 'original'
                    ? {
                          ...filesMap,
                          [mime]: file,
                      }
                    : filesMap;
            }, {});
        return Object.keys(sourceFilesMap).map((mime) => sourceFilesMap[mime]);
    }, [filesArray, hlsSources]);

    // @NOTE: Media is an animated image and doesn't have source files in video formats
    const { type: originalType = null, mime: originalMime = mediaMime } =
        filesArray.find(({ handle }) => handle === 'original') || {};
    const originalFileIsImage =
        originalType === 'image' || (originalMime !== null && originalMime.indexOf('image/') === 0);
    const isImageWithoutSourceFile =
        originalFileIsImage && (sourceFiles === null || sourceFiles.length === 0);

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
                        (sourceFiles === null || sourceFiles.length === 0) &&
                        (hlsSources === null || hlsSources.length === 0)
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
                    {(sourceFiles || []).map(({ url: sourceUrl, mime: sourceMime }) => (
                        <source
                            key={`${sourceUrl}-${sourceMime}`}
                            src={sourceUrl !== null ? `${sourceUrl}#t=0.001` : null}
                            type={sourceMime}
                        />
                    ))}
                </video>
            ) : null}
            {!isImageWithoutSourceFile && !ready && showLoading ? (
                <Spinner className={styles.spinner} />
            ) : null}
        </div>
    );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Video mediaRef={ref} {...props} />);
