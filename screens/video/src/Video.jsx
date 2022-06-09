/* eslint-disable jsx-a11y/control-has-associated-label */

/* eslint-disable no-param-reassign */

/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo, Transitions, ScreenElement, Empty } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenSize,
    useScreenRenderContext,
    useViewerNavigation,
    useViewerWebView,
    useViewerContext,
} from '@micromag/core/contexts';
import { useTrackScreenMedia, useMediaThumbnail, useActivityDetector } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';
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
    mediaRef: PropTypes.func,
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
    mediaRef: null,
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
    mediaRef: customMediaRef,
    className,
}) => {
    const trackScreenMedia = useTrackScreenMedia('video');

    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { gotoNextScreen } = useViewerNavigation();
    const { bottomHeight: viewerBottomHeight, bottomSidesWidth: viewerBottomSidesWidth } = useViewerContext();
    const { open: openWebView } = useViewerWebView();

    const mediaShouldLoad = current || active;
    const shouldGotoNextScreenOnEnd = gotoNextScreenOnEnd && isView && current;

    // get resized video style props
    const {
        autoPlay = true,
        media: videoMedia = null,
        thumbnail = null,
        closedCaptions = null,
        withSeekBar = false,
        withControls = false,
        color = null,
        progressColor = null,
    } = video || {};

    const {
        playing,
        muted,
        setControls,
        setControlsTheme,
        setPlaying,
        showControls,
        hideControls,
    } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const backgroundPlaying = current && (isView || isEdit);
    const videoPlaying = current && (isView || isEdit) && playing;

    useEffect(() => {
        if (!current) {
            return () => {};
        }
        if (withControls || withSeekBar) {
            setControls(true);
            setControlsTheme({
                seekBarOnly: withSeekBar && !withControls,
                color,
                progressColor,
            });
        } else {
            setControls(false);
        }
        return () => {
            if (withControls || withSeekBar) {
                setControls(false);
            }
        };
    }, [current, withControls, setControls, withSeekBar, color, progressColor]);

    useEffect(() => {
        if (customMediaRef !== null) {
            customMediaRef(mediaRef.current);
        }
    }, [mediaRef.current]);

    useEffect(() => {
        if (current && autoPlay && !playing) {
            setPlaying(true);
        }
    }, [current, autoPlay]);

    // const mouseMoveRef = useRef(null);
    const { ref: activityDetectorRef, detected: activityDetected } = useActivityDetector({
        disabled: !current || !isView,
        timeout: 2000,
    });
    useEffect(() => {
        if (!current) {
            return;
        }
        if (activityDetected) {
            showControls();
        } else {
            hideControls();
        }
    }, [activityDetected, showControls, hideControls]);

    // Get api state updates from callback
    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [allowManualPlayOnTap, setAllowManualPlayOnTap] = useState(false);

    const onTimeUpdate = useCallback(
        (time) => {
            setCurrentTime(time);
        },
        [duration, setCurrentTime],
    );

    const onProgressStep = useCallback(
        (step) => {
            trackScreenMedia(video, `progress_${Math.round(step * 100, 10)}%`);
        },
        [trackScreenMedia, video],
    );

    const onDurationChange = useCallback(
        (dur) => {
            setDuration(dur);
        },
        [setDuration],
    );

    const onPlay = useCallback(
        ({ initial }) => {
            trackScreenMedia(video, initial ? 'play' : 'resume');
        },
        [trackScreenMedia, video],
    );

    const onPause = useCallback(
        ({ midway }) => {
            trackScreenMedia(video, midway ? 'pause' : 'ended');
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

    const onEnded = useCallback(() => {
        setPlaying(false);
        if (shouldGotoNextScreenOnEnd) {
            gotoNextScreen();
        }
    }, [current, shouldGotoNextScreenOnEnd, gotoNextScreen]);

    const fullscreen = layout === 'full';

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const hasVideo = video !== null;
    const [ready, setReady] = useState(hasVideo); // useState(!hasVideo);
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

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

    const { metadata: videoMetadata = null, url: videoUrl = null } = videoMedia || {};
    const finalThumbnail = useMediaThumbnail(videoMedia, thumbnail);

    const hasVideoUrl = videoUrl !== null;

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

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    /**
     * if video can play, but:
     * - it's the current screen
     * - the video doesn't provide visual controls
     * - the video is set to play automatically
     * - and it's **not** playing
     * -> then set up a button that catches a click and plays the video
     */
    const onCanPlay = useCallback(() => {
        if (current && !withControls && autoPlay && !playing) {
            setAllowManualPlayOnTap(true);
        }
    }, [current, withControls, autoPlay, playing, setPlaying, allowManualPlayOnTap, setAllowManualPlayOnTap]);

    const onForcePlay = useCallback(
        (e) => {
            e.stopPropagation();
            setAllowManualPlayOnTap(false);
            setPlaying(true);
        },
        [setAllowManualPlayOnTap, setPlaying],
    );

    const items = [
        allowManualPlayOnTap ? (
            <button
                key="tap-catcher-button"
                type="button"
                onClick={onForcePlay}
                className={styles.unmuteAndPlayButton}
            />
        ) : null,

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
                    {isPreview || isCapture ? (
                        <Image
                            className={styles.image}
                            media={finalThumbnail}
                            width={resizedVideoWidth}
                            height={resizedVideoHeight}
                            objectFit={{
                                fit: 'cover',
                            }}
                            resolution={resolution}
                            shouldLoad={mediaShouldLoad}
                        />
                    ) : (
                        <Video
                            {...finalVideo}
                            paused={!videoPlaying}
                            muted={muted}
                            mediaRef={mediaRef}
                            className={styles.video}
                            onReady={onVideoReady}
                            onPlay={onPlay}
                            onCanPlay={onCanPlay}
                            onPause={onPause}
                            onTimeUpdate={onTimeUpdate}
                            onProgressStep={onProgressStep}
                            onDurationChange={onDurationChange}
                            onSeeked={onSeeked}
                            onEnded={onEnded}
                            focusable={current && isView}
                            shouldLoad={mediaShouldLoad}
                        />
                    )}
                </div>
            ) : null}
        </ScreenElement>,

        !isPlaceholder ? (
            <div
                key="bottom-content"
                className={styles.bottom}
                style={{
                    transform: !isPreview ? `translate(0, -${viewerBottomHeight}px)` : null,
                    paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                    paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                    paddingBottom: spacing / 2,
                    paddingTop: 0,
                }}
            >
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
                    {hasCallToAction ? (
                        <CallToAction
                            {...callToAction}
                            className={styles.callToAction}
                            animationDisabled={isPreview}
                            focusable={current && isView}
                            openWebView={openWebView}
                        />
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
            data-screen-ready={isStatic || isCapture || ready}
            ref={activityDetectorRef}
        >
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
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
