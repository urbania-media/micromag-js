/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';
// import { Label } from '@micromag/core/components';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './conversation.module.scss';
import ConversationAudioAttachment from './ConversationAudioAttachment';

const propTypes = {
    message: MicromagPropTypes.conversationMessage,
    messageId: PropTypes.string,
    previousMessage: MicromagPropTypes.conversationMessage,
    nextMessage: MicromagPropTypes.conversationMessage,
    nextAudioMessageId: PropTypes.string,
    nextMessageState: PropTypes.bool,
    currentSpeaker: MicromagPropTypes.speaker,
    // state: PropTypes.oneOf(['pause', 'typing', 'send']),
    conversationTiming: PropTypes.number,
    typingTiming: PropTypes.number,
    onChange: PropTypes.func,
    withAnimation: PropTypes.bool,
    active: PropTypes.bool,
    isPlaying: PropTypes.bool,
    speakerStyle: MicromagPropTypes.textStyle,
    messageStyle: MicromagPropTypes.textStyle,
    className: PropTypes.string,
    audioEventsChannelName: PropTypes.string,
};

const defaultProps = {
    message: null,
    messageId: null,
    previousMessage: null,
    nextMessage: null,
    nextAudioMessageId: null,
    nextMessageState: null,
    currentSpeaker: null,
    conversationTiming: null,
    typingTiming: null,
    onChange: null,
    withAnimation: false,
    active: false,
    isPlaying: false,
    messageStyle: null,
    speakerStyle: null,
    className: null,
    audioEventsChannelName: null
};

const ConversationMessage = ({
    message,
    messageId,
    previousMessage,
    nextMessage,
    nextAudioMessageId,
    nextMessageState,
    currentSpeaker,
    conversationTiming,
    typingTiming,
    onChange,
    withAnimation,
    active,
    isPlaying,
    messageStyle,
    speakerStyle,
    className,
    audioEventsChannelName,
}) => {
    const { message: messageBody, image = null, audio } = message || {};
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
    const [messageState, setMessageState] = useState(withAnimation ? 'pause' : 'send');

    const pauseBeforeTyping = conversationTiming;
    const typingDuration = typingTiming;

    useEffect(() => {
        if (!withAnimation || !isPlaying) {
            return () => {};
        }
        let timeout = null;
        if (messageState === 'pause') {
            timeout = setTimeout(() => setMessageState('typing'), pauseBeforeTyping);
        } else if (messageState === 'typing') {
            timeout = setTimeout(() => setMessageState('send'), typingDuration);
        }
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [
        withAnimation,
        isPlaying,
        messageState,
        setMessageState,
        pauseBeforeTyping,
        typingDuration,
    ]);

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
                    [styles.withAnimation]: withAnimation === true,
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
                            [styles.nextTheSame]:
                                isNextSpeakerTheSame === true && isPrevSpeakerTheSame,
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
                                        loading="lazy"
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
                                <Visual
                                    media={image}
                                    width="100%"
                                    playing={isPlaying}
                                    active={active}
                                />
                            </div>
                        ) : null}
                        <Text
                            className={styles.messageBody}
                            body={messageBody}
                            textStyle={messageStyle}
                        />
                        {audio ? (
                            <ConversationAudioAttachment
                                audio={audio}
                                messageId={messageId}
                                nextAudioMessageId={nextAudioMessageId}
                                audioEventsChannelName={audioEventsChannelName}
                            />
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    ) : null;
};

ConversationMessage.propTypes = propTypes;
ConversationMessage.defaultProps = defaultProps;

export default ConversationMessage;
