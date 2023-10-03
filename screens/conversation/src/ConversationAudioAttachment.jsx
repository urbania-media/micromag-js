/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './conversation.module.scss';
import { Button, PlayIcon, PauseIcon } from '@micromag/core/components';
import Audio from '@micromag/element-audio';
import classNames from 'classnames';

const propTypes = {
    audio: MicromagPropTypes.audioMedia
};

const defaultProps = {
    audio: null
};

const ConversationAudioAttachment = ({
    audio
}) => {
    const [paused, setPaused] = useState(true)

    const togglePaused = () => {
        setPaused(!paused)
    }

    return <div className={classNames([
        styles.audioMessageContainer
    ])}>
        <div className={styles.playButtonContainer}>
            <Button
                onClick={togglePaused}
                icon={paused ? <PlayIcon /> : <PauseIcon />}
            />
        </div>
        <Audio withWave autoWaveHeight
            className={styles.audioMessage}
            media={audio}
            paused={paused}
            updateInterval={100}
        />
    </div>
};

ConversationAudioAttachment.propTypes = propTypes;
ConversationAudioAttachment.defaultProps = defaultProps;

export default ConversationAudioAttachment;
