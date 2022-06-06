/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useUserInteracted } from '@micromag/core/contexts';
import { useMediaApi, useMediaThumbnail } from '@micromag/core/hooks';
import { getMediaFilesAsArray } from '@micromag/core/utils';
import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.videoMedia,
    thumbnailFile: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    apiRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    initialMuted: PropTypes.oneOf(['auto', true, false]),
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    playsInline: PropTypes.bool,
    preload: PropTypes.oneOf(['auto', 'metadata', 'none', null]),
    shouldLoad: PropTypes.bool,
    withoutCors: PropTypes.bool,
    className: PropTypes.string,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onCanPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onSeeked: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onProgressStep: PropTypes.func,
    onDurationChanged: PropTypes.func,
    onVolumeChanged: PropTypes.func,
    onSuspended: PropTypes.func,
    focusable: PropTypes.bool,
    supportedMimes: PropTypes.arrayOf(PropTypes.string),
    withPoster: PropTypes.bool,
    // onPosterLoaded: PropTypes.func,
};

const defaultProps = {
    media: null,
    thumbnailFile: null,
    width: null,
    height: null,
    apiRef: null,
    initialMuted: 'auto',
    autoPlay: false,
    loop: false,
    playsInline: true,
    preload: 'auto',
    shouldLoad: true,
    withoutCors: false,
    className: null,
    onReady: null,
    onPlay: null,
    onCanPlay: null,
    onPause: null,
    onEnded: null,
    onSeeked: null,
    onTimeUpdate: null,
    onProgressStep: null,
    onDurationChanged: null,
    onVolumeChanged: null,
    onSuspended: null,
    focusable: true,
    supportedMimes: ['video/mp4', 'video/webm', 'video/ogg'],
    withPoster: false,
};

const Video = ({
    media,
    thumbnailFile,
    width,
    height,
    apiRef,
    initialMuted,
    autoPlay,
    loop,
    playsInline,
    preload,
    shouldLoad,
    withoutCors,
    className,
    onReady,
    onPlay,
    onCanPlay,
    onPause,
    onEnded,
    onSeeked,
    onTimeUpdate,
    onProgressStep,
    onDurationChanged,
    onVolumeChanged,
    onSuspended,
    focusable,
    supportedMimes,
    withPoster,
}) => {
    const { url: mediaUrl = null, files = null, metadata = null } = media || {};
    const { description = null, mime: mediaMime = null } = metadata || {};
    const filesArray = useMemo(() => getMediaFilesAsArray(files), [files]);
    const thumbnailUrl = useMediaThumbnail(media, thumbnailFile);

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

    const userInteracted = useUserInteracted();
    const finalInitialMuted =
        initialMuted === true || (initialMuted === 'auto' && autoPlay && !userInteracted);

    const { ref, ...api } = useMediaApi({
        url: !isImageWithoutSourceFile ? mediaUrl : null,
        initialMuted: finalInitialMuted,
        onPlay,
        onCanPlay,
        onPause,
        onEnded,
        onSeeked,
        onTimeUpdate,
        onProgressStep,
        onDurationChanged,
        onVolumeChanged,
        onSuspended,
    });

    if (apiRef !== null) {
        apiRef.current = api;
        apiRef.current.mediaRef = ref;
    }

    const { muted, dataReady, play, pause, unMute } = api;

    useEffect(() => {
        if (dataReady && onReady !== null) {
            onReady();
        }
    }, [dataReady, onReady]);

    const withSize = width !== null && height !== null;

    useEffect(() => {
        if (autoPlay) {
            play();
            if (initialMuted === 'auto' && muted && userInteracted) {
                unMute();
            }
        } else {
            pause();
        }
    }, [autoPlay]);

    // Ensure load if preload value change over time
    const firstPreloadRef = useRef(preload);
    const firstShouldLoadRef = useRef(shouldLoad);
    const hasLoadedRef = useRef(preload !== 'none' && preload !== 'metadata' && shouldLoad);
    useEffect(() => {
        const { current: videoElement = null } = ref;
        const canLoad = preload !== 'none' && preload !== 'metadata' && shouldLoad; // @todo
        const preloadHasChanged = firstPreloadRef.current !== preload;
        const shouldLoadHasChanged = firstShouldLoadRef.current !== shouldLoad;
        if (
            canLoad &&
            (preloadHasChanged || shouldLoadHasChanged) &&
            !hasLoadedRef.current &&
            videoElement !== null &&
            typeof videoElement.load !== 'undefined'
        ) {
            hasLoadedRef.current = true;
            videoElement.load();
        }
    }, [shouldLoad, preload]);

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
                    ref={ref}
                    src={sourceFiles === null || sourceFiles.length === 0 ? mediaUrl : null}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    poster={shouldLoad && withPoster ? thumbnailUrl : null}
                    preload={shouldLoad ? preload : 'none'}
                    playsInline={playsInline}
                    crossOrigin={withoutCors ? 'anonymous' : null}
                    tabIndex={focusable ? '0' : '-1'}
                    className={classNames(styles.video)}
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

export default React.forwardRef((props, ref) => <Video apiRef={ref} {...props} />);
