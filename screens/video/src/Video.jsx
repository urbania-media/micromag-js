/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo, Transitions, ScreenElement, Empty } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import ClosedCaptions from '@micromag/element-closed-captions';
import MediaControls from '@micromag/element-media-controls';
import Video from '@micromag/element-video';
import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['full', 'center']),
    video: MicromagPropTypes.videoElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'full',
    video: null,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    className: null,
};

const VideoScreen = ({
    layout,
    video,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const apiRef = useRef();
    const { togglePlay, toggleMute, seek } = apiRef.current || {};
    // Get api state updates from callback

    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const onTimeUpdate = useCallback((time) => {
        setCurrentTime(time);
    }, []);

    const onDurationChanged = useCallback((dur) => {
        setDuration(dur);
    }, []);

    const onPlayChanged = useCallback((isPlaying) => {
        setPlaying(isPlaying);
    }, []);

    const onMuteChanged = useCallback((isMuted) => {
        setMuted(isMuted);
    }, []);

    // ------------------------------------

    const { width, height } = useScreenSize();
    const { isEdit, isPlaceholder, isPreview, isView } = useScreenRenderContext();
    const fullscreen = layout === 'full';

    const hasVideo = video !== null;
    const [ready, setReady] = useState(!hasVideo);
    const transitionPlaying = current && ready;

    useEffect(() => {
        setReady(false);
    }, [video, setReady]);

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    // get resized video style props
    const finalVideo = hasVideo ? { ...video, autoPlay: isPreview ? false : video.autoPlay } : null;
    const { media: videoMedia = null, closedCaptions = null, withSeekBar = false } =
        finalVideo || {};
    const { metadata: videoMetadata = null } = videoMedia || {};
    const { width: videoWidth = 0, height: videoHeight = 0 } = videoMetadata || {};

    const finalMaxRatio = fullscreen ? null : maxRatio;
    const currentRatio = width / height;
    const finalWidth =
        finalMaxRatio !== null && currentRatio > finalMaxRatio ? height * finalMaxRatio : width;

    const { width: resizedVideoWidth, height: resizedVideoHeight } = getSizeWithinBounds(
        videoWidth,
        videoHeight,
        finalWidth,
        height,
        { cover: fullscreen },
    );
    const resizedVideoLeft = -(resizedVideoWidth - finalWidth) / 2;
    const resizedVideoTop = -(resizedVideoHeight - height) / 2;

    const placeholderProps = fullscreen ? { width: '100%', height: '100%' } : { width: '100%' };

    const items = [
        <ScreenElement
            key="video"
            placeholder={<PlaceholderVideo className={styles.placeholder} {...placeholderProps} />}
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
            isEmpty={!hasVideo}
        >
            {hasVideo ? (
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
                        disabled={!isView}
                    >
                        <Video
                            {...finalVideo}
                            ref={apiRef}
                            className={styles.video}
                            onReady={onVideoReady}
                            onPlayChanged={onPlayChanged}
                            onMuteChanged={onMuteChanged}
                            onTimeUpdate={onTimeUpdate}
                            onDurationChanged={onDurationChanged}
                        />
                    </Transitions>
                </div>
            ) : null}
        </ScreenElement>,
        !isPlaceholder ? (
            <div className={styles.bottomContent}>
                {closedCaptions !== null ? (
                    <ClosedCaptions
                        className={styles.closedCaptions}
                        media={closedCaptions}
                        currentTime={currentTime}
                    />
                ) : null}
                <MediaControls
                    className={styles.mediaControls}
                    withSeekBar={withSeekBar}
                    playing={playing}
                    muted={muted}
                    currentTime={currentTime}
                    duration={duration}
                    onTogglePlay={togglePlay}
                    onToggleMute={toggleMute}
                    onSeek={seek}
                />
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
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={finalMaxRatio}
            />
            <Container width={width} height={height} maxRatio={finalMaxRatio}>
                <div className={styles.content}>{items}</div>
            </Container>
        </div>
    );
};

VideoScreen.propTypes = propTypes;
VideoScreen.defaultProps = defaultProps;

export default React.memo(VideoScreen);
