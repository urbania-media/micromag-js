/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useUserInteracted } from '@micromag/core/contexts';
import { useMediaApi } from '@micromag/core/hooks';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.videoMedia,
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
    preload: PropTypes.string,
    withoutCors: PropTypes.bool,
    className: PropTypes.string,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onSeeked: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onProgressStep: PropTypes.func,
    onDurationChanged: PropTypes.func,
    onVolumeChanged: PropTypes.func,
    // onPosterLoaded: PropTypes.func,
};

const defaultProps = {
    media: null,
    width: null,
    height: null,
    apiRef: null,
    initialMuted: 'auto',
    autoPlay: false,
    loop: false,
    playsInline: true,
    preload: undefined,
    withoutCors: false,
    className: null,
    onReady: null,
    onPlay: null,
    onPause: null,
    onEnded: null,
    onSeeked: null,
    onTimeUpdate: null,
    onProgressStep: null,
    onDurationChanged: null,
    onVolumeChanged: null,
    // onPosterLoaded: null,
};

const Video = ({
    media,
    width,
    height,
    apiRef,
    initialMuted,
    autoPlay,
    loop,
    playsInline,
    preload,
    withoutCors,
    className,
    onReady,
    onPlay,
    onPause,
    onEnded,
    onSeeked,
    onTimeUpdate,
    onProgressStep,
    onDurationChanged,
    onVolumeChanged,
    // onPosterLoaded,
}) => {
    const { url = null, files = null } = media || {};
    const hasFiles =
        files !== null && typeof files.h264 !== 'undefined' && typeof files.webm !== 'undefined';
    const mediaUrl = hasFiles ? files.h264.url : url;

    const userInteracted = useUserInteracted();
    const finalInitialMuted = initialMuted === true || (initialMuted === 'auto' && autoPlay && !userInteracted);

    const { ref, ...api } = useMediaApi({
        url: mediaUrl,
        initialMuted: finalInitialMuted,
        onPlay,
        onPause,
        onEnded,
        onSeeked,
        onTimeUpdate,
        onProgressStep,
        onDurationChanged,
        onVolumeChanged,
    });

    if (apiRef !== null) {
        apiRef.current = api;
        apiRef.current.mediaRef = ref;
    }

    const { playing, muted, dataReady, play, pause, unMute } = api;

    useEffect(() => {
        if (dataReady && onReady !== null) {
            onReady();
        }
    }, [dataReady, onReady]);

    const withSize = width !== null && height !== null;
    // const { thumbnail_url: thumbnailUrl = null } = media || {};

    // useEffect(() => {
    //     if (thumbnailUrl !== null) {
    //         const img = new Image();
    //         img.src = thumbnailUrl;
    //         img.onload = () => {
    //             if (onPosterLoaded) {
    //                 onPosterLoaded();
    //             }
    //         };
    //     }
    // }, [thumbnailUrl]);

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

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.paused]: !playing,
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
            <video
                key={mediaUrl}
                ref={ref}
                src={!hasFiles ? mediaUrl : null}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                // poster={thumbnailUrl}
                preload={preload}
                playsInline={playsInline}
                crossOrigin={withoutCors ? 'anonymous' : null}
            >
                {hasFiles ? (
                    <>
                        <source src={files.webm.url} type="video/webm" />
                        <source src={files.h264.url} type="video/mp4" />
                    </>
                ) : null}
            </video>
        </div>
    );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Video apiRef={ref} {...props} />);
