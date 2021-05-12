/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { Label } from '@micromag/core/components';
import Text from '@micromag/element-text';
// import Image from '@micromag/element-image';
import { getStyleFromColor } from '@micromag/core/utils';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    message: MicromagPropTypes.message,
    previousMessage: MicromagPropTypes.message,
    nextMessage: MicromagPropTypes.message,
    nextMessageState: PropTypes.bool,
    currentSpeaker: MicromagPropTypes.speaker,
    state: PropTypes.oneOf(['pause', 'typing', 'send']),
    conversationTiming: PropTypes.number,
    typingTiming: PropTypes.number,
    onChange: PropTypes.func,
    isView: PropTypes.bool,
    speakerStyle: MicromagPropTypes.textStyle,
    messageStyle: MicromagPropTypes.textStyle,
    className: PropTypes.string,
};

const defaultProps = {
    message: null,
    previousMessage: null,
    nextMessage: null,
    nextMessageState: null,
    currentSpeaker: null,
    state: 'pause',
    conversationTiming: null,
    typingTiming: null,
    onChange: null,
    isView: PropTypes.bool,
    messageStyle: null,
    speakerStyle: null,
    className: null,
};

const ConversationMessage = ({
    message,
    previousMessage,
    nextMessage,
    nextMessageState,
    currentSpeaker,
    state,
    conversationTiming,
    typingTiming,
    onChange,
    isView,
    messageStyle,
    speakerStyle,
    className,
}) => {
    const { message: messageBody, image = null } = message || {};
    const {
        avatar: { url: avatarUrl = null } = {},
        name: speakerName,
        side = 'left',
        id: currentSpeakerId,
        color,
    } = currentSpeaker || {};

    const right = side === 'right';

    const isPrevSpeakerTheSame =
        previousMessage !== null && previousMessage.speaker === currentSpeakerId;
    const isNextSpeakerTheSame = nextMessage !== null && nextMessage.speaker === currentSpeakerId;

    // Timing
    const [messageState, setMessageState] = useState(isView ? state : 'send');

    const setMessageStateCallback = useCallback((newState) => setMessageState(newState), [
        messageState,
        setMessageState,
    ]);

    const pauseBeforeTyping = conversationTiming;
    const typingDuration = conversationTiming + typingTiming;

    useEffect(() => {
        let pauseTimeout;
        let typingTimeout;

        if (isView) {
            pauseTimeout = setTimeout(() => setMessageStateCallback('typing'), pauseBeforeTyping);
            typingTimeout = setTimeout(() => setMessageStateCallback('send'), typingDuration);
        }

        return () => {
            if (isView) {
                clearTimeout(pauseTimeout);
                clearTimeout(typingTimeout);
            }
        };
    }, []);

    useEffect(() => {
        if (messageState !== 'pause' && onChange !== null) {
            onChange(messageState);
        }
    }, [messageState]);

    const betweenStyle = isNextSpeakerTheSame && nextMessageState;

    return messageState !== 'pause' ? (
        <div
            className={classNames([
                styles.messageContainer,
                {
                    [className]: className !== null,
                    [styles.isView]: isView === true,
                    [styles.right]: right,
                },
            ])}
        >
            {messageState === 'typing' ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.loading}>
                        <div className={styles.dot} />
                        <div className={styles.dot} />
                        <div className={styles.dot} />
                    </div>
                    <div className={styles.loadingSpeakerName}>{speakerName}</div>
                </div>
            ) : (
                <div
                    className={classNames([
                        styles.message,
                        {
                            [styles.normalRight]: right,
                            [styles.nextTheSame]: isNextSpeakerTheSame === true,
                            [styles.inBetweenRight]: betweenStyle && right,
                            [styles.normalLeft]: !right,
                            [styles.inBetweenLeft]: betweenStyle && !right,
                            [styles.last]: isNextSpeakerTheSame === false,
                        },
                    ])}
                    style={{ ...getStyleFromColor(color) }}
                >
                    {!isPrevSpeakerTheSame ? (
                        <div
                            className={classNames([
                                styles.speakerDetails,
                                { [styles.right]: side === 'right' },
                            ])}
                        >
                            {avatarUrl !== null ? (
                                <div
                                    className={classNames([
                                        styles.avatarContainer,
                                        { [styles.right]: side === 'right' },
                                    ])}
                                >
                                    <img
                                        className={styles.avatar}
                                        src={avatarUrl}
                                        alt={speakerName}
                                    />
                                </div>
                            ) : null}
                            <Text body={speakerName} textStyle={speakerStyle} />
                        </div>
                    ) : null}
                    <div />
                    <div className={styles.messageBody}>
                        {image !== null ? (
                            <div className={styles.imageContainer}>
                                <img src={image.url} alt={{ messageBody }} />
                            </div>
                        ) : null}
                        <Text
                            className={styles.messageBody}
                            body={messageBody}
                            textStyle={messageStyle}
                        />
                    </div>
                </div>
            )}
        </div>
    ) : null;
};

ConversationMessage.propTypes = propTypes;
ConversationMessage.defaultProps = defaultProps;

export default ConversationMessage;
