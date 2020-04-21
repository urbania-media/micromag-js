/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import VideoControls from '@micromag/element-media-controls';

import styles from './styles/video.module.scss';

const propTypes = {
    url: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.elementType),
    width: PropTypes.number,
    height: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    loop: PropTypes.bool,
    controls: MicromagPropTypes.videoControls,
    controlsVisible: PropTypes.bool,
    fit: MicromagPropTypes.objectFit,
    className: PropTypes.string,
};

const defaultProps = {
    url: null,
    players: null,
    width: null,
    height: null,
    maxWidth: null,
    maxHeight: null,
    autoPlay: false,
    muted: true,
    loop: false,
    controls: null,
    controlsVisible: true,
    fit: null,
    className: null,
};

const Video = ({
    players,
    url,
    width,
    height,
    maxWidth: defaultMaxWidth,
    maxHeight: defaultMaxHeight,
    autoPlay,
    muted: initialMuted,
    loop,
    controls,
    controlsVisible,
    fit,
    className,
}) => {
    const maxWidth = defaultMaxWidth || width;
    const maxHeight = defaultMaxHeight || height;
    // console.log(width, height);
    const finalPlayers = players || Video.defaultPlayers;
    const PlayerComponent = url !== null ? finalPlayers.find(it => it.testUrl(url)) || null : null;
    const refPlayer = useRef(null);
    const [playerReady, setPlayerReady] = useState(false);
    const [duration, setDuration] = useState(0);
    const [videoSize, setVideoSize] = useState({
        width,
        height,
    });
    const [currentTime, setCurrentTime] = useState(0);
    const [playerState, setPlayerState] = useState({
        playing: false,
        paused: false,
        ended: false,
        muted: initialMuted,
    });

    const onPlayerReady = useCallback(() => {
        setPlayerReady(true);
        setDuration(refPlayer.current.getDuration());
        setVideoSize(refPlayer.current.getSize());
    }, [setPlayerReady, setDuration, setVideoSize]);

    const onPlayerStateChange = useCallback(
        newPlayerState => {
            setPlayerState(newPlayerState);
        },
        [setPlayerState],
    );

    const onPlayerCurrentTimeChange = useCallback(
        newCurrentTime => {
            setCurrentTime(newCurrentTime);
        },
        [setCurrentTime],
    );

    useEffect(() => {
        setVideoSize({ width, height });
    }, [width, height]);

    const { size = 'fit' } = fit || {};
    const playerSize =
        size === 'fit'
            ? {
                  width,
                  height,
              }
            : getSizeWithinBounds(videoSize.width, videoSize.height, maxWidth, maxHeight, {
                  cover: size === 'cover',
              });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isReady]: playerReady,
                    [className]: className,
                },
            ])}
            style={{
                width: playerSize.width,
                height: playerSize.height,
                overflow: 'hidden',
            }}
        >
            {PlayerComponent !== null ? (
                <div
                    className={styles.playerContainer}
                    style={{
                        width: playerSize.width,
                        height: playerSize.height,
                        top: size === 'cover' ? -(height - playerSize.height) / 2 : 0,
                        left: size === 'cover' ? -(width - playerSize.width) / 2 : 0,
                    }}
                >
                    <PlayerComponent
                        url={url}
                        width={playerSize.width}
                        height={playerSize.height}
                        autoPlay={autoPlay}
                        muted={initialMuted}
                        loop={loop}
                        refPlayer={refPlayer}
                        className={styles.player}
                        onReady={onPlayerReady}
                        onStateChange={onPlayerStateChange}
                        onCurrentTimeChange={onPlayerCurrentTimeChange}
                    />
                </div>
            ) : null}
            {playerReady && controlsVisible ? (
                <VideoControls
                    {...refPlayer.current}
                    {...playerState}
                    {...controls}
                    duration={duration}
                    currentTime={currentTime}
                    className={styles.controls}
                />
            ) : null}
        </div>
    );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.defaultPlayers = [];
Video.registerPlayer = Player => {
    const playerIndex = Video.defaultPlayers.findIndex(it => it === Player);
    if (playerIndex === -1) {
        Video.defaultPlayers = [...Video.defaultPlayers, Player];
    }
};

export default Video;
