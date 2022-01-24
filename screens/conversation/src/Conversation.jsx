/* eslint-disable react/jsx-props-no-spreading */
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenRenderContext, useScreenSize, useViewer } from '@micromag/core/contexts';
import { useResizeObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { v1 as uuid } from 'uuid';
import ConversationMessage from './ConversationMessage';
import styles from './styles.module.scss';

const propTypes = {
    // id: PropTypes.string,
    // layout: PropTypes.oneOf(['normal']),
    title: MicromagPropTypes.headingElement,
    timing: PropTypes.oneOf(['instant', 'sequence']),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
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
    callToAction: null,
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
    callToAction,
    current,
    active,
    type,
    conversation,
    transitions,
    className,
}) => {
    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();
    const trackScreenEvent = useTrackScreenEvent(type);

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;
    const withAnimation = isView && !isStatic && timingMode === 'sequence';
    const { speakers = null, messages = [], messageStyle, speakerStyle } = conversation || {};

    const [conversationState, setConversationState] = useState([]);
    const chatBottomRef = useRef(null);

    const hasTitle = isTextFilled(title);

    const {
        ref: contentRef,
        entry: { contentRect: scrollContentRect },
    } = useResizeObserver();
    const { height: scrollHeight } = scrollContentRect || {};

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
    const defaultTimingFactor = 40;
    const defaultHesitationDelay = 1000;
    const filteredMessages = (messages || []).filter((m) => m !== null);
    const timings = filteredMessages.map(({ timing = null, message = null } = {}, messageI) => {
        if (timing !== null) {
            return timing;
        }
        if (messageI === 0) {
            return 0;
        }
        const finalTime = defaultTimingFactor * ((message || '').length || 10);
        return finalTime < 2000 ? finalTime : 2000;
    });

    const hesitationTimings = filteredMessages.map(({ hesitation = null } = {}) =>
        hesitation !== null ? hesitation : defaultHesitationDelay,
    );
    const messagesUniqueId = useMemo(() => (messages || []).map(() => uuid()), [messages]);

    // scroll
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    // CTA
    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const [scrolledBottom, setScrolledBottom] = useState(false);
    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();
    const { height: callToActionHeight = 0 } = callToActionRect || {};
    const viewCTA = (animationFinished && !isPlaceholder && hasCallToAction) || !withAnimation;
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
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                    shouldLoad={backgroundShouldLoad}
                />
            ) : null}

            <Container width={width} height={height}>
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
                                              (menuOverScreen && !isPreview ? menuSize : 0) +
                                              spacing,
                                      }
                                    : null
                            }
                        >
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
                                                    messageStyle={messageStyle}
                                                    speakerStyle={speakerStyle}
                                                />
                                            );
                                        })}
                                    </div>
                                    {viewCTA ? (
                                        <div style={{ minHeight: callToActionHeight }}>
                                            <CallToAction
                                                ref={callToActionRef}
                                                className={styles.callToAction}
                                                disabled={!scrolledBottom}
                                                animationDisabled={isPreview}
                                                callToAction={callToAction}
                                                focusable={current && isView}
                                            />
                                        </div>
                                    ) : null}
                                    <div ref={chatBottomRef} />
                                </Transitions>
                            </ScreenElement>
                        </Layout>
                    </div>
                </Scroll>
            </Container>
        </div>
    );
};

ConversationScreen.propTypes = propTypes;
ConversationScreen.defaultProps = defaultProps;

export default React.memo(ConversationScreen);
