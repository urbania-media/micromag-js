/* eslint-disable react/jsx-props-no-spreading, no-param-reassign, jsx-a11y/control-has-associated-label */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Empty, PlaceholderVideo, ScreenElement } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerContainer,
    useViewerContext,
    useViewerNavigation,
    useViewerWebView,
} from '@micromag/core/contexts';
import {
    useActivityDetector,
    useDebounce,
    useMediaThumbnail,
    useTrackScreenMedia,
} from '@micromag/core/hooks';
import { getFooterProps, isFooterFilled, isHeaderFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';

import styles from './video.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['middle', 'full']),
    video: MicromagPropTypes.videoElement,
    gotoNextScreenOnEnd: PropTypes.bool,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    spacing: PropTypes.number,
    mediaRef: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    video: null,
    gotoNextScreenOnEnd: false,
    header: null,
    footer: null,
    background: null,
    current: true,
    active: true,
    spacing: 20,
    mediaRef: null,
    className: null,
};

const VideoScreen = ({
    layout,
    video,
    gotoNextScreenOnEnd,
    header,
    footer,
    background,
    current,
    active,
    spacing,
    mediaRef: customMediaRef,
    className,
}) => {
    const trackScreenMedia = useTrackScreenMedia('video');

    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { gotoNextScreen } = useViewerNavigation();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();

    const mediaShouldLoad = current || active;
    const shouldGotoNextScreenOnEnd = gotoNextScreenOnEnd && isView && current;

    const {
        autoPlay = true,
        loop = false,
        media: videoMedia = null,
        thumbnail = null,
        captions = null,
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
        setControlsSuggestPlay,
        setControlsTheme,
        setPlaying,
        controlsVisible,
        showControls,
        hideControls,
        currentQualityLevel,
        setCurrentQualityLevel,
    } = usePlaybackContext();

    const mediaRef = usePlaybackMediaRef(current);

    const [hasPlayed, setHasPlayed] = useState(false);
    const backgroundPlaying = current && (isView || isEdit);
    const videoPlaying = current && (isView || isEdit) && playing;
    const shouldDisplayPoster = isPreview || isCapture;

    useEffect(() => {
        if (!current) {
            return () => {};
        }

        setControlsTheme({
            seekBarOnly: withSeekBar && !withControls,
            color,
            progressColor,
        });

        if (withControls || withSeekBar) {
            setControls(true);
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
        if (current && autoPlay) {
            setPlaying(true);
        }
    }, [current, autoPlay]);

    const viewerContainer = useViewerContainer();
    const { detected: activityDetected } = useActivityDetector({
        element: viewerContainer,
        disabled: !isView,
        timeout: 2000,
    });
    const toggleControlsVisibility = useCallback(() => {
        if (activityDetected) {
            showControls();
        } else {
            hideControls();
        }
    }, [activityDetected, showControls, hideControls]);
    useDebounce(toggleControlsVisibility, activityDetected, 1000);

    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);

    const onTimeUpdate = useCallback(
        (time = null) => {
            if (time !== null && typeof time.currentTarget !== 'undefined') {
                const { currentTime: targetTime = 0 } = time.currentTarget || {};
                setCurrentTime(targetTime);
            } else {
                setCurrentTime(0);
            }
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
            if (!hasPlayed) {
                setHasPlayed(true);
            }
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
        if (current && !loop) {
            setPlaying(false);
        }
        if (current && shouldGotoNextScreenOnEnd) {
            gotoNextScreen();
        }
    }, [loop, current, shouldGotoNextScreenOnEnd, gotoNextScreen]);

    const fullscreen = layout === 'full';

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, {
        isView,
        current,
        openWebView,
        isPreview,
    });

    const hasVideo = video !== null;
    const [ready, setReady] = useState(hasVideo);

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

    // const onSuspended = useCallback(() => {
    //     if (playing && current) {
    //         setPlaying(false);
    //     }
    // }, [current, playing, setPlaying]);

    const onPlayError = useCallback(() => {
        if (isView && playing && current && hasVideoUrl && autoPlay) {
            setPlaying(false);
            setControlsSuggestPlay(true);
        }
    }, [isView, current, playing, hasVideoUrl, autoPlay, setPlaying, setControlsSuggestPlay]);

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
        >
            <Container width={width} height={height} className={styles.content}>
                <div className={styles.inner}>
                    {!isPlaceholder && hasHeader ? (
                        <div
                            key="header"
                            className={styles.header}
                            style={{
                                paddingTop: spacing / 2,
                                paddingLeft: spacing,
                                paddingRight: spacing,
                                transform: !isPreview ? `translate(0, ${viewerTopHeight}px)` : null,
                            }}
                        >
                            <Header fade={current && !controlsVisible} {...header} />
                        </div>
                    ) : null}

                    <ScreenElement
                        key="video"
                        placeholder={
                            <PlaceholderVideo
                                className={styles.placeholder}
                                {...placeholderProps}
                            />
                        }
                        empty={
                            <div className={styles.emptyContainer}>
                                <Empty className={styles.empty}>
                                    <FormattedMessage
                                        defaultMessage="Video"
                                        description="Video placeholder"
                                    />
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
                                {shouldDisplayPoster ? (
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
                                        width={resizedVideoWidth}
                                        height={resizedVideoHeight}
                                        paused={!videoPlaying}
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
                                        // onSuspended={onSuspended}
                                        onPlayError={onPlayError}
                                        disablePictureInPicture
                                        focusable={current && isView}
                                        shouldLoad={mediaShouldLoad}
                                        qualityStartLevel={currentQualityLevel}
                                        onQualityLevelChange={setCurrentQualityLevel}
                                    />
                                )}
                            </div>
                        ) : null}
                    </ScreenElement>

                    {!isPlaceholder ? (
                        <div
                            key="bottom-content"
                            className={styles.bottom}
                            style={{
                                transform:
                                    current && !isPreview
                                        ? `translate3d(0, -${viewerBottomHeight}px, 0)`
                                        : null,
                                paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                                paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                                paddingBottom: spacing / 2,
                                paddingTop: 0,
                            }}
                        >
                            {(closedCaptions !== null || captions !== null) &&
                            !isPreview &&
                            !isCapture &&
                            !isStatic ? (
                                <ClosedCaptions
                                    className={styles.closedCaptions}
                                    media={closedCaptions} // BW Compat
                                    {...captions}
                                    currentTime={currentTime}
                                />
                            ) : null}
                            {hasFooter ? <Footer {...footerProps} /> : null}
                        </div>
                    ) : null}
                </div>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    withoutVideo={isPreview}
                />
            ) : null}
        </div>
    );
};

VideoScreen.propTypes = propTypes;
VideoScreen.defaultProps = defaultProps;

export default VideoScreen;
