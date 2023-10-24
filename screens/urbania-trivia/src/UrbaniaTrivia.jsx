/* eslint-disable no-param-reassign */

/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    Empty,
    PlaceholderTitle,
    PlaceholderVideo,
    ScreenElement,
    Transitions,
} from '@micromag/core/components';
import {
    useScreenRenderContext,
    useScreenSize,
    useViewerNavigation,
    usePlaybackContext,
    useViewerContext,
    usePlaybackMediaRef,
    useViewerContainer,
} from '@micromag/core/contexts';
import {
    useTrackScreenMedia,
    useDimensionObserver,
    useActivityDetector,
} from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';

import styles from './urbania-trivia.module.scss';

import AnimeLinesGrey from './images/anime-lines-grey.svg';
import AnimeLines from './images/anime-lines.svg';

const defaultBackground = {
    image: {
        type: 'image',
        url: AnimeLines,
        width: 1083,
        height: 1919,
    },
    color: '#00cbff',
};

const placeholderBackground = {
    image: {
        type: 'image',
        url: AnimeLinesGrey,
        width: 1083,
        height: 1919,
    },
    color: null,
};

const propTypes = {
    layout: PropTypes.oneOf(['middle', 'full']),
    title: MicromagPropTypes.headingElement,
    video: MicromagPropTypes.videoElement,
    gotoNextScreenOnEnd: PropTypes.bool,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    spacing: PropTypes.number,
    padding: PropTypes.number,
    mediaRef: PropTypes.func,
    transitions: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'full',
    title: null,
    video: null,
    gotoNextScreenOnEnd: false,
    background: null,
    current: true,
    active: true,
    spacing: 20,
    padding: 20,
    transitions: null,
    mediaRef: null,
    className: null,
};

