/* eslint-disable no-param-reassign */

/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo, Transitions, ScreenElement, Empty } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerNavigation,
} from '@micromag/core/contexts';
import { useTrackScreenMedia, useLongPress } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';
import MediaControls from '@micromag/element-media-controls';
import Video from '@micromag/element-video';
import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['middle', 'full']),
    video: MicromagPropTypes.videoElement,
    gotoNextScreenOnEnd: PropTypes.bool,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    spacing: PropTypes.number,
    getMediaRef: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    video: null,
    gotoNextScreenOnEnd: false,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    spacing: 20,
    getMediaRef: null,
    className: null,
};

const VideoScreen = ({
    layout,
    video,
    gotoNextScreenOnEnd,
    background,
    callToAction,
    current,
    active,
    transitions,
    spacing,
    getMediaRef,
    className,
}) => {
    const trackScreenMedia = useTrackScreenMedia('video');

    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { gotoNextScreen } = useViewerNavigation();
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;
    const videoShouldLoad = current || active || !isView;
    const shouldGotoNextScreenOnEnd = gotoNextScreenOnEnd && isView && current;

    const apiRef = useRef();
    const {
        togglePlay,
        toggleMute,
        seek,
        play,
        pause,
        mediaRef: apiMediaRef = null,
    } = apiRef.current || {};

    useEffect(() => {
        if (apiMediaRef !== null && getMediaRef !== null) {
            getMediaRef(apiMediaRef.current);
        }
    }, [apiMediaRef, getMediaRef]);

    const mouseMoveRef = useRef(null);
    const [showMediaControls, setShowMediaControls] = useState(false);

    // Get api state updates from callback
    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const onTimeUpdate = useCallback(
        (time) => {
            setCurrentTime(time);
        },
        [setDuration, duration],
    );

    const onProgressStep = useCallback(
        (step) => {
            trackScreenMedia(video, `progress_${Math.round(step * 100, 10)}%`);
        },
        [trackScreenMedia, video],
    );

    const onDurationChanged = useCallback(
        (dur) => {
            setDuration(dur);
        },
        [setDuration],
    );

    const onPlay = useCallback(
        ({ initial }) => {
            setPlaying(true);
            trackScreenMedia(video, initial ? 'play' : 'resume');
        },
        [trackScreenMedia, video],
    );

    const onPause = useCallback(
        ({ midway }) => {
            setPlaying(false);
            trackScreenMedia(video, midway ? 'pause' : 'ended');
        },
        [trackScreenMedia, video],
    );

    const onVolumeChanged = useCallback(
        (isMuted) => {
            setMuted(isMuted);
            trackScreenMedia(video, isMuted ? 'mute' : 'unmute');
        },
        [trackScreenMedia, video],
    );

    const onSeeked = useCallback(
        (time) => {
            if (time > 0) {
                trackScreenMedia(video, 'seek');
            }
        },
        [trackScreenMedia, video],
    );

    const onToggleMute = useCallback(() => {
        if (muted && !playing) {
            play();
        }
        toggleMute();
    }, [muted, toggleMute]);

    const onEnded = useCallback(() => {
        if (shouldGotoNextScreenOnEnd) {
            gotoNextScreen();
        }
    }, [shouldGotoNextScreenOnEnd, seek, gotoNextScreen]);

    useEffect(() => {
        if (!current && playing) {
            pause();
        }
    }, [playing, current]);

    const onMouseMove = useCallback(() => {
        setShowMediaControls(true);
        if (mouseMoveRef.current !== null) {
            clearTimeout(mouseMoveRef.current);
        }
        mouseMoveRef.current = setTimeout(() => {
            setShowMediaControls(false);
            mouseMoveRef.current = null;
        }, 1800);
    }, [setShowMediaControls]);

    // ------------------------------------

    const longPressBind = useLongPress({ onLongPress: togglePlay, onClick: onMouseMove });

    const fullscreen = layout === 'full';

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const hasVideo = video !== null;
    const [ready, setReady] = useState(hasVideo); // useState(!hasVideo);
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    // get resized video style props
    const {
        autoPlay = true,
        media: videoMedia = null,
        closedCaptions = null,
        withSeekBar = false,
        withPlayPause = false,
        withTime = false,
    } = video || {};

    const finalVideo = useMemo(
        () =>
            hasVideo
                ? {
                      ...video,
                      autoPlay: !isPreview && !isStatic && !isCapture && autoPlay && current,
                  }
                : null,
        [hasVideo, video, isPreview, isStatic, isCapture, autoPlay, current],
    );

    const {
        metadata: videoMetadata = null,
        url: videoUrl = null,
        thumbnail_url: thumbnailUrl = null,
    } = videoMedia || {};
    const hasVideoUrl = videoUrl !== null;

    // const hasThumbnail = thumbnailUrl !== null;
    // const [posterReady, setPosterReady] = useState(!hasThumbnail);

    const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};

    const { width: resizedVideoWidth, height: resizedVideoHeight } = getSizeWithinBounds(
        videoWidth,
        videoHeight,
        width,
        height,
        { cover: fullscreen },
    );
    const resizedVideoLeft = -(resizedVideoWidth - width) / 2;
    const resizedVideoTop = -(resizedVideoHeight - height) / 2;

    const placeholderProps = fullscreen ? { width: '100%', height: '100%' } : { width: '100%' };

    useEffect(() => {
        setReady(!hasVideoUrl);
    }, [videoUrl, hasVideoUrl, setReady]);

    // useEffect(() => {
    //     setPosterReady(!hasThumbnail);
    // }, [thumbnailUrl, hasThumbnail, setPosterReady]);

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    // const onPosterLoaded = useCallback(() => {
    //     setPosterReady(true);
    // }, [isStatic, isCapture, setPosterReady]);

    const items = [
        <ScreenElement
            key="video"
            placeholder={<PlaceholderVideo className={styles.placeholder} {...placeholderProps} />}
            empty={
                <div className={styles.emptyContainer}>
                    <Empty className={styles.empty}>
                        <FormattedMessage defaultMessage="Video" description="Video placeholder" />
                    </Empty>
                </div>
            }
            isEmpty={!hasVideoUrl}
        >
            {hasVideoUrl ? (
                <div
                    className={styles.videoContainer}
                    style={{
                        width: resizedVideoWidth,
                        height: resizedVideoHeight,
                        left: resizedVideoLeft,
                        top: resizedVideoTop,
                    }}
                >
                    {/* <Transitions
                        playing={transitionPlaying}
                        transitions={transitions}
                        disabled={transitionDisabled}
                    > */}
                    {isPreview || isCapture ? (
                        <Image
                            className={styles.image}
                            media={{
                                url: thumbnailUrl,
                                metadata: { width: videoWidth, height: videoHeight },
                            }}
                            width="100%"
                            height="100%"
                        />
                    ) : (
                        <Video
                            {...finalVideo}
                            ref={apiRef}
                            className={styles.video}
                            onReady={onVideoReady}
                            onPlay={onPlay}
                            onPause={onPause}
                            onTimeUpdate={onTimeUpdate}
                            onProgressStep={onProgressStep}
                            onDurationChanged={onDurationChanged}
                            onSeeked={onSeeked}
                            onEnded={onEnded}
                            onVolumeChanged={onVolumeChanged}
                            focusable={current && isView}
                            preload={videoShouldLoad ? 'auto' : 'metadata'}
                            // onPosterLoaded={onPosterLoaded}
                        />
                    )}
                    {/* </Transitions> */}
                </div>
            ) : null}
        </ScreenElement>,
        !isPlaceholder ? (
            <div key="bottom-content" className={styles.bottomContent}>
                <Transitions
                    playing={transitionPlaying}
                    transitions={transitions}
                    disabled={transitionDisabled}
                >
                    {closedCaptions !== null && !isPreview && !isCapture && !isStatic ? (
                        <ClosedCaptions
                            className={styles.closedCaptions}
                            media={closedCaptions}
                            currentTime={currentTime}
                        />
                    ) : null}
                    {hasVideoUrl ? (
                        <MediaControls
                            className={classNames([
                                styles.mediaControls,
                                {
                                    [styles.visible]: showMediaControls,
                                },
                            ])}
                            withSeekBar={withSeekBar}
                            withPlayPause={withPlayPause}
                            withTime={withTime}
                            playing={playing}
                            muted={muted}
                            currentTime={currentTime}
                            duration={duration}
                            onTogglePlay={togglePlay}
                            onToggleMute={onToggleMute}
                            onSeek={seek}
                            focusable={current && isView}
                        />
                    ) : null}
                    {hasCallToAction ? (
                        <div style={{ marginTop: -spacing }}>
                            <CallToAction
                                callToAction={callToAction}
                                animationDisabled={isPreview}
                                focusable={current && isView}
                            />
                        </div>
                    ) : null}
                </Transitions>
            </div>
        ) : null,
    ];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.fullscreen]: fullscreen,
                },
            ])}
            data-screen-ready={isStatic || isCapture /* && posterReady */ || ready}
            {...longPressBind}
            onMouseMove={onMouseMove}
        >
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                    shouldLoad={backgroundShouldLoad}
                />
            ) : null}
            <Container width={width} height={height}>
                <div className={styles.content}>{items}</div>
            </Container>
        </div>
    );
};

VideoScreen.propTypes = propTypes;
VideoScreen.defaultProps = defaultProps;

export default React.memo(VideoScreen);
