/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getSizeWithinBounds } from '@folklore/size';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import VideoControls from '@micromag/element-media-controls';

import styles from './styles/video.module.scss';

const propTypes = {
    video: PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        metadata: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
        }),
    }),
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    loop: PropTypes.bool,
    controls: MicromagPropTypes.videoControls,
    players: PropTypes.arrayOf(PropTypes.elementType),
    width: PropTypes.number,
    height: PropTypes.number,
    fit: MicromagPropTypes.objectFit,
    showEmpty: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    video: null,
    players: null,
    width: null,
    height: null,
    autoPlay: false,
    muted: false,
    loop: false,
    controls: null,
    fit: null,
    showEmpty: false,
    className: null,
};

const Video = ({
    video,
    players,
    width: defaultMaxWidth,
    height: defaultMaxHeight,
    autoPlay,
    muted: initialMuted,
    loop,
    controls,
    fit,
    showEmpty,
    className,
}) => {
    const controlsVisible = controls !== null;

    const { url = null, metadata = {} } = video || {};
    const { width = null, height = null } = metadata;

    const maxWidth = defaultMaxWidth || width;
    const maxHeight = defaultMaxHeight || height;
    // console.log(width, height);
    const finalPlayers = players || Video.defaultPlayers;
    const PlayerComponent =
        url !== null ? finalPlayers.find((it) => it.testUrl(url)) || null : null;
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
        (newPlayerState) => {
            setPlayerState(newPlayerState);
        },
        [setPlayerState],
    );

    const onPlayerCurrentTimeChange = useCallback(
        (newCurrentTime) => {
            setCurrentTime(newCurrentTime);
        },
        [setCurrentTime],
    );

    useEffect(() => {
        setVideoSize({ width, height });
    }, [width, height]);

    useEffect(() => {
        setPlayerState({ ...playerState, muted: initialMuted });
    }, [initialMuted, setPlayerState]);

    useEffect(() => {
        if (refPlayer.current) {
            if (!autoPlay) {
                refPlayer.current.pause();
            } else {
                refPlayer.current.play();
            }
        }
    }, [autoPlay, setPlayerState]);

    const { size = 'fit' } = fit || {};

    let playerSize =
        size === 'fit'
            ? {
                  width,
                  height,
              }
            : getSizeWithinBounds(videoSize.width, videoSize.height, maxWidth, maxHeight, {
                  cover: size === 'cover',
              });
    playerSize = showEmpty && !url ? { width: '100%', height: 200 } : playerSize;

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
            }}
        >
            {(playerReady && controlsVisible) || (!url && showEmpty) ? (
                <VideoControls
                    {...refPlayer.current}
                    {...playerState}
                    {...controls}
                    duration={duration}
                    currentTime={currentTime}
                    width={Math.min(maxWidth, playerSize.width)}
                    className={styles.controls}
                />
            ) : null}
            {PlayerComponent !== null ? (
                <div
                    className={styles.playerContainer}
                    style={{
                        width: playerSize.width,
                        height: playerSize.height,
                        top: size === 'cover' ? (maxHeight - playerSize.height) / 2 : 0,
                        left: size === 'cover' ? (maxWidth - playerSize.width) / 2 : 0,
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
        </div>
    );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.defaultPlayers = [];
Video.registerPlayer = (Player) => {
    const playerIndex = Video.defaultPlayers.findIndex((it) => it === Player);
    if (playerIndex === -1) {
        Video.defaultPlayers = [...Video.defaultPlayers, Player];
    }
};

export default Video;
