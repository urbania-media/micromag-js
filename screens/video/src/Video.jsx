/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderVideo, Transitions } from '@micromag/core/components';
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
    closedCaptions: MicromagPropTypes.closedCaptionsElement,
    withSeekBar: PropTypes.bool,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    video: null,
    closedCaptions: null,
    withSeekBar: false,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 200,
        },
        out: 'scale',
    },
    className: null,
};

const VideoScreen = ({
    layout,
    video,
    closedCaptions,
    withSeekBar,
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
    const { isEdit, isPlaceholder, isView } = useScreenRenderContext();
    const fullscreen = layout === 'full';

    const withVideo = video !== null;
    const [ready, setReady] = useState(!withVideo);
    const transitionPlaying = current && ready;

    useEffect(() => {
        setReady(false);
    }, [video, setReady]);

    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    // get resized video style props

    const { media: videoMedia = null } = video || {};
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

    const items = [];

    if (isPlaceholder) {
        const placeholderProps = fullscreen ? { width: '100%', height: '100%' } : { width: '100%' };
        items.push(<PlaceholderVideo className={styles.placeholder} {...placeholderProps} />);
    } else if (withVideo) {
        items.push(
            <div
                className={styles.videoContainer}
                style={{
                    width: resizedVideoWidth,
                    height: resizedVideoHeight,
                    left: resizedVideoLeft,
                    top: resizedVideoTop,
                }}
            >
                <Transitions playing={transitionPlaying} transitions={transitions}>
                    <Video
                        {...video}
                        ref={apiRef}
                        className={styles.video}
                        onReady={onVideoReady}
                        onPlayChanged={onPlayChanged}
                        onMuteChanged={onMuteChanged}
                        onTimeUpdate={onTimeUpdate}
                        onDurationChanged={onDurationChanged}
                    />
                </Transitions>
            </div>,
        );
        items.push(
            <div className={styles.bottomContent}>
                {closedCaptions !== null ? (
                    <ClosedCaptions
                        className={styles.closedCaptions}
                        {...closedCaptions}
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
            </div>,
        );
    }

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
