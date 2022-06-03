/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    useMediaThumbnail,
    useMediaCurrentTime,
    useMediaDuration,
    useMediaReady,
    useProgressSteps,
    useMediaLoad,
} from '@micromag/core/hooks';
import { getMediaFilesAsArray } from '@micromag/core/utils';

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
    shouldLoad: PropTypes.bool,
    withoutCors: PropTypes.bool,
    className: PropTypes.string,
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
    focusable: PropTypes.bool,
    supportedMimes: PropTypes.arrayOf(PropTypes.string),
    withPoster: PropTypes.bool,
    // onPosterLoaded: PropTypes.func,
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
    shouldLoad: true,
    withoutCors: false,
    className: null,
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
    focusable: true,
    supportedMimes: ['video/mp4', 'video/webm', 'video/ogg'],
    withPoster: false,
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
    onReady,
    onPlay,
    onPause,
    onEnded,
    onSeeked,
    onTimeUpdate,
    onProgressStep,
    onDurationChange: customOnDurationChange,
    onVolumeChange: customOnVolumeChange,
    onSuspend,
    focusable,
    supportedMimes,
    withPoster,
}) => {
    const { url: mediaUrl = null, files = null, metadata = null } = media || {};
    const { description = null, mime: mediaMime = null } = metadata || {};
    const filesArray = useMemo(() => getMediaFilesAsArray(files), [files]);
    const thumbnailUrl = useMediaThumbnail(media, thumbnail);

    const ref = useRef(null);
    const currentTime = useMediaCurrentTime(ref.current, {
        id: mediaUrl,
        disabled: paused || onProgressStep === null,
    });
    const duration = useMediaDuration(ref.current, {
        id: mediaUrl,
    });
    const ready = useMediaReady(ref.current, {
        id: mediaUrl,
    });
    useMediaLoad(ref.current, {
        preload,
        shouldLoad,
    });

    // Get source files with supported mimes
    const sourceFiles = useMemo(() => {
        if (filesArray.length === 0) {
            return null;
        }
        const supportVideo = document.createElement('video');
        const finalSupportedMimes = supportedMimes.filter(
            (mime) => supportVideo.canPlayType(mime) !== '',
        );
        if (finalSupportedMimes.length === 0) {
            return null;
        }
        const sourceFilesMap = filesArray
            .filter((file) => {
                const { mime = `video/${file.id === 'h264' ? 'mp4' : file.id}` } = file;
                return finalSupportedMimes.indexOf(mime) !== -1;
            })
            .reduce((filesMap, file) => {
                const { mime = `video/${file.id === 'h264' ? 'mp4' : file.id}` } = file;
                const currentMimeFile = filesMap[mime] || null;
                const { id: currentMimeId = null } = currentMimeFile || {};
                return currentMimeFile === null || currentMimeId !== 'original'
                    ? {
                          ...filesMap,
                          [mime]: file,
                      }
                    : filesMap;
            }, {});
        return Object.keys(sourceFilesMap).map((mime) => sourceFilesMap[mime]);
    }, [filesArray, supportedMimes]);

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

    // Ensure load if preload value change over time
    const firstPreloadRef = useRef(preload);
    const firstShouldLoadRef = useRef(shouldLoad);
    const hasLoadedRef = useRef(preload !== 'none' && preload !== 'metadata' && shouldLoad);
    useEffect(() => {
        const { current: element = null } = ref;
        const canLoad = preload !== 'none' && preload !== 'metadata' && shouldLoad; // @todo
        const preloadHasChanged = firstPreloadRef.current !== preload;
        const shouldLoadHasChanged = firstShouldLoadRef.current !== shouldLoad;
        if (
            canLoad &&
            (preloadHasChanged || shouldLoadHasChanged) &&
            !hasLoadedRef.current &&
            element !== null &&
            typeof element.load !== 'undefined'
        ) {
            hasLoadedRef.current = true;
            element.load();
        }
    }, [shouldLoad, preload]);

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
            element.play();
        }
    }, [paused]);

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
                <img src={mediaUrl} alt={description} className={styles.video} />
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
                    src={sourceFiles === null || sourceFiles.length === 0 ? mediaUrl : null}
                    autoPlay={autoPlay && !paused}
                    loop={loop}
                    muted={muted}
                    poster={shouldLoad && withPoster ? thumbnailUrl : null}
                    preload={shouldLoad ? preload : 'none'}
                    playsInline={playsInline}
                    crossOrigin={withoutCors ? 'anonymous' : null}
                    tabIndex={focusable ? '0' : '-1'}
                    className={classNames(styles.video)}
                    onPlay={onPlay}
                    onPause={onPause}
                    onEnded={onEnded}
                    onSeeked={onSeeked}
                    onVolumeChange={onVolumeChange}
                    onTimeUpdate={onTimeUpdate}
                    onSuspend={onSuspend}
                >
                    {(sourceFiles || []).map(({ url: sourceUrl, mime: sourceMime }) => (
                        <source
                            key={`${sourceUrl}-${sourceMime}`}
                            src={sourceUrl}
                            type={sourceMime}
                        />
                    ))}
                </video>
            ) : null}
        </div>
    );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Video mediaRef={ref} {...props} />);