const UrbaniaTrivia = ({
    layout,
    title,
    video,
    gotoNextScreenOnEnd,
    background,
    current,
    active,
    spacing,
    padding,
    transitions,
    mediaRef: customMediaRef,
    className,
}) => {
    const trackScreenMedia = useTrackScreenMedia('video');

    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { bottomHeight: viewerBottomHeight } = useViewerContext();
    const { gotoNextScreen } = useViewerNavigation();

    const hasTitle = isTextFilled(title);

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;
    const shouldGotoNextScreenOnEnd = gotoNextScreenOnEnd && isView && current;

    // get resized video style props
    const {
        autoPlay = true,
        media: videoMedia = null,
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

    useEffect(() => {
        if (!current) {
            return () => {};
        }
        if (withControls || withSeekBar) {
            setControls(true);
            setControlsTheme({
                seekBarOnly: withSeekBar && !withControls,
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

    // Get api state updates from callback
    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        if (current && autoPlay && !playing) {
            setPlaying(true);
        }
    }, [current, autoPlay]);

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
        if (current && shouldGotoNextScreenOnEnd) {
            gotoNextScreen();
        }
        if (current) {
            setPlaying(false);
        }
    }, [current, shouldGotoNextScreenOnEnd, gotoNextScreen, setPlaying]);

    const viewerContainer = useViewerContainer();
    const { detected: activityDetected } = useActivityDetector({
        element: viewerContainer,
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

    const fullscreen = layout === 'full';

    const { image: backgroundImage = null, video: backgroundVideo = null } = background || {};

    const isCustomBackground =
        background === null || (backgroundImage === null && backgroundVideo === null);

    const isAnimatedBackground = !isStatic && !isPreview && isCustomBackground;

    const hasVideo = video !== null;
    const [ready, setReady] = useState(hasVideo);
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

    const {
        metadata: videoMetadata = null,
        url: videoUrl = null,
        thumbnail_url: thumbnailUrl = null,
    } = videoMedia || {};
    const hasVideoUrl = videoUrl !== null;

    const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};

    const { ref: titleRef, height: titleHeight = 0 } = useDimensionObserver();

    const videoMaxHeight = height - titleHeight - (padding ? padding * 2 : 40);
    const { width: resizedVideoWidth, height: resizedVideoHeight } = getSizeWithinBounds(
        videoWidth,
        videoHeight,
        width,
        videoMaxHeight,
        { cover: fullscreen },
    );
    const resizedVideoLeft = -(resizedVideoWidth - width) / 2;
    // const resizedVideoTop = -(resizedVideoHeight - videoMaxHeight) / 2;

    const verticalVideo = resizedVideoHeight > resizedVideoWidth;

    const finalBackground = useMemo(() => {
        if (isArray(background) && background.length > 0) {
            return background;
        }
        const {
            image: bgImage = null,
            video: bgVideo = null,
            color: bgColor = null,
        } = background || {};
        if (bgImage !== null || bgVideo !== null) {
            return { ...defaultBackground, ...background };
        }
        return { ...defaultBackground, ...(bgColor !== null ? { color: bgColor } : null) };
    }, [background]);

    const placeholderProps = fullscreen ? { width: '100%', height: '100%' } : { width: '100%' };

    useEffect(() => {
        setReady(!hasVideoUrl);
    }, [videoUrl, hasVideoUrl, setReady]);

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const items = [
        <Container className={styles.itemsContainer} style={{ marginTop: -spacing / 2 }}>
            <ScreenElement
                key="heading"
                className={styles.headingScreenElement}
                placeholder={
                    <PlaceholderTitle className={styles.placeholder} {...placeholderProps} />
                }
                empty={
                    <div className={styles.emptyContainer}>
                        <Empty className={styles.empty}>
                            <FormattedMessage
                                defaultMessage="Heading"
                                description="Header placeholder"
                            />
                        </Empty>
                    </div>
                }
                isEmpty={!hasTitle}
            >
                {hasTitle ? (
                    <div ref={titleRef}>
                        <Heading
                            className={styles.heading}
                            // body={body}
                            {...title}
                        />
                    </div>
                ) : null}
            </ScreenElement>
            <ScreenElement
                key="video"
                className={styles.videoScreenElement}
                placeholder={
                    <PlaceholderVideo className={styles.videoPlaceholder} {...placeholderProps} />
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
                            width: Math.min(width, resizedVideoWidth),

                            height: resizedVideoHeight,
                            left: resizedVideoLeft > 0 ? resizedVideoLeft : null,
                            maxHeight: videoMaxHeight,
                        }}
                    >
                        {isPreview || isCapture ? (
                            <Image
                                className={styles.image}
                                media={{
                                    url: thumbnailUrl,
                                    metadata: { width: videoWidth, height: videoHeight },
                                }}
                                width={Math.min(width, resizedVideoWidth)}
                                height={resizedVideoHeight}
                                resolution={resolution}
                            />
                        ) : (
                            <Video
                                {...finalVideo}
                                mediaRef={mediaRef}
                                paused={!current || !playing}
                                muted={muted}
                                width={resizedVideoWidth}
                                height={resizedVideoHeight}
                                className={styles.video}
                                onReady={onVideoReady}
                                onPlay={onPlay}
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

                        {current && !isPlaceholder ? (
                            <div
                                key="bottom-content"
                                className={styles.bottomContent}
                                style={{
                                    transform: `translate(0, -${viewerBottomHeight}px)`,
                                }}
                            >
                                <Transitions
                                    playing={transitionPlaying}
                                    transitions={transitions}
                                    disabled={transitionDisabled}
                                >
                                    {closedCaptions !== null &&
                                    !isPreview &&
                                    !isCapture &&
                                    !isStatic ? (
                                        <ClosedCaptions
                                            className={styles.closedCaptions}
                                            media={closedCaptions}
                                            currentTime={currentTime}
                                        />
                                    ) : null}
                                </Transitions>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </ScreenElement>
        </Container>,
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
        >
            <Container width={width} height={height} className={styles.content}>
                <div
                    className={styles.inner}
                    style={
                        verticalVideo
                            ? { justifyContent: 'flex-start', marginTop: spacing * 2 }
                            : null
                    }
                >
                    {items}
                </div>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={finalBackground}
                    className={classNames([
                        styles.background,
                        {
                            [className]: className !== null,
                            [styles.isCustomBackground]: isCustomBackground,
                            [styles.isAnimated]: isAnimatedBackground,
                        },
                    ])}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
                    withoutVideo={isPreview}
                />
            ) : (
                <Background
                    background={placeholderBackground}
                    className={styles.background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    withoutVideo={isPreview}
                />
            )}
        </div>
    );
};

UrbaniaTrivia.propTypes = propTypes;
UrbaniaTrivia.defaultProps = defaultProps;

export default React.memo(UrbaniaTrivia);
