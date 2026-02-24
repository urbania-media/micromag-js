/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, PauseIcon, PlayIcon } from '@micromag/core/components';
import Audio from '@micromag/element-audio';

import styles from './conversation.module.css';

const propTypes = {
    audio: MicromagPropTypes.audioMedia,
    audioEventsChannelName: PropTypes.string,
    messageId: PropTypes.string,
    nextAudioMessageId: PropTypes.string,
    className: PropTypes.string,
};

const ConversationAudioAttachment = ({
    audio = null,
    audioEventsChannelName = null,
    messageId = null,
    nextAudioMessageId = null,
    className = null,
}) => {
    const [paused, setPaused] = useState(true);

    const audioEventsChannel = useMemo(
        () => new BroadcastChannel(audioEventsChannelName),
        [audioEventsChannelName],
    );

    useEffect(() => {
        const onMessage = (message) => {
            const { type, id } = message.data;

            switch (type) {
                case 'play':
                    setPaused(id !== messageId);
                    break;

                default:
                    break;
            }
        };

        audioEventsChannel.addEventListener('message', onMessage);
        return () => audioEventsChannel.removeEventListener('message', onMessage);
    }, [audioEventsChannel]);

    const togglePaused = () => {
        if (paused) {
            setPaused(false);
            audioEventsChannel.postMessage({
                type: 'play',
                id: messageId,
            });
        } else {
            setPaused(true);
        }
    };

    const onAudioEnded = () => {
        if (nextAudioMessageId) {
            audioEventsChannel.postMessage({
                type: 'play',
                id: nextAudioMessageId,
            });
        }
        setPaused(true);
    };

    return (
        <div className={classNames([styles.audioMessageContainer, className])}>
            <div className={styles.playButtonContainer}>
                {paused ? (
                    <PlayIcon className={styles.icon} />
                ) : (
                    <PauseIcon className={styles.icon} />
                )}
            </div>
            <Audio
                withWave
                autoWaveHeight
                className={styles.audioMessage}
                media={audio}
                paused={paused}
                updateInterval={100}
                onEnded={onAudioEnded}
            />
            <Button onClick={togglePaused} className={styles.button} />
        </div>
    );
};

ConversationAudioAttachment.propTypes = propTypes;

export default ConversationAudioAttachment;
