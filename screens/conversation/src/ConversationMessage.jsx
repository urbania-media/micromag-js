/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { Label } from '@micromag/core/components';
import Text from '@micromag/element-text';
// import Image from '@micromag/element-image';

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
    textStyle: MicromagPropTypes.textStyle,
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
    textStyle: null,
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
    textStyle,
    className,
}) => {
    const { message: messageBody, image = null } = message || {};
    const {
        avatar: { url: avatarUrl } = {},
        name: speakerName,
        side = 'left',
        id: currentSpeakerId,
        color,
    } = currentSpeaker || {};

    const right = side === 'right';

    const IsPrevSpeakerTheSame =
        previousMessage !== null && previousMessage.speaker === currentSpeakerId;
    const IsNextSpeakerTheSame = nextMessage !== null && nextMessage.speaker === currentSpeakerId;

    // Timing
    const [messageState, setMessageState] = useState(state);
    const pauseRef = useRef(null);
    const typingRef = useRef(null);

    const setMessageStateCallback = useCallback((newState) => setMessageState(newState), [
        messageState,
        setMessageState,
    ]);

    const pauseBeforeTyping = conversationTiming;
    const typingDuration = conversationTiming + typingTiming;

    useEffect(() => {
        pauseRef.current = setTimeout(() => setMessageStateCallback('typing'), pauseBeforeTyping);
        typingRef.current = setTimeout(() => setMessageStateCallback('send'), typingDuration);
        return () => {
            clearTimeout(pauseRef.current);
            clearTimeout(typingRef.current);
        };
    }, []);

    useEffect(() => {
        if (messageState !== 'pause' && onChange !== null) {
            onChange(messageState);
        }
    }, [messageState]);

    const betweenStyle = IsNextSpeakerTheSame && nextMessageState;

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
                        <div />
                        <div />
                        <div />
                    </div>
                    <div className={styles.loadingSpeakerName}>{speakerName}</div>
                </div>
            ) : (
                <div
                    key={messageBody}
                    className={classNames([
                        styles.message,
                        {
                            [styles.normalRight]: right,
                            [styles.nextTheSame]: IsNextSpeakerTheSame === true,
                            [styles.inBetweenRight]: betweenStyle && right,
                            [styles.normalLeft]: !right,
                            [styles.inBetweenLeft]: betweenStyle && !right,
                            [styles.last]: IsNextSpeakerTheSame === false,
                        },
                    ])}
                    style={{
                        background: color,
                    }}
                >
                    {!IsPrevSpeakerTheSame ? (
                        <div
                            className={classNames([
                                styles.speakerDetails,
                                { [styles.right]: side === 'right' },
                            ])}
                        >
                            <div className={styles.avatarContainer}>
                                <img className={styles.avatar} src={avatarUrl} alt={speakerName} />
                            </div>
                            &nbsp;&nbsp;{speakerName}&nbsp;&nbsp;
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
                            textStyle={textStyle}
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
