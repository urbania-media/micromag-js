/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
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

    const timings =
        messages.length > 0
            ? (messages || []).map(({ timing = null, message = null } = {}) =>
                  timing !== null ? timing : message.length * defaultTimingFactor,
              )
            : [50];

    const hesitationTimings = (messages || []).map(({ hesitation = null } = {}) =>
        hesitation !== null ? hesitation : defaultHesitationDelay,
    );

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
                                                <span key={sp.id}>
                                                    {sp.name}&nbsp;
                                                    {idx < speakers.length - 1
                                                        ? 'et'
                                                        : 'discutent.'}
                                                    &nbsp;
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                    {!isPlaceholder ? (
                                        (messages || []).map((m, messageI) => {
                                            const previousMessage =
                                                messageI !== 0 ? messages[messageI - 1] : null;

                                            const nextMessage =
                                                messageI + 1 < messages.length - 1
                                                    ? messages[messageI + 1]
                                                    : null;

                                            const { speaker } = m;

                                            const currentSpeaker =
                                                (speakers || []).find((s) => s.id === speaker) ||
                                                null;

                                            const pauseTiming = isView
                                                ? timings
                                                      .slice(0, messageI)
                                                      .reduce((acc, t) => acc + t, 0) +
                                                  hesitationTimings
                                                      .slice(0, messageI)
                                                      .reduce((acc, t) => acc + t, 0)
                                                : 0;

                                            const typingTiming = isView ? timings[messageI] : 0;

                                            return (
                                                <ConversationMessage
                                                    key={m.message}
                                                    message={m}
                                                    previousMessage={previousMessage}
                                                    nextMessage={nextMessage}
                                                    nextMessageState={
                                                        conversationState[messageI + 1]
                                                    }
                                                    currentSpeaker={currentSpeaker}
                                                    conversationTiming={pauseTiming}
                                                    typingTiming={typingTiming}
                                                    onChange={conversationStateChange}
                                                    isView={isView}
                                                />
                                            );
                                        })
                                    ) : (
                                        <div className={styles.placeholder}>
                                            {[...Array(4)].map(() => (
                                                <div className={styles.placeholderMessage} />
                                            ))}
                                            <svg
                                                className={styles.icon}
                                                width="299"
                                                height="264"
                                                viewBox="0 0 299 264"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M270.17 0.492188H29.7548C13.8578 0.492188 0.923828 13.4252 0.923828 29.3232V169.893C0.923828 185.79 13.8568 198.724 29.7548 198.724H180.269L241.249 259.704C243.56 262.015 246.649 263.242 249.792 263.242C251.348 263.242 252.918 262.941 254.412 262.322C258.924 260.452 261.868 256.049 261.868 251.163V198.723H270.169C286.066 198.723 299 185.79 299 169.892V29.3222C299.001 13.4252 286.068 0.492188 270.17 0.492188ZM274.845 169.893C274.845 172.47 272.748 174.567 270.171 174.567H249.795C243.439 174.567 238.241 179.479 237.764 185.714C237.733 185.978 237.713 222.004 237.713 222.004L193.859 178.149C193.813 178.103 193.765 178.06 193.719 178.014C193.547 177.846 193.384 177.7 193.23 177.569C191.104 175.705 188.327 174.566 185.279 174.566H29.7548C27.1768 174.566 25.0808 172.469 25.0808 169.892V29.3222C25.0808 26.7442 27.1778 24.6482 29.7548 24.6482H270.171C272.748 24.6482 274.845 26.7452 274.845 29.3222V169.893V169.893Z"
                                                    fill="#828282"
                                                />
                                                <path
                                                    d="M149.965 87.5298C143.298 87.5298 137.887 92.9408 137.887 99.6078C137.887 106.275 143.298 111.686 149.965 111.686C156.633 111.686 162.043 106.275 162.043 99.6078C162.043 92.9408 156.632 87.5298 149.965 87.5298Z"
                                                    fill="#828282"
                                                />
                                                <path
                                                    d="M93.8378 87.5298C87.1718 87.5298 81.7598 92.9408 81.7598 99.6078C81.7598 106.275 87.1718 111.686 93.8378 111.686C100.506 111.686 105.916 106.275 105.916 99.6078C105.916 92.9408 100.506 87.5298 93.8378 87.5298Z"
                                                    fill="#828282"
                                                />
                                                <path
                                                    d="M206.08 87.5298C199.413 87.5298 194.002 92.9408 194.002 99.6078C194.002 106.275 199.413 111.686 206.08 111.686C212.748 111.686 218.158 106.275 218.158 99.6078C218.158 92.9408 212.747 87.5298 206.08 87.5298Z"
                                                    fill="#828282"
                                                />
                                            </svg>
                                        </div>
                                    )}
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
