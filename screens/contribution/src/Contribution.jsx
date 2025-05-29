/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
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
    getStyleFromColor,
    isFooterFilled,
    isHeaderFilled,
    isLabelFilled,
    isTextFilled,
} from '@micromag/core/utils';
import { useContributionCreate, useContributions } from '@micromag/data';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
// import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import TextInput from '@micromag/element-text-input';

import styles from './contribution.module.scss';

const propTypes = {
    id: PropTypes.string,
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    title: MicromagPropTypes.headingElement,
    name: MicromagPropTypes.inputElement,
    message: MicromagPropTypes.inputElement,
    submit: MicromagPropTypes.textElement,
    nameStyle: MicromagPropTypes.textStyle,
    messageStyle: MicromagPropTypes.textStyle,
    settings: PropTypes.shape({
        canViewAnswers: PropTypes.bool,
        answerButton: MicromagPropTypes.buttonElement,
        contributionButton: MicromagPropTypes.buttonElement,
    }),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    preload: PropTypes.bool,
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
    settings: null,
    spacing: 20,
    background: null,
    header: null,
    footer: null,
    current: true,
    preload: true,
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
    settings,
    spacing,
    background,
    header,
    footer,
    current,
    preload,
    transitions,
    transitionStagger,
    resizeTransitionDuration,
    type,
    className,
}) => {
    const intl = useIntl();
    const screenId = id || 'screen-id';
    const trackScreenEvent = useTrackScreenEvent(type);

    const { width, height, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || preload;
    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

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
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const { canViewAnswers = false, skipButton = null, backButton = null } = settings || {};
    const answersButton = submitState === 4 ? backButton : skipButton;
    const finalAnswersButton = isTextFilled(answersButton)
        ? answersButton
        : {
              ...answersButton,
              body:
                  submitState === 4
                      ? intl.formatMessage({ defaultMessage: 'Back', description: 'Button label' })
                      : intl.formatMessage({ defaultMessage: 'Skip', description: 'Button label' }),
          };

    const onContributionSubmitted = useCallback(() => {
        setSubmitState(2);
        trackScreenEvent('submit_success', `${userName}: ${userMessage}`);
        setHasSubmitted(true);
    }, [setSubmitState, setHasSubmitted, trackScreenEvent, userName, userMessage]);

    const { create: submitContribution } = useContributionCreate({
        screenId,
    });

    const { contributions } = useContributions({ screenId, opts: { autoload: !isPlaceholder } });

    const onNameChange = useCallback(
        (e) => {
            const value = DOMPurify.sanitize(e.currentTarget.value || '');
            setUserName(value);
        },
        [setUserName],
    );

    const onMessageChange = useCallback(
        (e) => {
            const value = DOMPurify.sanitize(e.currentTarget.value || '');
            setUserMessage(value);
        },
        [setUserMessage],
    );

    const onContributionReset = useCallback(() => {
        setUserName('');
        setUserMessage('');
        setSubmitState(0);
        setHasSubmitted(false);
    }, [setUserName, setUserMessage, setSubmitState, setHasSubmitted]);

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
    const [scrolledBottom, setScrolledBottom] = useState(false);
    const swipeUpLinkActive = scrolledBottom && submitState === 4;
    const { ref: footerRef, height: callToActionHeight = 0 } = useDimensionObserver();

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

    const onClickSkip = useCallback(() => {
        if (submitState === 4) {
            setSubmitState(0);
            trackScreenEvent('click_skip', 'Skip button');
        } else {
            setSubmitState(4);
            trackScreenEvent('click_back', 'Back button');
        }
    }, [submitState, setSubmitState, trackScreenEvent]);

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
            {hasTitle ? <Heading {...title} className={styles.title} /> : null}
        </ScreenElement>,
    ];

    const allContributions = [
        ...(userName !== null && userName !== '' && userMessage !== null && userMessage !== ''
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
            {canViewAnswers && !hasSubmitted ? (
                <ScreenElement
                    placeholder="button"
                    emptyLabel={
                        submitState !== 4 ? (
                            <FormattedMessage
                                defaultMessage="Skip"
                                description="Button placeholder"
                            />
                        ) : (
                            <FormattedMessage
                                defaultMessage="Back"
                                description="Button placeholder"
                            />
                        )
                    }
                    emptyClassName={styles.emptySkip}
                >
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        delay={transitionStagger * 3}
                        disabled={transitionDisabled}
                    >
                        <Button
                            type="button"
                            className={classNames([
                                styles.buttonSkip,
                                { [styles.showBack]: submitState === 4 },
                            ])}
                            disabled={isPreview}
                            onClick={onClickSkip}
                            buttonStyle={
                                finalAnswersButton !== null ? finalAnswersButton.buttonStyle : null
                            }
                            focusable={current && isView}
                        >
                            <Text {...finalAnswersButton} inline />
                        </Button>
                    </Transitions>
                </ScreenElement>
            ) : null}
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
            {hasFooter ? <div style={{ height: callToActionHeight }} /> : null}
        </div>,
    );

    const headerElement =
        !isPlaceholder && hasHeader ? (
            <div
                className={styles.header}
                style={{
                    paddingBottom: spacing,
                }}
            >
                <Header {...header} />
            </div>
        ) : null;

    const showReset = isEdit && submitState === 4;

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
            <Container width={width} height={height} className={styles.content}>
                {showReset ? (
                    <Button
                        className={styles.reset}
                        icon={<FontAwesomeIcon icon={faRedo} size="md" />}
                        onClick={onContributionReset}
                    />
                ) : null}
                <div className={styles.inner}>
                    <Scroll
                        verticalAlign={layout}
                        disabled={scrollingDisabled}
                        onScrolledBottom={onScrolledBottom}
                        onScrolledNotBottom={onScrolledNotBottom}
                        scrolleeClassName={styles.scrollee}
                        withShadow
                    >
                        <Layout
                            className={styles.layout}
                            style={
                                !isPlaceholder
                                    ? {
                                          padding: spacing,
                                          paddingTop: hasHeader
                                              ? spacing / 2 + (!isPreview ? viewerTopHeight : 0)
                                              : spacing / 2,
                                          paddingBottom:
                                              (current && !isPreview ? viewerBottomHeight : 0) +
                                              spacing / 2,
                                      }
                                    : null
                            }
                        >
                            {headerElement}
                            {items}
                        </Layout>
                    </Scroll>
                    {!isPlaceholder && hasFooter ? (
                        <div
                            ref={footerRef}
                            className={classNames([
                                styles.footer,
                                {
                                    [styles.disabled]: !swipeUpLinkActive,
                                },
                            ])}
                            style={{
                                paddingLeft: Math.max(viewerBottomSidesWidth, spacing / 2),
                                paddingRight: Math.max(viewerBottomSidesWidth, spacing / 2),
                                paddingTop: 0,
                                paddingBottom: (!isPreview ? viewerBottomHeight : 0) + spacing / 2,
                            }}
                        >
                            <Footer {...footerProps} />
                        </div>
                    ) : null}
                </div>
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

ContributionScreen.propTypes = propTypes;
ContributionScreen.defaultProps = defaultProps;

export default ContributionScreen;
