/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { v1 as uuid } from 'uuid';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled, isHeaderFilled, isFooterFilled, getFooterProps } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';

import ConversationMessage from './ConversationMessage';

import styles from './conversation.module.scss';

const propTypes = {
    // id: PropTypes.string,
    // layout: PropTypes.oneOf(['normal']),
    title: MicromagPropTypes.headingElement,
    timing: PropTypes.oneOf(['instant', 'sequence']),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    active: PropTypes.bool,
    type: PropTypes.string,
    conversation: MicromagPropTypes.conversation,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    // layout: 'normal',
    title: null,
    timing: 'sequence',
    spacing: 20,
    background: null,
    header: null,
    footer: null,
    current: true,
    active: true,
    type: null,
    conversation: null,
    transitions: null,
    className: null,
};

const ConversationScreen = ({
    // layout,
    title,
    timing: timingMode,
    spacing,
    background,
    header,
    footer,
    current,
    active,
    type,
    conversation,
    transitions,
    className,
}) => {
    const { width, height, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const trackScreenEvent = useTrackScreenEvent(type);
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;
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
    useEffect(() => {
        if (withAnimation && scrollRef.current !== null) {
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
    const readSpeed = 255; // Words Per Minute
    const defaultHesitationDelay = 1000;
    const imageReadDelay = 5000; // 5 seconds
    const millisecondsPerWord = ((60 * 1000) / readSpeed);
    const filteredMessages = (messages || []).filter((m) => m !== null);
    const timings = filteredMessages.map((messageParams, messageI) => {
        const { timing = null, message = null } = messageParams || {};
        if (timing !== null) {
            return timing;
        }
        if (messageI === 0) {
            return 0;
        }

        // the trick here is to estimate "how long it take to read the previous message"
        // instead of "how long does it take to write this message".
        const previous = filteredMessages[messageI - 1]

        // counting words: only keep whitespaces and alphanumeric characters, then split of whitespaces
        const wordCount = previous.message
            .replace(/[^\w\d\s]/g, '')
            .trim()
            .split(/\s/g)
            .length;

        let finalTimeMs = wordCount * millisecondsPerWord

        // if the message includes an image, add some more time to "read" it
        if (previous.image) {
            finalTimeMs += imageReadDelay;
        }

        return Math.max(finalTimeMs, 2000);
    });

    const hesitationTimings = filteredMessages.map(({ hesitation = null } = {}) =>
        hesitation !== null ? hesitation : defaultHesitationDelay,
    );
    const messagesUniqueId = useMemo(() => (messages || []).map(() => uuid()), [messages]);

    // scroll
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const [scrolledBottom, setScrolledBottom] = useState(false);
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

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    ref={scrollRef}
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                >
                    <div ref={contentRef}>
                        <Layout
                            className={styles.layout}
                            style={
                                !isPlaceholder
                                    ? {
                                          padding: spacing,
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

                                            return (
                                                <ConversationMessage
                                                    key={`${m.message}-${messagesUniqueId[messageI]}`}
                                                    message={m}
                                                    previousMessage={previousMessage}
                                                    nextMessage={nextMessage}
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
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

ConversationScreen.propTypes = propTypes;
ConversationScreen.defaultProps = defaultProps;

export default React.memo(ConversationScreen);
