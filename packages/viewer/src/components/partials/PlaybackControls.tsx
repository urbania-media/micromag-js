/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import {
    Button,
    MuteIcon,
    PauseIcon,
    PlayIcon,
    Spinner,
    UnmuteIcon,
} from '@micromag/core/components';
import { usePlaybackContext } from '@micromag/core/contexts';
import { useMediaReady, useMediaState } from '@micromag/core/hooks';
import { getColorAsString } from '@micromag/core/utils';

import SeekBar from './SeekBar';

import styles from '../../styles/partials/playback-controls.module.css';

const DEFAULT_COLOR = { color: '#FFFFFF', alpha: 1 };
const DEFAULT_PROGRESS_COLOR = { color: '#666', alpha: 1 };

interface PlaybackControlsProps {
    defaultColor?: { color?: string; alpha?: number };
    defaultProgressColor?: { color?: string; alpha?: number };
    withLoading?: boolean;
    withoutShadow?: boolean;
    className?: string;
    collapsedClassName?: string;
}

function PlaybackControls({
    defaultColor = DEFAULT_COLOR,
    defaultProgressColor = DEFAULT_PROGRESS_COLOR,
    withLoading = true,
    withoutShadow = false,
    className = null,
    collapsedClassName = null,
}: PlaybackControlsProps) {
    const intl = useIntl();
    const {
        media: mediaElement = null,
        hasAudio = null,
        playing: wantedPlaying = false,
        muted: wantedMuted = true,
        setPlaying,
        setMuted,
        controls,
        controlsSuggestPlay,
        controlsVisible,
        controlsTheme,
        showControls,
    } = usePlaybackContext();

    const [showLoading, setShowLoading] = useState(false);
    const mediaUrl = mediaElement !== null ? mediaElement.currentSrc || mediaElement.src : null;
    const mediaReady = useMediaReady(mediaElement, {
        id: mediaUrl,
    });
    const ready = mediaElement === null || mediaReady;
    const finalShowLoading = showLoading && !ready;

    const { buffering, playing, muted } = useMediaState(mediaElement, {
        playing: wantedPlaying,
        muted: wantedMuted,
    });
    console.log({
        wantedPlaying,
        wantedMuted,
        muted,
        playing,
        buffering,
        showLoading,
        ready,
    });

    useEffect(() => {
        let id = null;
        setShowLoading(false);
        if ((!ready || buffering) && withLoading) {
            id = setTimeout(() => {
                setShowLoading(true);
            }, 1000);
        }
        return () => {
            setShowLoading(false);
            if (id !== null) {
                clearTimeout(id);
            }
        };
    }, [ready, buffering, withLoading, setShowLoading]);

    const [customControlsTheme, setCustomControlsTheme] = useState({
        color: getColorAsString(defaultColor),
        progressColor: getColorAsString(defaultColor),
        seekBarOnly: false,
    });

    const [wasPlaying, setWasPlaying] = useState(false);

    useEffect(() => {
        const { color, progressColor, seekBarOnly } = controlsTheme || {};
        setCustomControlsTheme({
            color: getColorAsString(color || defaultColor),
            progressColor: getColorAsString(progressColor || defaultProgressColor),
            seekBarOnly,
        });
    }, [controlsTheme, setCustomControlsTheme, defaultColor, defaultProgressColor]);

    const onPlay = useCallback(() => {
        if (wantedPlaying && !playing && mediaElement !== null) {
            mediaElement.play();
        } else {
            setPlaying(true);
        }

        if (!controlsVisible && controls) {
            showControls();
        }
    }, [setPlaying, controlsVisible, showControls, playing, wantedPlaying]);

    const onPause = useCallback(() => {
        // console.log('onPause');
        setPlaying(false);
        if (!controlsVisible && controls) {
            showControls();
        }
    }, [setPlaying, controlsVisible, controls, showControls]);

    const onMute = useCallback(() => {
        setMuted(true);
        if (!controlsVisible && controls) {
            showControls();
        }
    }, [setMuted, controlsVisible, showControls]);

    const onUnmute = useCallback(() => {
        setMuted(false);
        if (!controlsVisible && controls) {
            showControls();
        }
    }, [setMuted, controlsVisible, showControls]);

    const onSeekStart = useCallback(() => {
        setWasPlaying(playing);
        if (playing) {
            setPlaying(false);
        }
    }, [playing, setWasPlaying, setPlaying]);

    const onSeek = useCallback(
        // eslint-disable-next-line no-unused-vars
        (progress, tap = false) => {
            if (mediaElement !== null) {
                mediaElement.currentTime = progress * mediaElement.duration;
            }
            if (!controlsVisible && controls) {
                showControls();
            }
        },
        [mediaElement, controlsVisible, controls, showControls],
    );

    const onSeekEnd = useCallback(() => {
        if (wasPlaying) {
            setPlaying(true);
        }
    }, [setPlaying, wasPlaying]);

    const onSeekClick = useCallback(() => {
        if (!controlsVisible && controls) {
            showControls();
        }
    }, [controlsVisible, controls, showControls]);

    const hasMedia = mediaElement !== null;
    const mediaHasAudio = hasMedia && (hasAudio === null || hasAudio === true);
    const { color, progressColor, seekBarOnly } = customControlsTheme || {};
    const isCollapsed = (controls && !controlsVisible && playing) || (!controls && mediaHasAudio);

    const withSuggestPlay = controlsSuggestPlay && !finalShowLoading && !playing;

    const playIcon = playing ? (
        <PauseIcon className={styles.icon} color="currentColor" />
    ) : (
        <PlayIcon className={styles.icon} color="currentColor" />
    );

    return (
        <div
            className={classNames([
                styles.container,
                className,
                isCollapsed ? collapsedClassName : null,
                {
                    [styles.withPlayPause]: controls && !seekBarOnly,
                    [styles.withSuggestPlay]: withSuggestPlay,
                    [styles.withMute]: hasMedia || controls,
                    [styles.withSeekBar]: controls,
                    [styles.withSeekBarOnly]: seekBarOnly,
                    [styles.isCollapsed]: isCollapsed,
                    [styles.withoutShadow]: withoutShadow,
                    [styles.isMuted]: muted,
                },
            ])}
        >
            {withSuggestPlay ? (
                <Button
                    className={classNames([styles.suggest])}
                    style={{
                        color,
                    }}
                    onClick={playing ? onPause : onPlay}
                    focusable={controlsVisible}
                    icon={
                        <PlayIcon
                            className={classNames([styles.icon, styles.offset])}
                            color="currentColor"
                        />
                    }
                    aria-pressed={!playing}
                    aria-label={intl.formatMessage({
                        defaultMessage: 'Pause',
                        description: 'Button label',
                    })}
                    withoutBootstrapStyles
                />
            ) : null}

            <Button
                className={classNames([
                    styles.playPauseButton,
                    {
                        [styles.hidden]: withSuggestPlay && !controls,
                        [styles.loading]: finalShowLoading,
                    },
                ])}
                style={{
                    color,
                }}
                onClick={playing ? onPause : onPlay}
                focusable={controls && controlsVisible && (!seekBarOnly || !playing)}
                disabled={finalShowLoading}
                icon={
                    finalShowLoading ? (
                        <Spinner className={classNames([styles.spinner, styles.offset])} />
                    ) : (
                        playIcon
                    )
                }
                aria-pressed={!playing}
                aria-label={
                    finalShowLoading
                        ? intl.formatMessage({
                              defaultMessage: 'Loading',
                              description: 'Button label',
                          })
                        : intl.formatMessage({
                              defaultMessage: 'Pause',
                              description: 'Button label',
                          })
                }
                withoutBootstrapStyles
            />

            <SeekBar
                className={styles.seekBar}
                media={mediaElement}
                playing={playing}
                onClick={onSeekClick}
                onSeek={onSeek}
                onSeekStart={onSeekStart}
                onSeekEnd={onSeekEnd}
                focusable={controls && controlsVisible && !seekBarOnly}
                collapsed={isCollapsed}
                withSeekHead={!isCollapsed && !seekBarOnly}
                backgroundColor={color}
                progressColor={progressColor}
            />

            <Button
                className={styles.muteButton}
                style={{
                    color,
                }}
                onClick={muted ? onUnmute : onMute}
                focusable={controlsVisible || mediaHasAudio}
                icon={
                    muted ? (
                        <UnmuteIcon className={styles.icon} color="currentColor" />
                    ) : (
                        <MuteIcon className={styles.icon} color="currentColor" />
                    )
                }
                aria-pressed={!muted}
                aria-label={intl.formatMessage({
                    defaultMessage: 'Unmute',
                    description: 'Button label',
                })}
                withoutBootstrapStyles
            />
        </div>
    );
}

export default PlaybackControls;
