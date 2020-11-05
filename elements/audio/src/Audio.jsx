/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.audioMedia,
    apiRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    // track: PropTypes.string,
    initialMuted: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    apiRef: null,
    // track: null,
    initialMuted: false,
    autoPlay: false,
    loop: false,
    className: null,
};

const Audio = ({
    media: audioField,
    apiRef,
    // track,
    initialMuted,
    autoPlay,
    loop,
    className,
}) => {
    const { url = null } = audioField || {};

    const finalStyle = {};
    const audioRef = useRef(null);

    const [muted, setMuted] = useState(initialMuted);

    const playerApi = useMemo(
        () => ({
            play: () => {
                if (audioRef.current !== null) {
                    audioRef.current.play();
                }
            },
            pause: () => {
                if (audioRef.current !== null) {
                    audioRef.current.pause();
                }
            },
            stop: () => {
                if (audioRef.current !== null) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            },
            seek: (time) => {
                if (audioRef.current !== null) {
                    audioRef.current.currentTime = time;
                }
            },
            mute: () => {
                if (audioRef.current !== null) {
                    setMuted(true);
                }
            },
            unMute: () => {
                if (audioRef.current !== null) {
                    setMuted(false);
                }
            },
            duration: audioRef.current !== null ? audioRef.current.duration : null,
            currentTime: audioRef.current !== null ? audioRef.current.currentTime : null,
            muted,
        }),
        [muted, setMuted],
    );

    if (apiRef !== null) {
        apiRef.current = playerApi;
    }

    // get amplitude levels
    const [amplitudeLevels, setAmplitudeLevels] = useState(null);

    useEffect(() => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            const audioData = request.response;
            audioCtx.decodeAudioData(
                audioData,
                (buffer) => {
                    const amplitudes = [];
                    // const channelsCount = buffer.numberOfChannels;
                    // const channelsData = [...new Array(channelsCount)].map( (channel, channelI) => buffer.getChannelData(channelI)) ;
                    const firstChannelData = buffer.getChannelData(0);
                    const samplesCount = 50;
                    const sampleSize = Math.floor(firstChannelData.length / samplesCount);

                    for (let sampleI = 0; sampleI < samplesCount; sampleI += 1) {
                        const sampleStart = sampleSize * sampleI;
                        let sum = 0;
                        for (let sampleSizeI = 0; sampleSizeI < sampleSize; sampleSizeI += 1) {
                            sum += Math.abs(firstChannelData[sampleStart + sampleSizeI]);
                        }
                        amplitudes.push(sum / sampleSize);
                    }

                    const normalizedAmplitudes = amplitudes.map(n => n * (Math.max(...amplitudes) **  -1));

                    console.log('normalized audio amplitudes:', normalizedAmplitudes);

                    setAmplitudeLevels(normalizedAmplitudes);
                },
                (e) => {
                    console.log('unabled to decode audio', e.err);
                },
            );
        };
        request.send();
    }, [url]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            <audio ref={audioRef} src={url} autoPlay={autoPlay} loop={loop} muted={muted} />
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Audio apiRef={ref} {...props} />);
