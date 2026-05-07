import classNames from 'classnames';
import { useEffect, useState } from 'react';
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
        mediaSrc,
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
        seekByProgress,
    } = usePlaybackContext();

    const [showLoading, setShowLoading] = useState(false);
    const mediaReady = useMediaReady(mediaElement, {
        id: mediaSrc,
    });
    const ready = mediaElement === null || mediaReady;
    const finalShowLoading = showLoading && !ready;

    const { buffering, playing, muted } = useMediaState(mediaElement, {
        playing: wantedPlaying,
        muted: wantedMuted,
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

    const {
        color: themeColor,
        progressColor: themeProgressColor,
        seekBarOnly: themeSeekbarOnly,
    } = controlsTheme || {};
    const color = getColorAsString(themeColor || defaultColor);
    const progressColor = getColorAsString(themeProgressColor || defaultProgressColor);
    const seekBarOnly = themeSeekbarOnly;

    const [wasPlaying, setWasPlaying] = useState(false);

    const onPlay = () => {
        if (wantedPlaying && !playing && mediaElement !== null) {
            mediaElement.play();
        } else {
            setPlaying(true);
        }

        if (!controlsVisible && controls) {
            showControls();
        }
    };

    const onPause = () => {
        // console.log('onPause');
        setPlaying(false);
        if (!controlsVisible && controls) {
            showControls();
        }
    };

    const onMute = () => {
        setMuted(true);
        if (!controlsVisible && controls) {
            showControls();
        }
    };

    const onUnmute = () => {
        setMuted(false);
        if (!controlsVisible && controls) {
            showControls();
        }
    };

    const onSeekStart = () => {
        setWasPlaying(playing);
        if (playing) {
            setPlaying(false);
        }
    };

    const onSeek = (progress, tap = false) => {
        seekByProgress(progress);
        if (!controlsVisible && controls) {
            showControls();
        }
    };

    const onSeekEnd = () => {
        if (wasPlaying) {
            setPlaying(true);
        }
    };

    const onSeekClick = () => {
        if (!controlsVisible && controls) {
            showControls();
        }
    };

    const hasMedia = mediaElement !== null;
    const mediaHasAudio = hasMedia && (hasAudio === null || hasAudio === true);
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
