/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useTrackScreenMedia } from '@micromag/core/hooks';
import { ScreenElement, Transitions } from '@micromag/core/components';
import Audio from '@micromag/element-audio';
import ClosedCaptions from '@micromag/element-closed-captions';
import MediaControls from '@micromag/element-media-controls';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import CallToAction from '@micromag/element-call-to-action';

import styles from './styles.module.scss';
import { isIos } from '../../../elements/audio/node_modules/@micromag/core/utils';

const propTypes = {
    layout: PropTypes.oneOf(['middle']),
    audio: MicromagPropTypes.audioElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    audio: null,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    transitions: null,
    className: null,
};

const AudioScreen = ({
    layout, // eslint-disable-line
    audio,
    spacing,
    background,
    callToAction,
    current,
    transitions,
    className,
}) => {
    const trackScreenMedia = useTrackScreenMedia('audio');

    const { width, height, menuOverScreen } = useScreenSize();
    const {
        isPlaceholder,
        isPreview,
        isView,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();

    const { menuSize } = useViewer();
    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const [ready, setReady] = useState(isStatic || isPlaceholder);

    const backgroundPlaying = current && (isView || isEdit);
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const hasAudio = audio !== null;
    const finalAudio = hasAudio
        ? { ...audio, autoPlay: isPreview || isStatic || isCapture ? false : audio.autoPlay }
        : null;
    const { closedCaptions = null } = finalAudio || {};
    const hasClosedCaptions = closedCaptions !== null;

    const onAudioReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const apiRef = useRef();
    const { togglePlay, toggleMute, pause } = apiRef.current || {};

    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const isIOS = useMemo(() => isIos(), []);

    const onTimeUpdate = useCallback(
        (time) => {
            setCurrentTime(time);
        },
        [setDuration, duration],
    );

    const onProgressStep = useCallback(
        (step) => {
            trackScreenMedia(audio, `progress_${Math.round(step * 100, 10)}%`);
        },
        [trackScreenMedia, audio],
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
            trackScreenMedia(audio, initial ? 'play' : 'resume');
        },
        [setPlaying, trackScreenMedia, audio],
    );

    const onPause = useCallback(
        ({ midway }) => {
            setPlaying(false);
            trackScreenMedia(audio, midway ? 'pause' : 'ended');
        },
        [setPlaying, trackScreenMedia, audio],
    );

    const onVolumeChanged = useCallback(
        (isMuted) => {
            setMuted(isMuted);
            trackScreenMedia(audio, isMuted ? 'mute' : 'unmute');
        },
        [setPlaying, trackScreenMedia, audio],
    );

    const onSeeked = useCallback(
        (time) => {
            if (time > 0) {
                trackScreenMedia(audio, 'seek');
            }
        },
        [trackScreenMedia, audio],
    );

    useEffect(() => {
        if (!current && playing) {
            pause();
        }
    }, [playing, current]);

    // ------------------------------------

    const elements = [
        <Spacer key="spacer-top" />,
        <ScreenElement
            key="audio"
            placeholder="audio"
            emptyLabel={<FormattedMessage defaultMessage="Audio" description="Audio placeholder" />}
            emptyClassName={styles.empty}
            isEmpty={!hasAudio}
        >
            <Transitions
                transitions={transitions}
                playing={transitionPlaying}
                disabled={transitionDisabled}
            >
                <Audio
                    {...finalAudio}
                    ref={apiRef}
                    waveFake={isIOS || isPreview}
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
            </Transitions>
        </ScreenElement>,
        <Spacer key="spacer-middle" />,
        !isPlaceholder ? (
            <div key="controls" className={styles.bottomContent}>
                {hasClosedCaptions && !isPreview && !isCapture && !isStatic ? (
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
        ) : null,
        !isPlaceholder && hasCallToAction ? (
            <div style={{ margin: -spacing, marginTop: 0 }}>
                <CallToAction
                    key="call-to-action"
                    callToAction={callToAction}
                    animationDisabled={isPreview}
                />
            </div>
        ) : null,
    ].filter((el) => el !== null);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                },
            ])}
            data-screen-ready={ready}
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
                <Layout
                    fullscreen
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (menuOverScreen && !isPreview ? menuSize : 0) + spacing,
                              }
                            : null
                    }
                >
                    {elements}
                </Layout>
            </Container>
        </div>
    );
};

AudioScreen.propTypes = propTypes;
AudioScreen.defaultProps = defaultProps;

export default React.memo(AudioScreen);
