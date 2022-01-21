/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useTrackScreenEvent, useResizeObserver } from '@micromag/core/hooks';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { isTextFilled, isLabelFilled, getStyleFromColor } from '@micromag/core/utils';
import { useContributions, useContributionCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';
import CallToAction from '@micromag/element-call-to-action';
import Text from '@micromag/element-text';
import TextInput from '@micromag/element-text-input';

import styles from './styles.module.scss';

const propTypes = {
    id: PropTypes.string,
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    title: MicromagPropTypes.headingElement,
    name: MicromagPropTypes.inputElement,
    message: MicromagPropTypes.inputElement,
    submit: MicromagPropTypes.textElement,
    nameStyle: MicromagPropTypes.textStyle,
    messageStyle: MicromagPropTypes.textStyle,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    resizeTransitionDuration: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    id: null,
    layout: 'middle',
    title: null,
    name: null,
    message: null,
    submit: null,
    nameStyle: null,
    messageStyle: null,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 100,
    resizeTransitionDuration: 750,
    type: null,
    className: null,
};

const ContributionScreen = ({
    id,
    layout,
    title,
    name,
    message,
    submit,
    nameStyle,
    messageStyle,
    spacing,
    background,
    callToAction,
    current,
    active,
    transitions,
    transitionStagger,
    resizeTransitionDuration,
    type,
    className,
}) => {
    const screenId = id || 'screen-id';
    const trackScreenEvent = useTrackScreenEvent(type);

    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();

    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();

    const backgroundPlaying = current && (isView || isEdit);
    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const hasTitle = isTextFilled(title);
    const hasNameLabel = isLabelFilled(name);
    const hasMessageLabel = isLabelFilled(message);
    const hasSubmit = isTextFilled(submit);

    const contributionsRef = useRef(null);
    const formRef = useRef(null);
    const [interactiveContainerHeight, setInteractiveContainerHeight] = useState(null);

    const [userName, setUserName] = useState('');
    const [userMessage, setUserMessage] = useState('');

    // 0 = default, 1 = submitting, 2 = submitted, 3 = resizing, 4 = done
    const [submitState, setSubmitState] = useState(isStatic || isCapture ? 4 : 0);

    const onContributionSubmitted = useCallback(() => {
        setSubmitState(2);
        trackScreenEvent('submit_success', `${userName}: ${userMessage}`);
    }, [setSubmitState, trackScreenEvent, userName, userMessage]);

    const { create: submitContribution } = useContributionCreate({
        screenId,
    });

    const { contributions } = useContributions({ screenId, opts: { autoload: !isPlaceholder } });

    const onNameChange = useCallback(
        (e) => {
            setUserName(e.currentTarget.value);
        },
        [setUserName],
    );

    const onMessageChange = useCallback(
        (e) => {
            setUserMessage(e.currentTarget.value);
        },
        [setUserMessage],
    );

    const nameFilled = useRef(false);
    const onNameBlur = useCallback(
        (e) => {
            if (!nameFilled.current && e.currentTarget.value.length > 0) {
                nameFilled.current = true;
                trackScreenEvent('input_filled', 'Name', {
                    userName: e.currentTarget.value,
                    userMessage,
                });
            }
        },
        [trackScreenEvent, userMessage],
    );

    const messageFilled = useRef(false);
    const onMessageBlur = useCallback(
        (e) => {
            if (!messageFilled.current && e.currentTarget.value.length > 0) {
                messageFilled.current = true;
                trackScreenEvent('input_filled', 'Message', {
                    userName,
                    userMessage: e.currentTarget.value,
                });
            }
        },
        [trackScreenEvent, userName],
    );

    // Call to Action

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const [scrolledBottom, setScrolledBottom] = useState(false);
    const swipeUpLinkActive = scrolledBottom && submitState === 4;
    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();

    const { height: callToActionHeight = 0 } = callToActionRect || {};

    const onScrolledBottom = useCallback(
        ({ initial }) => {
            if (initial) {
                trackScreenEvent('scroll', 'Contributions list');
            }
            setScrolledBottom(true);
        },
        [trackScreenEvent, setScrolledBottom],
    );

    const onScrolledNotBottom = useCallback(() => {
        setScrolledBottom(false);
    }, [setScrolledBottom]);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (submitState === 0) {
                setInteractiveContainerHeight(formRef.current.offsetHeight);
                setSubmitState(1);
                submitContribution({ name: userName, message: userMessage });
                onContributionSubmitted();
                trackScreenEvent('click_submit', `${userName}: ${userMessage}`, {
                    userName,
                    userMessage,
                });
            }
        },
        [
            submitState,
            setSubmitState,
            userName,
            userMessage,
            trackScreenEvent,
            onContributionSubmitted,
        ],
    );

    useEffect(() => {
        let timeout = null;
        if (submitState === 2) {
            timeout = setTimeout(setSubmitState, resizeTransitionDuration, 4);
            setInteractiveContainerHeight(contributionsRef.current.offsetHeight);
            setSubmitState(3);
        }

        return () => {
            if (submitState === 3 && timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [submitState, setInteractiveContainerHeight, setSubmitState, resizeTransitionDuration]);

    // Title

    const items = [
        <ScreenElement
            key="title"
            placeholder="title"
            placeholderProps={{ height: '0.75em' }}
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.emptyTitle}
            isEmpty={!hasTitle}
        >
            {hasTitle ? (
                <Transitions
                    transitions={transitions}
                    playing={transitionPlaying}
                    disabled={transitionDisabled}
                >
                    <Heading {...title} className={styles.title} />
                </Transitions>
            ) : null}
        </ScreenElement>,
    ];

    const allContributions = [
        ...(userName !== null && userMessage !== null
            ? [{ name: userName, message: userMessage }]
            : []),
        ...(contributions || []),
    ];

    // Form

    items.push(
        <div
            key="form"
            className={styles.interactiveContainer}
            style={{
                height: submitState < 4 ? interactiveContainerHeight : null,
                transitionDuration: `${resizeTransitionDuration}ms`,
            }}
        >
            <form className={styles.form} onSubmit={onSubmit} ref={formRef}>
                <div className={styles.formContent}>
                    <ScreenElement
                        placeholder="inputText"
                        placeholderProps={{ height: '0.25em' }}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Your name"
                                description="Your name placeholder"
                            />
                        }
                        emptyClassName={styles.emptyInputName}
                        isEmpty={!hasNameLabel}
                    >
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger}
                            disabled={transitionDisabled}
                        >
                            <TextInput
                                className={styles.inputName}
                                {...name}
                                value={userName}
                                onChange={(e) => onNameChange(e)}
                                onBlur={(e) => onNameBlur(e)}
                                focusable={current && isView}
                                disabled={isPreview}
                                required
                            />
                        </Transitions>
                    </ScreenElement>
                    <ScreenElement
                        placeholder="inputText"
                        placeholderProps={{ height: '0.75em' }}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Your message"
                                description="Your message placeholder"
                            />
                        }
                        emptyClassName={styles.emptyInputMessage}
                        isEmpty={!hasMessageLabel}
                    >
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger * 2}
                            disabled={transitionDisabled}
                        >
                            <TextInput
                                className={styles.inputMessage}
                                {...message}
                                value={userMessage}
                                onChange={(e) => onMessageChange(e)}
                                onBlur={(e) => onMessageBlur(e)}
                                disabled={isPreview}
                                focusable={current && isView}
                                multiline
                                required
                            />
                        </Transitions>
                    </ScreenElement>
                    <ScreenElement
                        placeholder="button"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Submit"
                                description="Submit placeholder"
                            />
                        }
                        emptyClassName={styles.emptySubmit}
                        isEmpty={!hasSubmit}
                    >
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger * 3}
                            disabled={transitionDisabled}
                        >
                            <Button
                                type="submit"
                                className={styles.buttonSubmit}
                                disabled={isPreview}
                                buttonStyle={submit !== null ? submit.buttonStyle : null}
                                focusable={current && isView}
                            >
                                <Text {...submit} inline />
                            </Button>
                        </Transitions>
                    </ScreenElement>
                </div>
                <div className={styles.formLoading}>
                    <FontAwesomeIcon className={styles.loadingIcon} icon={faSpinner} />
                </div>
            </form>
            <div
                className={styles.contributionsContainer}
                aria-hidden={submitState === 4 ? null : 'true'}
            >
                <div className={styles.contributionsContent}>
                    <div className={styles.contributions} ref={contributionsRef}>
                        {allContributions.map((contribution, contributionIndex) => {
                            const nameInnerStyle =
                                nameStyle !== null ? nameStyle.style || null : null;
                            const messageInnerStyle =
                                messageStyle !== null ? messageStyle.style || null : null;
                            return (
                                <div
                                    key={`contribution-${contributionIndex}`}
                                    className={styles.contribution}
                                    style={
                                        nameInnerStyle !== null
                                            ? getStyleFromColor(nameInnerStyle.color, 'borderColor')
                                            : null
                                    }
                                >
                                    <Heading
                                        className={styles.contributionName}
                                        body={contribution.name}
                                        size={2}
                                        textStyle={nameInnerStyle}
                                    />
                                    <Text
                                        className={styles.contributionMessage}
                                        body={contribution.message}
                                        textStyle={messageInnerStyle}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {hasCallToAction ? <div style={{ height: callToActionHeight }} /> : null}
        </div>,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.submitting]: submitState === 1,
                    [styles.submitted]: submitState > 1,
                    [styles.showContributions]: submitState === 4,
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
                    shouldLoad={current || active}
                />
            ) : null}
            <Container width={width} height={height}>
                <div
                    className={styles.content}
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
                    <Scroll
                        verticalAlign={layout}
                        disabled={scrollingDisabled}
                        onScrolledBottom={onScrolledBottom}
                        onScrolledNotBottom={onScrolledNotBottom}
                    >
                        {items}
                    </Scroll>
                    {!isPlaceholder && hasCallToAction ? (
                        <CallToAction
                            ref={callToActionRef}
                            className={styles.callToAction}
                            disabled={!swipeUpLinkActive}
                            animationDisabled={isPreview}
                            callToAction={callToAction}
                            focusable={current && isView}
                        />
                    ) : null}
                </div>
            </Container>
        </div>
    );
};

ContributionScreen.propTypes = propTypes;
ContributionScreen.defaultProps = defaultProps;

export default ContributionScreen;
