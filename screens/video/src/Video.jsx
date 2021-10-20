/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo, Transitions, ScreenElement, Empty } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { useTrackScreenMedia, useLongPress } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import ClosedCaptions from '@micromag/element-closed-captions';
import MediaControls from '@micromag/element-media-controls';
import Image from '@micromag/element-image';
import Video from '@micromag/element-video';
import CallToAction from '@micromag/element-call-to-action';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['middle', 'full']),
    video: MicromagPropTypes.videoElement,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    // active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    spacing: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    video: null,
    background: null,
    callToAction: null,
    current: true,
    // active: true,
    transitions: null,
    spacing: 20,
    className: null,
};

const VideoScreen = ({
    layout,
    video,
    background,
    callToAction,
    current,
    // active,
    transitions,
    spacing,
    className,
}) => {
    const trackScreenMedia = useTrackScreenMedia('video');

    const { width, height } = useScreenSize();
    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);

    const apiRef = useRef();
    const { togglePlay, toggleMute, seek, play, pause } = apiRef.current || {};
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

    useEffect(() => {
        if (!current && playing) {
            pause();
        }
    }, [playing, current]);

    // ------------------------------------

    const longPressBind = useLongPress({ onLongPress: togglePlay });

    const fullscreen = layout === 'full';

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const hasVideo = video !== null;
    const [ready, setReady] = useState(!hasVideo);
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    // get resized video style props
    const {
        autoPlay = true,
        media: videoMedia = null,
        closedCaptions = null,
        withSeekBar = false,
        withPlayPause = false,
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
                    <Transitions
                        playing={transitionPlaying}
                        transitions={transitions}
                        disabled={transitionDisabled}
                    >
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
                                onVolumeChanged={onVolumeChanged}
                                focusable={current && isView}
                                // onPosterLoaded={onPosterLoaded}
                            />
                        )}
                    </Transitions>
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
                            className={styles.mediaControls}
                            withSeekBar={withSeekBar}
                            withPlayPause={withPlayPause}
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
            data-screen-ready={((isStatic || isCapture) /* && posterReady */) || ready}
            {...longPressBind}
        >
            {!isPlaceholder ? (
                <Background
                    {...background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
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
