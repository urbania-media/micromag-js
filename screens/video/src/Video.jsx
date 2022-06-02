/* eslint-disable jsx-a11y/control-has-associated-label */

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
    usePlaybackContext,
    useScreenSize,
    useScreenRenderContext,
    useViewerNavigation,
    useViewerInteraction,
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
    const { bottomHeight: viewerBottomHeight } = useViewerContext();
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;
    const shouldGotoNextScreenOnEnd = gotoNextScreenOnEnd && isView && current;

    // get resized video style props
    const {
        autoPlay = true,
        media: videoMedia = null,
        thumbnailFile = null,
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
        setMedia,
        setPlaying,
        showControls,
        hideControls,
    } = usePlaybackContext();
    const mediaRef = useRef(null);

    useEffect(() => {
        if (!current) {
            return;
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
    }, [current, withControls, setControls, withSeekBar, color, progressColor]);

    // useEffect(() => {
    //     if (!current) {
    //         return;
    //     }
    //     setMedia(mediaRef.current);
    // }, [current]);
    useEffect(() => {
        setMedia(current ? mediaRef.current : null);
    }, [current, setMedia]);

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

    const { ref: activityDetectorRef, detected: activityDetected } = useActivityDetector({
        disabled: !current || !isView,
        timeout: 2000,
    });
    useEffect(() => {
        if (activityDetected) {
            showControls();
        } else {
            hideControls();
        }
    }, [activityDetected, showControls, hideControls]);

    // Get api state updates from callback
    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);

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
        if (shouldGotoNextScreenOnEnd) {
            gotoNextScreen();
        }
        setPlaying(false);
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
    const thumbnailUrl = useMediaThumbnail(videoMedia, thumbnailFile);

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

    const items = [
        // shouldCatchFirstTapToPlay && suspended ? (
        //     <button
        //         key="tap-catcher-button"
        //         type="button"
        //         onTouchStart={() => play()}
        //         className={styles.unmuteAndPlayButton}
        //     />
        // ) : null,

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
                            media={{
                                url: thumbnailUrl,
                                metadata: { width: videoWidth, height: videoHeight },
                            }}
                            width={resizedVideoWidth}
                            height={resizedVideoHeight}
                            resolution={resolution}
                            shouldLoad={mediaShouldLoad}
                        />
                    ) : (
                        <Video
                            {...finalVideo}
                            paused={!current || !playing}
                            muted={muted}
                            mediaRef={mediaRef}
                            className={styles.video}
                            onReady={onVideoReady}
                            onPlay={onPlay}
                            onPause={onPause}
                            onTimeUpdate={onTimeUpdate}
                            onProgressStep={onProgressStep}
                            onDurationChange={onDurationChange}
                            onSeeked={onSeeked}
                            onEnded={onEnded}
                            // onSuspend={onSuspend}
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
                className={styles.bottomContent}
                style={{
                    transform: `translate(0, ${viewerBottomHeight}px)`,
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
                    <div className={classNames([styles.bottom])}>
                        {hasCallToAction ? (
                            <div style={{ marginTop: -spacing / 2 }}>
                                <CallToAction
                                    className={styles.callToAction}
                                    callToAction={callToAction}
                                    animationDisabled={isPreview}
                                    focusable={current && isView}
                                    screenSize={{ width, height }}
                                    enableInteraction={enableInteraction}
                                    disableInteraction={disableInteraction}
                                />
                            </div>
                        ) : null}
                    </div>
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
