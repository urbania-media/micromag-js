/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import type { ConversationMessage as ConversationMessageType, Speaker, TextStyle } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';
// import { Label } from '@micromag/core/components';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import ConversationAudioAttachment from './ConversationAudioAttachment';

import styles from './conversation.module.css';

interface ConversationMessageProps {
    message?: ConversationMessageType;
    messageId?: string;
    previousMessage?: ConversationMessageType;
    nextMessage?: ConversationMessageType;
    nextAudioMessageId?: string;
    nextMessageState?: boolean;
    currentSpeaker?: Speaker;
    conversationTiming?: number;
    typingTiming?: number;
    onChange?: (...args: unknown[]) => void;
    withAnimation?: boolean;
    active?: boolean;
    isPlaying?: boolean;
    speakerStyle?: TextStyle;
    messageStyle?: TextStyle;
    className?: string;
    audioEventsChannelName?: string;
}

const ConversationMessage = ({
    message = null,
    messageId = null,
    previousMessage = null,
    nextMessage = null,
    nextAudioMessageId = null,
    nextMessageState = null,
    currentSpeaker = null,
    conversationTiming = null,
    typingTiming = null,
    onChange = null,
    withAnimation = false,
    active = false,
    isPlaying = false,
    messageStyle = null,
    speakerStyle = null,
    className = null,
    audioEventsChannelName = null,
}) => {
    const { message: messageBody, image = null, audio, putAudioBeforeText } = message || {};
    const {
        avatar = null,
        name: speakerName,
        side = 'left',
        id: currentSpeakerId,
        color,
    } = currentSpeaker || {};
    const { url: avatarUrl = null } = avatar || {};

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

                        {audio && putAudioBeforeText ? (
                            <ConversationAudioAttachment
                                audio={audio}
                                messageId={messageId}
                                nextAudioMessageId={nextAudioMessageId}
                                audioEventsChannelName={audioEventsChannelName}
                                className={classNames(styles.audioAttachment, styles.beforeText)}
                            />
                        ) : null}
                        <Text
                            className={styles.messageText}
                            body={messageBody}
                            textStyle={messageStyle}
                        />
                        {audio && !putAudioBeforeText ? (
                            <ConversationAudioAttachment
                                audio={audio}
                                messageId={messageId}
                                nextAudioMessageId={nextAudioMessageId}
                                audioEventsChannelName={audioEventsChannelName}
                                className={classNames(styles.audioAttachment, styles.afterText)}
                            />
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    ) : null;
};

export default ConversationMessage;
