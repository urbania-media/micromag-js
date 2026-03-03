import { useState, useEffect } from 'react';

function useMediaWaveform(media, { fake = false, reduceBufferFactor = 100 } = {}) {
    const { url = null, metadata = null } = media || {};
    const { waveform = null } = metadata || {};

    const [audioLevels, setAudioLevels] = useState(null);

    useEffect(() => {
        let canceled = false;
        const AudioContext =
            typeof window !== 'undefined' ? window.AudioContext || window.webkitAudioContext : null;
        if (waveform !== null) {
            setAudioLevels(waveform.map((it) => (it + 256 / 2) / 256));
        } else if (url !== null && fake) {
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
                    const audioCtx = new AudioContext();
                    return audioCtx.decodeAudioData(arrayBuffer);
                })
                .then((buffer) => {
                    const channelsCount = buffer.numberOfChannels;
                    if (channelsCount > 0) {
                        const leftChannelData = buffer.getChannelData(0);
                        setAudioLevels(
                            leftChannelData.reduce((newArray, level) => {
                                // eslint-disable-next-line no-param-reassign
                                newArray[newArray.length] = Math.abs(level);
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
    }, [url, waveform, setAudioLevels, reduceBufferFactor, fake]);

    return audioLevels;
}

export default useMediaWaveform;
