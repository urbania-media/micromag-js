/* eslint-disable no-unused-vars */

/* eslint-disable no-param-reassign */

/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    usePlaybackContext,
    useViewerInteraction,
} from '@micromag/core/contexts';
import { useTrackScreenMedia, useLongPress } from '@micromag/core/hooks';
import { isIos } from '@micromag/core/utils';
import Audio from '@micromag/element-audio';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['middle']),
    audio: MicromagPropTypes.audioElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    mediaRef: PropTypes.func,
    showWave: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    audio: null,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    mediaRef: null,
    showWave: false,
    className: null,
};

const AudioScreen = ({
    layout, // eslint-disable-line
    audio,
    spacing,
    background,
    callToAction,
    current,
    active,
    transitions,
    mediaRef: customMediaRef,
    showWave,
    className,
}) => {
    const trackScreenMedia = useTrackScreenMedia('audio');
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { width, height, resolution } = useScreenSize();
    const { isPlaceholder, isPreview, isView, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();
    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const [ready, setReady] = useState(isStatic || isPlaceholder);

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const hasAudio = audio !== null;
    const {
        media: audioMedia = null,
        autoPlay = true,
        closedCaptions = null,
        withPlayPause = false,
        color = null,
        progressColor = null,
    } = audio || {};

    const { url: audioUrl = null } = audioMedia || {};
    const hasAudioUrl = audioUrl !== null;

    const finalAudio = hasAudio
        ? {
              ...audio,
              autoPlay: !isPreview && !isStatic && !isCapture && autoPlay && current,
          }
        : null;
    const hasClosedCaptions = closedCaptions !== null;

    const { playing, muted, setControls, setControlsTheme, setMedia, setPlaying } =
        usePlaybackContext();
    const mediaRef = useRef(null);

    useEffect(() => {
        if (!current) {
            return () => {};
        }
        if (withPlayPause) {
            setControls(true);
            setControlsTheme({
                color,
                progressColor,
            });
        } else {
            setControls(false);
        }

        return () => {
            if (withPlayPause) {
                setControls(false);
            }
        }
    }, [current, withPlayPause, setControls, color, progressColor]);

    useEffect(() => {
        if (!current) {
            return () => {};
        }
        setMedia(mediaRef.current);
        return () => {
            setMedia(null);
        };
    }, [current]);

    useEffect(() => {
        if (customMediaRef !== null) {
            customMediaRef(mediaRef.current);
        }
    }, [mediaRef.current]);

    const onAudioReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const [currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);

    const isIOS = useMemo(() => isIos(), [isIos]);

    useEffect(() => {
        if (current && autoPlay && !playing) {
            setPlaying(true);
        }
    }, [current, autoPlay]);

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

    const onDurationChange = useCallback(
        (dur) => {
            setDuration(dur);
        },
        [setDuration],
    );

    const onPlay = useCallback(
        ({ initial }) => {
            trackScreenMedia(audio, initial ? 'play' : 'resume');
        },
        [trackScreenMedia, audio],
    );

    const onPause = useCallback(
        ({ midway }) => {
            trackScreenMedia(audio, midway ? 'pause' : 'ended');
        },
        [trackScreenMedia, audio],
    );

    const onEnded = useCallback(() => {
        setPlaying(false);
    }, [setPlaying]);

    const onSeeked = useCallback(
        (time) => {
            if (time > 0) {
                trackScreenMedia(audio, 'seek');
            }
        },
        [trackScreenMedia, audio],
    );

    const cta =
        !isPlaceholder && hasCallToAction ? (
            <div style={{ marginTop: -spacing / 2 }} key="call-to-action">
                <CallToAction
                    callToAction={callToAction}
                    animationDisabled={isPreview}
                    focusable={current && isView}
                    screenSize={{ width, height }}
                    enableInteraction={enableInteraction}
                    disableInteraction={disableInteraction}
                />
            </div>
        ) : null;

    const elements = [
        <Spacer key="spacer-top" />,
        <ScreenElement
            key="audio"
            placeholder="audio"
            emptyLabel={<FormattedMessage defaultMessage="Audio" description="Audio placeholder" />}
            emptyClassName={styles.empty}
            isEmpty={!hasAudioUrl}
        >
            <Transitions
                transitions={transitions}
                playing={transitionPlaying}
                disabled={transitionDisabled}
            >
                <Audio
                    {...finalAudio}
                    mediaRef={mediaRef}
                    waveFake={isIOS || isPreview}
                    waveProps={
                        isPreview
                            ? {
                                  sampleWidth: 10,
                                  sampleMargin: 5,
                                  minSampleHeight: 5,
                                  backgroundColor: color,
                                  progressColor,
                              }
                            : { backgroundColor: color, progressColor }
                    }
                    paused={!current || !playing}
                    muted={muted}
                    className={styles.audio}
                    onReady={onAudioReady}
                    onPlay={onPlay}
                    onPause={onPause}
                    onTimeUpdate={onTimeUpdate}
                    onProgressStep={onProgressStep}
                    onDurationChange={onDurationChange}
                    onSeeked={onSeeked}
                    onEnded={onEnded}
                    withWave={showWave}
                />
            </Transitions>
        </ScreenElement>,
        <Spacer key="spacer-middle" />,
        !isPlaceholder ? (
            <div
                key="controls"
                className={styles.bottomContent}
                style={{
                    transform: `translate(0, -${viewerBottomHeight}px)`,
                }}
            >
                {hasClosedCaptions && !isPreview && !isCapture && !isStatic ? (
                    <ClosedCaptions
                        className={styles.closedCaptions}
                        media={closedCaptions}
                        currentTime={currentTime}
                    />
                ) : null}
                {cta}
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
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    fullscreen
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
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
