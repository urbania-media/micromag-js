/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { v1 as uuid } from 'uuid';

import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useResizeObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { ScreenElement, Transitions } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import CallToAction from '@micromag/element-call-to-action';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import ConversationMessage from './ConversationMessage';

import styles from './styles.module.scss';

const propTypes = {
    // id: PropTypes.string,
    // layout: PropTypes.oneOf(['normal']),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    type: PropTypes.string,
    conversation: MicromagPropTypes.conversation,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    // layout: 'normal',
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    type: null,
    conversation: null,
    transitions: null,
    className: null,
};

const ConversationScreen = ({
    // layout,
    spacing,
    background,
    callToAction,
    current,
    type,
    conversation,
    transitions,
    className,
    ...props
}) => {
    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();
    const trackScreenEvent = useTrackScreenEvent(type);

    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();

    const backgroundPlaying = current && (isView || isEdit);
    const { speakers = null, messages = [] } = conversation || {};

    const [conversationState, setConversationState] = useState([]);
    const chatBottomRef = useRef(null);

    const conversationStateChange = useCallback(
        (state) => {
            const newConversationState = [...conversationState];
            if (state === 'send') {
                newConversationState.push(true);
                setConversationState(newConversationState);
            }
            if (isView) {
                chatBottomRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
        },
        [conversationState, setConversationState],
    );

    const defaultTimingFactor = 50;
    const defaultHesitationDelay = 1000;

    const filteredMessages = (messages || []).filter((m) => m !== null);

    const timings = filteredMessages.map(({ timing = null, message = null } = {}) =>
        timing !== null ? timing : defaultTimingFactor * (message !== null ? message.length : 10),
    );

    const hesitationTimings = filteredMessages.map(({ hesitation = null } = {}) =>
        hesitation !== null ? hesitation : defaultHesitationDelay,
    );

    const speakersUniqueId = useMemo(() => (speakers || []).map(() => uuid()), [speakers]);
    const messagesUniqueId = useMemo(() => (messages || []).map(() => uuid()), [speakers]);

    // scroll
    // const animatingFinished = conversationState.length === messages.length;
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

    if (!isPlaceholder && hasCallToAction) {
        messages.push(<div key="cta-spacer" style={{ height: callToActionHeight }} />);
    }

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
                    {...background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                />
            ) : null}

            <Container width={width} height={height}>
                <Scroll
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                >
                    <Layout
                        className={styles.layout}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop:
                                          (menuOverScreen && !isPreview ? menuSize : 0) + spacing,
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
                            isEmpty={messages.length === 0}
                        >
                            <Transitions
                                transitions={transitions}
                                playing={current}
                                disabled={transitionDisabled}
                            >
                                <div className={styles.conversation}>
                                    {!isPlaceholder ? (
                                        <div className={styles.conversationHeader}>
                                            {(speakers || []).map((sp, idx) => (
                                                <span key={`${sp.id}-${speakersUniqueId[idx]}`}>
                                                    {sp.name}&nbsp;
                                                    {idx < speakers.length - 1
                                                        ? 'et'
                                                        : 'discutent.'}
                                                    &nbsp;
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                    {filteredMessages.map((m, messageI) => {
                                        const previousMessage =
                                            messageI !== 0 ? messages[messageI - 1] : null;

                                        const nextMessage =
                                            messageI + 1 < messages.length - 1
                                                ? messages[messageI + 1]
                                                : null;

                                        const { speaker } = m;

                                        const currentSpeaker =
                                            (speakers || []).find((s) => s.id === speaker) || null;

                                        const pauseTiming =
                                            timings
                                                .slice(0, messageI)
                                                .reduce((acc, t) => acc + t, 0) +
                                            hesitationTimings
                                                .slice(0, messageI)
                                                .reduce((acc, t) => acc + t, 0);

                                        const typingTiming = timings[messageI];

                                        return (
                                            <ConversationMessage
                                                key={`${m.message}-${messagesUniqueId[messageI]}`}
                                                message={m}
                                                previousMessage={previousMessage}
                                                nextMessage={nextMessage}
                                                nextMessageState={conversationState[messageI + 1]}
                                                currentSpeaker={currentSpeaker}
                                                conversationTiming={pauseTiming}
                                                typingTiming={typingTiming}
                                                onChange={conversationStateChange}
                                                isView={isView}
                                                {...props}
                                            />
                                        );
                                    })}
                                </div>
                                <div ref={chatBottomRef} />
                            </Transitions>
                        </ScreenElement>
                    </Layout>
                </Scroll>
                {!isPlaceholder && hasCallToAction ? (
                    <CallToAction
                        ref={callToActionRef}
                        className={styles.callToAction}
                        disabled={!scrolledBottom}
                        animationDisabled={isPreview}
                        callToAction={callToAction}
                    />
                ) : null}
            </Container>
        </div>
    );
};

ConversationScreen.propTypes = propTypes;
ConversationScreen.defaultProps = defaultProps;

export default React.memo(ConversationScreen);
