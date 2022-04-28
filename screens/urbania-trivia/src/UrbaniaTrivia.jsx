/* eslint-disable no-param-reassign */

/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
} from '@micromag/core/contexts';
import { useLongPress, useTrackScreenMedia, useResizeObserver } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Image from '@micromag/element-image';
import MediaControls from '@micromag/element-media-controls';
import Video from '@micromag/element-video';
import AnimeLinesGrey from './images/anime-lines-grey.svg';
import AnimeLines from './images/anime-lines.svg';
import styles from './styles.module.scss';

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
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    spacing: PropTypes.number,
    padding: PropTypes.number,
    getMediaRef: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'full',
    title: null,
    video: null,
    gotoNextScreenOnEnd: false,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    spacing: 20,
    padding: 20,
    getMediaRef: null,
    className: null,
};

const UrbaniaTrivia = ({
    layout,
    title,
    video,
    gotoNextScreenOnEnd,
    background,
    callToAction,
    current,
    active,
    transitions,
    spacing,
    padding,
    getMediaRef,
    className,
}) => {
    const trackScreenMedia = useTrackScreenMedia('video');

    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { gotoNextScreen } = useViewerNavigation();
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;
    const videoShouldLoad = current || active || !isView;
    const shouldGotoNextScreenOnEnd = gotoNextScreenOnEnd && isView && current;

    const { body = '' } = title || {};

    // get resized video style props
    const {
        autoPlay = true,
        media: videoMedia = null,
        closedCaptions = null,
        withSeekBar = false,
        withPlayPause = false,
        withTime = false,
    } = video || {};

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

    const onSeek = useCallback(
        (e) => {
            seek(e);
            play();
        },
        [seek, play],
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

    const onMouseMove = useCallback(
        (e, time = 1800) => {
            setShowMediaControls(true);
            if (mouseMoveRef.current !== null) {
                clearTimeout(mouseMoveRef.current);
            }
            mouseMoveRef.current = setTimeout(() => {
                setShowMediaControls(false);
                mouseMoveRef.current = null;
            }, time);
        },
        [setShowMediaControls],
    );

    const onLongPress = useCallback(() => {
        if (!playing) {
            play();
        } else if (withPlayPause) {
            onMouseMove(null, 3000);
        } else {
            pause();
        }
    }, [play, playing, pause, onMouseMove, withPlayPause, setShowMediaControls]);

    const longPressBind = useLongPress({ onLongPress, onClick: onMouseMove });

    const fullscreen = layout === 'full';

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const { image: backgroundImage = null, video: backgroundVideo = null } = background || {};

    const isCustomBackground =
        background === null || (backgroundImage === null && backgroundVideo === null);

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

    const {
        ref: titleRef,
        entry: { contentRect = null },
    } = useResizeObserver();

    const { height: titleHeight = 0 } = contentRect || {};

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

    const finalBackground = useMemo(() => {
        if (isArray(background) && background.length > 0) {
            return background;
        }
        if (background !== null) {
            return { ...defaultBackground, ...background };
        }
        return defaultBackground;
    }, [background]);

    const placeholderProps = fullscreen ? { width: '100%', height: '100%' } : { width: '100%' };

    useEffect(() => {
        setReady(!hasVideoUrl);
    }, [videoUrl, hasVideoUrl, setReady]);

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const visibleControls = (!autoPlay && !playing) || muted || showMediaControls;
    const items = [
        <Container className={styles.itemsContainer}>
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
                isEmpty={body.length === 0}
            >
                <div ref={titleRef}>
                    <Heading
                        className={classNames([
                            styles.heading,
                            {
                                [className]: className !== null,
                                [styles.hideHeading]: body.length === 0,
                            },
                        ])}
                        body={body}
                        {...title}
                    />
                </div>
            </ScreenElement>
            <ScreenElement
                key="video"
                className={styles.videoScreenElement}
                placeholder={
                    <PlaceholderVideo
                        className={styles.videoPlaceholder}
                        height="300px"
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
                            width: Math.min(width, resizedVideoWidth),

                            height: resizedVideoHeight,
                            left: resizedVideoLeft > 0 ? resizedVideoLeft : null,
                            maxHeight: videoMaxHeight,
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
                                width={Math.min(width, resizedVideoWidth)}
                                height={resizedVideoHeight}
                                resolution={resolution}
                            />
                        ) : (
                            <Video
                                {...finalVideo}
                                ref={apiRef}
                                width={resizedVideoWidth}
                                height={resizedVideoHeight}
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
                            />
                        )}
                        {/* </Transitions> */}
                        {!isPlaceholder ? (
                            <div key="bottom-content" className={styles.bottomContent}>
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
                                    <div
                                        className={classNames([
                                            styles.bottom,
                                            {
                                                [styles.visible]: visibleControls,
                                                [styles.withGradient]:
                                                    withSeekBar || withPlayPause || muted,
                                            },
                                        ])}
                                    >
                                        {hasVideoUrl ? (
                                            <MediaControls
                                                className={classNames([
                                                    styles.mediaControls,
                                                    {
                                                        [styles.visible]: visibleControls,
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
                                                onSeek={onSeek}
                                                focusable={current && isView}
                                            />
                                        ) : null}
                                        {hasCallToAction ? (
                                            <div style={{ marginTop: -spacing / 2 }}>
                                                <CallToAction
                                                    className={styles.callToAction}
                                                    callToAction={callToAction}
                                                    animationDisabled={isPreview}
                                                    focusable={current && isView}
                                                    screenSize={{ width, height }}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
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
            {...longPressBind}
            onMouseMove={onMouseMove}
        >
            {!isPlaceholder ? (
                <Background
                    background={finalBackground}
                    className={classNames([
                        styles.background,
                        {
                            [className]: className !== null,
                            [styles.isCustomBackground]: isCustomBackground,
                            [styles.isAnimated]: !isStatic && !isPreview && isCustomBackground,
                        },
                    ])}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={backgroundShouldLoad}
                />
            ) : (
                <Background
                    background={placeholderBackground}
                    className={styles.background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    styles={{ backgroundColor: 'red' }}
                />
            )}
            <Container width={width} height={height}>
                <div className={styles.content}>{items}</div>
            </Container>
        </div>
    );
};

UrbaniaTrivia.propTypes = propTypes;
UrbaniaTrivia.defaultProps = defaultProps;

export default React.memo(UrbaniaTrivia);
