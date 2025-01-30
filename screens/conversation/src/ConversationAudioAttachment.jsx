/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, PauseIcon, PlayIcon } from '@micromag/core/components';
import Audio from '@micromag/element-audio';

import styles from './conversation.module.scss';

const propTypes = {
    audio: MicromagPropTypes.audioMedia,
    audioEventsChannelName: PropTypes.string,
    messageId: PropTypes.string,
    nextAudioMessageId: PropTypes.string,
};

const defaultProps = {
    audio: null,
    audioEventsChannelName: null,
    messageId: null,
    nextAudioMessageId: null,
};

const ConversationAudioAttachment = ({
    audio,
    audioEventsChannelName,
    messageId,
    nextAudioMessageId,
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
        <div className={classNames([styles.audioMessageContainer])}>
            <div className={styles.playButtonContainer}>
                <Button
                    onClick={togglePaused}
                    icon={
                        paused ? (
                            <PlayIcon className={styles.icon} />
                        ) : (
                            <PauseIcon className={styles.icon} />
                        )
                    }
                />
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
        </div>
    );
};

ConversationAudioAttachment.propTypes = propTypes;
ConversationAudioAttachment.defaultProps = defaultProps;

export default ConversationAudioAttachment;
