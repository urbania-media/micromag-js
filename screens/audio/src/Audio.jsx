/* eslint-disable no-param-reassign, jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useTrackScreenMedia } from '@micromag/core/hooks';
import { getFooterProps, isFooterFilled, isHeaderFilled, isIos } from '@micromag/core/utils';
import Audio from '@micromag/element-audio';
import Background from '@micromag/element-background';
import ClosedCaptions from '@micromag/element-closed-captions';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Layout, { Spacer } from '@micromag/element-layout';

import styles from './audio.module.css';

const propTypes = {
    layout: PropTypes.oneOf(['middle']),
    audio: MicromagPropTypes.audioElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    preload: PropTypes.bool,
    mediaRef: PropTypes.func,
    showWave: PropTypes.bool,
    className: PropTypes.string,
};

const AudioScreen = ({
    layout = 'middle', // eslint-disable-line
    audio = null,
    spacing = 20,
    background = null,
    header = null,
    footer = null,
    current = true,
    preload = true,
    mediaRef: customMediaRef = null,
    showWave = true,
    className = null,
}) => {
    const { width, height, resolution } = useScreenSize();
    const { isPlaceholder, isPreview, isView, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const trackScreenMedia = useTrackScreenMedia('audio');

    const [ready, setReady] = useState(isStatic || isPlaceholder);

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || preload;
    // const transitionPlaying = current && ready;
    // const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const hasAudio = audio !== null;
    const {
        media: audioMedia = null,
        autoPlay = true,
        closedCaptions = null,
        captions = null,
        withWave = false,
        withControls = false,
        withSeekBar = false,
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
    const hasClosedCaptions = closedCaptions !== null || captions !== null;

    const { playing, muted, setControls, setControlsSuggestPlay, setControlsTheme, setPlaying } =
        usePlaybackContext();

    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current);
    const paused = !current || !playing || (!isCurrentMedia && isView);

    useEffect(() => {
        if (!current) {
            return () => {};
        }
        if (withControls || withSeekBar) {
            setControls(true);
            setControlsTheme({
                seekBarOnly: withSeekBar,
                color,
                progressColor,
            });
        } else {
            setControls(false);
        }

        return () => {
            if (withControls || withSeekBar) {
                setControls(false);
            }
        };
    }, [current, withControls, withSeekBar, setControls, color, progressColor]);

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
        ({ timeStamp = 0 }) => {
            setCurrentTime(timeStamp);
        },
        [setCurrentTime, setDuration, duration],
    );

    const onProgressStep = useCallback(
        (step, meta) => {
            trackScreenMedia(audioMedia, `progress_${Math.round(step * 100, 10)}%`, meta);
        },
        [trackScreenMedia, audioMedia],
    );

    const onDurationChange = useCallback(
        (dur) => {
            setDuration(dur);
        },
        [setDuration],
    );

    const onPlay = useCallback(
        ({ initial }) => {
            trackScreenMedia(audioMedia, initial ? 'play' : 'resume');
        },
        [trackScreenMedia, audioMedia],
    );

    const onPause = useCallback(
        ({ midway }) => {
            trackScreenMedia(audioMedia, midway ? 'pause' : 'ended');
        },
        [trackScreenMedia, audioMedia],
    );

    const onEnded = useCallback(() => {
        if (current) {
            setPlaying(false);
        }
    }, [current, setPlaying]);

    const onSeeked = useCallback(
        (time) => {
            if (time > 0) {
                trackScreenMedia(audioMedia, 'seek');
            }
        },
        [trackScreenMedia, audioMedia],
    );

    const onPlayError = useCallback(() => {
        if (isView && playing && current && hasAudio && autoPlay) {
            setPlaying(false);
            setControlsSuggestPlay(true);
        }
    }, [isView, current, playing, hasAudio, autoPlay, setPlaying, setControlsSuggestPlay]);

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
            <Container width={width} height={height} className={styles.content}>
                <Layout
                    fullscreen
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (!isPreview ? viewerTopHeight : 0) +
                                      (hasHeader ? spacing / 2 : spacing),
                              }
                            : null
                    }
                >
                    {hasHeader ? <Header {...header} /> : <Spacer key="spacer-top" />}
                    <ScreenElement
                        key="audio"
                        placeholder="audio"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Audio"
                                description="Audio placeholder"
                            />
                        }
                        emptyClassName={styles.empty}
                        isEmpty={!hasAudioUrl}
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
                            paused={paused}
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
                            onPlayError={onPlayError}
                            withWave={showWave && withWave}
                        />
                    </ScreenElement>
                    <Spacer key="spacer-middle" />
                    {!isPlaceholder ? (
                        <div
                            key="bottom"
                            className={styles.bottom}
                            style={{
                                transform:
                                    current && !isPreview
                                        ? `translate(0, -${viewerBottomHeight}px)`
                                        : null,
                                paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                                paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                                paddingBottom: spacing / 2,
                                paddingTop: 0,
                            }}
                        >
                            {hasClosedCaptions && !isPreview && !isCapture && !isStatic ? (
                                <ClosedCaptions
                                    className={styles.closedCaptions}
                                    media={closedCaptions}
                                    {...captions}
                                    currentTime={currentTime}
                                />
                            ) : null}
                            {hasFooter ? (
                                <Footer {...footerProps} className={styles.callToAction} />
                            ) : null}
                        </div>
                    ) : null}
                </Layout>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

AudioScreen.propTypes = propTypes;

export default AudioScreen;
