/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useResizeObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import CallToAction from '@micromag/element-call-to-action';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

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
    className: PropTypes.string,
};

const defaultProps = {
    // layout: 'normal',
    spacing: 20,
    background: null,
    callToAction: null,
    current: null,
    type: null,
    conversation: null,
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

    // const animationPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const { speakers = null, messages = null } = conversation || {};

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
                        <div>
                            {(speakers || []).map((sp) => (
                                <div>{sp.name}</div>
                            ))}
                        </div>
                        <div>
                            {(messages || []).map((m) => {
                                const { speaker, message } = m || {};
                                const currentSpeaker = (speakers || []).find((s) => s.id === speaker) || null;
                                const { avatar: { url: avatarUrl} = {}, name:speakerName } = currentSpeaker || {};

                                return (
                                    <div key={message} className={styles.message}>
                                        <div className={styles.speakerDetails}>
                                            <div className={styles.avatarContainer}>
                                                <img
                                                    className={styles.avatar}
                                                    src={avatarUrl}
                                                    alt={speakerName}
                                                />
                                            </div>
                                            {speakerName}{' '}
                                        </div>
                                        <div className={styles.messageContent}>{message}</div>
                                    </div>
                                );
                            })}
                        </div>
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
