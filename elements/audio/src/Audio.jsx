/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useUserInteracted } from '@micromag/core/contexts';
import { useMediaApi } from '@micromag/core/hooks';
import AudioWave from './AudioWave';
import styles from './styles/audio.module.scss';

const propTypes = {
    media: MicromagPropTypes.audioMedia,
    apiRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    initialMuted: PropTypes.oneOf(['auto', true, false]),
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    waveFake: PropTypes.bool,
    waveProps: PropTypes.shape({
        sampleWidth: PropTypes.number,
        sampleMargin: PropTypes.number,
        minSampleHeight: PropTypes.number,
    }),
    showWave: PropTypes.bool,
    reduceBufferFactor: PropTypes.number,
    className: PropTypes.string,
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onEnded: PropTypes.func,
    onSeeked: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onProgressStep: PropTypes.func,
    onDurationChanged: PropTypes.func,
    onVolumeChanged: PropTypes.func,
};

const defaultProps = {
    media: null,
    apiRef: null,
    initialMuted: 'auto',
    autoPlay: false,
    loop: false,
    waveFake: false,
    waveProps: null,
    showWave: false,
    reduceBufferFactor: 100,
    className: null,
    onReady: null,
    onPlay: null,
    onPause: null,
    onEnded: null,
    onSeeked: null,
    onTimeUpdate: null,
    onProgressStep: null,
    onDurationChanged: null,
    onVolumeChanged: null,
};

const Audio = ({
    media,
    apiRef,
    initialMuted,
    autoPlay,
    loop,
    waveFake,
    waveProps,
    showWave,
    reduceBufferFactor,
    className,
    onReady,
    onPlay,
    onPause,
    onEnded,
    onSeeked,
    onTimeUpdate,
    onProgressStep,
    onDurationChanged,
    onVolumeChanged,
}) => {
    const { url = null, metadata = null } = media || {};
    const { waveform = null } = metadata || {};
    const userInteracted = useUserInteracted();
    const finalInitialMuted =
        initialMuted === true || (initialMuted === 'auto' && autoPlay && !userInteracted);

    const { ref, ...api } = useMediaApi({
        url,
        initialMuted: finalInitialMuted,
        onPlay,
        onPause,
        onEnded,
        onSeeked,
        onTimeUpdate,
        onProgressStep,
        onDurationChanged,
        onVolumeChanged,
    });

    if (apiRef !== null) {
        apiRef.current = api;
        apiRef.current.mediaRef = ref;
    }

    const {
        currentTime,
        duration,
        playing,
        seek,
        ready: audioReady,
        play,
        pause,
        muted,
        unMute,
    } = api;

    const [audioLevels, setAudioLevels] = useState(null);
    const [blobUrl, setBlobUrl] = useState(null);

    useEffect(() => {
        let canceled = false;
        const AudioContext =
            typeof window !== 'undefined' ? window.AudioContext || window.webkitAudioContext : null;
        if (waveform !== null) {
            setAudioLevels(waveform.map((it) => (it + 256 / 2) / 256));
        } else if (url !== null && waveFake) {
            const fakeLength = 1000;
            setAudioLevels([...new Array(fakeLength)].map(() => Math.random()));
        } else if (url !== null && AudioContext !== null) {
            fetch(url, {
                mode: 'cors',
            })
                .then((response) => {
                    if (canceled) {
                        throw new Error('Audio loading canceled');
                    }
                    return response.arrayBuffer();
                })
                .then((arrayBuffer) => {
                    if (canceled) {
                        throw new Error('Audio loading canceled');
                    }
                    setBlobUrl(URL.createObjectURL(new Blob([arrayBuffer])));
                    const audioCtx = new AudioContext();
                    return audioCtx.decodeAudioData(arrayBuffer);
                })
                .then((buffer) => {
                    const channelsCount = buffer.numberOfChannels;
                    if (channelsCount > 0) {
                        const leftChannelData = buffer.getChannelData(0);
                        setAudioLevels(
                            leftChannelData.reduce((newArray, level, levelIndex) => {
                                // if (levelIndex % reduceBufferFactor === 0) {
                                //     console.log(level, (level + 1) / 2);
                                newArray[newArray.length] = Math.abs(level);
                                // }
                                return newArray;
                            }, []),
                        );
                    }
                })
                .catch((e) => {
                    throw e;
                });
        }

        return () => {
            if (url === null) {
                canceled = true;
            }
        };
    }, [url, waveform, setAudioLevels, setBlobUrl, reduceBufferFactor, waveFake]);

    const ready = waveFake || (audioReady && blobUrl !== null);

    useEffect(() => {
        if (ready && onReady !== null) {
            onReady();
        }
    }, [ready, onReady]);

    useEffect(() => {
        if (autoPlay) {
            play();
            if (initialMuted === 'auto' && muted && userInteracted) {
                unMute();
            }
        } else {
            pause();
        }
    }, [autoPlay]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <audio
                key={url}
                ref={ref}
                src={waveFake ? url : blobUrl}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                crossOrigin="anonymous"
                preload="none"
            />
            {showWave ? (
                <AudioWave
                    className={styles.wave}
                    media={media}
                    currentTime={currentTime}
                    {...waveProps}
                    duration={duration}
                    playing={playing}
                    onSeek={seek}
                    onResume={play}
                    audioLevels={audioLevels}
                />
            ) : null}
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Audio apiRef={ref} {...props} />);
