/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { ForwardedRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { v1 as uuid } from 'uuid';

import type {
    BackgroundElement,
    Conversation as ConversationType,
    Footer as FooterConfig,
    Header as HeaderConfig,
    HeadingElement,
    MediaElement,
    Transitions as TransitionsConfig,
} from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import {
    getFooterProps,
    isFooterFilled,
    isHeaderFilled,
    isTextFilled,
    mergeRefs,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';

import ConversationMessage from './ConversationMessage';

import styles from './conversation.module.css';

interface ConversationScreenProps {
    title?: HeadingElement | null;
    timing?: 'instant' | 'sequence';
    readingSpeed?: number;
    spacing?: number;
    background?: BackgroundElement | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    current?: boolean;
    preload?: boolean;
    type?: string | null;
    conversation?: ConversationType | null;
    transitions?: TransitionsConfig | null;
    mediaRef?: ForwardedRef<MediaElement> | null;
    className?: string | null;
}

function ConversationScreen({
    // layout,
    title = null,

    timing: timingMode = 'sequence',
    readingSpeed = 255,
    spacing = 20,
    background = null,
    header = null,
    footer = null,
    current = true,
    preload = true,
    type = null,
    conversation = null,
    transitions = null,
    mediaRef: customMediaRef = null,
    className = null,
}: ConversationScreenProps) {
    const { width, height, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const trackScreenEvent = useTrackScreenEvent(type);
    const { muted } = usePlaybackContext();
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current, true);

    const audioEventsChannel = new BroadcastChannel(`conversation_${uuid()}_audioEvents`);

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const mediaShouldLoad = current || preload;
    const withAnimation = isView && !isStatic && timingMode === 'sequence';
    const { speakers = null, messages = [], messageStyle, speakerStyle } = conversation || {};

    const [conversationState, setConversationState] = useState([]);
    const chatBottomRef = useRef(null);

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const hasTitle = isTextFilled(title);

    const { ref: contentRef, height: scrollHeight } = useDimensionObserver();

    const scrollRef = useRef(null);
    const [scrolledBottom, setScrolledBottom] = useState(false);
    useEffect(() => {
        if (withAnimation && scrollRef.current !== null && scrolledBottom) {
            scrollRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
        }
    }, [scrollHeight, withAnimation]);

    const animationFinished = messages.length === conversationState.length;
    const conversationStateChange = useCallback(
        (state) => {
            const newConversationState = [...conversationState];
            if (state === 'send') {
                newConversationState.push(true);
                setConversationState(newConversationState);
            }
        },
        [conversationState, setConversationState],
    );

    // sequence timings
    const defaultHesitationDelay = 1500;
    const imageReadDelay = 5000; // 5 seconds
    const millisecondsPerWord = (60 * 1000) / readingSpeed;
    const filteredMessages = (messages || []).filter((m) => m !== null);

    const timings = filteredMessages.map((messageParams, messageIndex) => {
        if (messageIndex === 0) {
            return 0;
        }

        const {
            timing = null,
            message = null,
            image,
            audio,
            timingOverrides,
        } = messageParams || {};
        if (timing !== null) {
            return timing;
        }

        if (timingOverrides?.enabled && Number.isFinite(timingOverrides?.writingDuration)) {
            return timingOverrides.writingDuration * 1000; // seconds to milliseconds
        }

        // if the current message has an audio attachment, use the time it takes to record that message
        if (audio) {
            return audio.metadata?.duration;
        }

        // counting words: only keep whitespaces and alphanumeric characters, then split of whitespaces
        const wordCount = message
            ? message
                  .replace(/[^\w\d\s]/g, '')
                  .trim()
                  .split(/\s/g).length
            : 0;

        let finalTimeMs = wordCount * millisecondsPerWord;

        // if the message includes an image, add some more time to "read" it
        if (image) {
            finalTimeMs += imageReadDelay;
        }

        return finalTimeMs;
    });

    const hesitationTimings = filteredMessages.map((messageParams, messageIndex) => {
        const { timingOverrides } = messageParams;
        if (
            messageIndex !== 0 &&
            timingOverrides?.enabled &&
            Number.isFinite(timingOverrides?.appearDelay)
        ) {
            return timingOverrides.appearDelay * 1000; // seconds to milliseconds
        }

        return defaultHesitationDelay;
    });
    const messagesUniqueId = useMemo(() => (messages || []).map(() => uuid()), [messages]);

    // scroll
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const showFooter = (animationFinished && !isPlaceholder && hasFooter) || !withAnimation;

    const onScrolledBottom = useCallback(
        ({ initial }) => {
            if (initial) {
                trackScreenEvent('scroll', 'Screen');
            }
            setScrolledBottom(true);
        },
        [trackScreenEvent],
    );
    const onScrolledNotBottom = useCallback(() => {
        setScrolledBottom(false);
    }, [setScrolledBottom]);

    const onScrolledTrigger = useCallback(
        (trigger = null) => {
            if (trigger !== null) {
                const scrollPercent = Math.round(trigger * 100);
                trackScreenEvent('scroll', scrollPercent, { scrollPercent });
            }
        },
        [trackScreenEvent],
    );

    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    ref={scrollRef}
                    disabled={scrollingDisabled}
                    onScrolledTrigger={onScrolledTrigger}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    withShadow
                >
                    <div ref={contentRef}>
                        <Layout
                            className={styles.layout}
                            style={
                                !isPlaceholder
                                    ? {
                                          paddingLeft: spacing,
                                          paddingRight: spacing,
                                          paddingTop:
                                              (!isPreview ? viewerTopHeight : 0) + spacing / 2,
                                          paddingBottom:
                                              (current && !isPreview ? viewerBottomHeight : 0) +
                                              spacing / 2,
                                      }
                                    : null
                            }
                        >
                            {!isPlaceholder && hasHeader ? (
                                <div
                                    key="header"
                                    style={{
                                        paddingBottom: spacing,
                                    }}
                                >
                                    <Header {...header} />
                                </div>
                            ) : null}
                            <ScreenElement
                                placeholder="conversation"
                                emptyLabel={
                                    <FormattedMessage
                                        defaultMessage="Conversation"
                                        description="Conversation placeholder"
                                    />
                                }
                                emptyClassName={styles.empty}
                                isEmpty={messages.length === 0 && title === null}
                            >
                                <Transitions
                                    transitions={transitions}
                                    playing={current}
                                    disabled={transitionDisabled}
                                    // delay={0}
                                >
                                    {hasTitle ? (
                                        <Heading
                                            {...title}
                                            className={styles.title}
                                            isEmpty={title === null}
                                        />
                                    ) : null}
                                    <div className={styles.conversation}>
                                        {filteredMessages.map((m, messageI) => {
                                            const previousMessage =
                                                messageI !== 0 ? messages[messageI - 1] : null;

                                            const nextMessage =
                                                messageI + 1 < messages.length
                                                    ? messages[messageI + 1]
                                                    : null;

                                            const { speaker } = m;

                                            const currentSpeaker =
                                                (speakers || []).find((s) => s.id === speaker) ||
                                                null;

                                            const shouldPlay =
                                                messageI === 0 ||
                                                conversationState[messageI - 1] === true;

                                            const pauseTiming = hesitationTimings[messageI];

                                            const typingTiming = timings[messageI];

                                            const messageId = `${m.message}-${messagesUniqueId[messageI]}`;

                                            const nextAudioMessage = filteredMessages
                                                .slice(messageI + 1)
                                                .find((c) => c.audio != null);
                                            const nextAudioMessageId = nextAudioMessage
                                                ? `${m.message}-${
                                                      messagesUniqueId[
                                                          filteredMessages.indexOf(nextAudioMessage)
                                                      ]
                                                  }`
                                                : null;

                                            return (
                                                <ConversationMessage
                                                    key={messageId}
                                                    message={m}
                                                    messageId={messageId}
                                                    previousMessage={previousMessage}
                                                    nextMessage={nextMessage}
                                                    nextAudioMessageId={nextAudioMessageId}
                                                    nextMessageState={
                                                        conversationState[messageI + 1] ||
                                                        !withAnimation
                                                    }
                                                    currentSpeaker={currentSpeaker}
                                                    conversationTiming={pauseTiming}
                                                    typingTiming={typingTiming}
                                                    onChange={conversationStateChange}
                                                    withAnimation={withAnimation}
                                                    isPlaying={current && shouldPlay}
                                                    shouldLoad={mediaShouldLoad}
                                                    withoutVideo={isPreview}
                                                    messageStyle={messageStyle}
                                                    speakerStyle={speakerStyle}
                                                    audioEventsChannelName={audioEventsChannel.name}
                                                />
                                            );
                                        })}
                                    </div>
                                    {showFooter ? (
                                        <div
                                            className={classNames([
                                                styles.footer,
                                                {
                                                    [styles.disabled]: !scrolledBottom,
                                                },
                                            ])}
                                            style={{
                                                paddingLeft: Math.max(
                                                    viewerBottomSidesWidth - spacing,
                                                    0,
                                                ),
                                                paddingRight: Math.max(
                                                    viewerBottomSidesWidth - spacing,
                                                    0,
                                                ),
                                                paddingTop: spacing,
                                            }}
                                        >
                                            <Footer {...footerProps} />
                                        </div>
                                    ) : null}
                                    <div ref={chatBottomRef} />
                                </Transitions>
                            </ScreenElement>
                        </Layout>
                    </div>
                </Scroll>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    mediaRef={mergeRefs(mediaRef, customMediaRef)}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
}

export default ConversationScreen;
