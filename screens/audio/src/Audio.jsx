/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useRef, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
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
    closedCaptions: MicromagPropTypes.closedCaptionsElement,
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
    closedCaptions: null,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: { in: 'fade', out: 'fade' },
    className: null,
};

const AudioScreen = ({
    layout,
    audio,
    closedCaptions,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const apiRef = useRef();
    const { togglePlay, toggleMute } = apiRef.current || {};

    // Get api state updates from callback

    const [currentTime, setCurrentTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);

    const onTimeUpdate = useCallback((time) => {
        setCurrentTime(time);
    }, [setCurrentTime]);

    const onPlayChanged = useCallback((isPlaying) => {
        setPlaying(isPlaying);
    }, [setPlaying]);

    const onMuteChanged = useCallback((isMuted) => {
        setMuted(isMuted);
    }, [setMuted]);

    // ------------------------------------

    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isEdit } = useScreenRenderContext();

    const [ready, setReady] = useState(false);
    const transitionPlaying = current && ready;

    const hasAudio = audio !== null;

    const onAudioReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const element = (
        <ScreenElement
            placeholder="audio"
            emptyLabel={<FormattedMessage defaultMessage="Audio" description="Audio placeholder" />}
            emptyClassName={styles.empty}
            isEmpty={!hasAudio}
        >
            <Transitions transitions={transitions} playing={transitionPlaying} fullscreen disabled={!isView}>
                <Audio
                    {...audio}
                    ref={apiRef}
                    className={styles.audio}
                    onReady={onAudioReady}
                    onPlayChanged={onPlayChanged}
                    onMuteChanged={onMuteChanged}
                    onTimeUpdate={onTimeUpdate}
                />
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
