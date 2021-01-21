/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useRef, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { useTrackAudio } from '@micromag/core/hooks';
import { ScreenElement, Transitions } from '@micromag/core/components';
import Audio from '@micromag/element-audio';
import ClosedCaptions from '@micromag/element-closed-captions';
import MediaControls from '@micromag/element-media-controls';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    audio: MicromagPropTypes.audioElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    audio: null,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    className: null,
};

const AudioScreen = ({
    layout,
    audio,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const trackAudio = useTrackAudio();

    const { width, height } = useScreenSize();
    const { isPlaceholder, isPreview, isView, isEdit } = useScreenRenderContext();
    const trackingEnabled = isView;

    const apiRef = useRef();
    const { togglePlay, toggleMute } = apiRef.current || {};

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
            if (trackingEnabled) {
                trackAudio(audio, `progress-${Math.round(step * 100, 10)}%`);
            }
        },
        [trackingEnabled, trackAudio, audio],
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
            if (trackingEnabled) {
                trackAudio(audio, initial ? 'play' : 'resume');
            }
        },
        [setPlaying, trackingEnabled, trackAudio, audio],
    );

    const onPause = useCallback(
        ({ midway }) => {
            setPlaying(false);
            if (trackingEnabled) {
                trackAudio(audio, midway ? 'pause' : 'ended');
            }
        },
        [setPlaying, trackingEnabled, trackAudio, audio],
    );

    const onVolumeChanged = useCallback(
        (isMuted) => {
            setMuted(isMuted);
            if (trackingEnabled) {
                trackAudio(audio, isMuted ? 'mute' : 'unmute');
            }
        },
        [setPlaying, trackingEnabled, trackAudio, audio],
    );

    const onSeeked = useCallback(
        (time) => {
            if (trackingEnabled && time > 0) {
                trackAudio(audio, 'seek');
            }
        },
        [trackingEnabled, trackAudio, audio],
    );

    // ------------------------------------

    const [ready, setReady] = useState(false);
    const transitionPlaying = current && ready;
    const transitionDisabled = !isView && !isEdit;

    const hasAudio = audio !== null;
    const finalAudio = hasAudio ? { ...audio, autoPlay: isPreview ? false : audio.autoPlay } : null;
    const { closedCaptions = null } = finalAudio || {};
    const hasClosedCaptions = closedCaptions !== null;

    const onAudioReady = useCallback(() => {
        setReady(true);
    }, []);

    const element = (
        <ScreenElement
            placeholder="audio"
            emptyLabel={<FormattedMessage defaultMessage="Audio" description="Audio placeholder" />}
            emptyClassName={styles.empty}
            isEmpty={!hasAudio}
        >
            <Transitions
                transitions={transitions}
                playing={transitionPlaying}
                fullscreen
                disabled={transitionDisabled}
            >
                <Audio
                    {...finalAudio}
                    ref={apiRef}
                    waveProps={
                        isPreview
                            ? {
                                  sampleWidth: 10,
                                  sampleMargin: 5,
                                  minSampleHeight: 5,
                              }
                            : null
                    }
                    className={styles.audio}
                    onReady={onAudioReady}
                    onPlay={onPlay}
                    onPause={onPause}
                    onTimeUpdate={onTimeUpdate}
                    onProgressStep={onProgressStep}
                    onDurationChanged={onDurationChanged}
                    onSeeked={onSeeked}
                    onVolumeChanged={onVolumeChanged}
                />
                <div className={styles.bottomContent}>
                    {hasClosedCaptions ? (
                        <ClosedCaptions
                            className={styles.closedCaptions}
                            media={closedCaptions}
                            currentTime={currentTime}
                        />
                    ) : null}
                    <MediaControls
                        className={styles.mediaControls}
                        playing={playing}
                        muted={muted}
                        onTogglePlay={togglePlay}
                        onToggleMute={toggleMute}
                    />
                </div>
            </Transitions>
        </ScreenElement>
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                    [styles[layout]]: layout !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <Layout fullscreen verticalAlign="middle">
                    {element}
                </Layout>
            </Container>
        </div>
    );
};

AudioScreen.propTypes = propTypes;
AudioScreen.defaultProps = defaultProps;

export default React.memo(AudioScreen);
