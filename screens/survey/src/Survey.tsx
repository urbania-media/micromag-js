/* eslint-disable react/jsx-props-no-spreading */
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import DOMPurify from 'dompurify';
import isNumber from 'lodash/isNumber';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    Answer,
    BackgroundElement,
    BoxStyle,
    Color,
    Footer as FooterConfig,
    Header as HeaderConfig,
    TextElement,
    TextStyle,
    Transitions as TransitionsConfig,
} from '@micromag/core';
import { CloseIcon, ScreenElement, Transitions } from '@micromag/core/components';
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
    getLargestRemainderRound,
    getStyleFromColor,
    isFooterFilled,
    isHeaderFilled,
    isTextFilled,
} from '@micromag/core/utils';
import { useQuiz, useQuizCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import TextInput from '@micromag/element-text-input';

import styles from './survey.module.css';

interface SurveyScreenProps {
    id?: string;
    layout?: 'top' | 'middle' | 'bottom' | 'split';
    question?: TextElement;
    answers?: Answer[];
    result?: Result;
    buttonsStyle?: BoxStyle;
    buttonsTextStyle?: TextStyle;
    resultsStyle?: { barColor?: Color; textColor?: Color; percentageTextStyle?: TextStyle };
    spacing?: number;
    header?: HeaderConfig;
    footer?: FooterConfig;
    background?: BackgroundElement;
    customAnswer?: boolean;
    showCount?: boolean;
    withoutPercentage?: boolean;
    withoutBar?: boolean;
    current?: boolean;
    preload?: boolean;
    transitions?: TransitionsConfig;
    resultTransitionDuration?: number;
    type?: string;
    className?: string;
}

function SurveyScreen({
    id = null,
    layout = 'middle',
    question = null,
    answers = null,
    result = null,
    buttonsStyle = null,
    buttonsTextStyle = null,
    resultsStyle = null,
    spacing = 20,
    header = null,
    footer = null,
    background = null,
    customAnswer = false,
    showCount = false,
    withoutPercentage = false,
    withoutBar = false,
    current = true,
    preload = true,
    transitions = null,
    resultTransitionDuration = 500,
    type = null,
    className = null,
}: SurveyScreenProps) {
    const screenId = id || 'screen-id';
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, resolution } = useScreenSize();
    const { create: submitQuiz } = useQuizCreate({
        screenId,
    });
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current, true);

    const { quiz: allQuizAnswers = [] } = useQuiz({ screenId, opts: { autoload: !isPlaceholder } });
    const quizAnswers = allQuizAnswers.filter((item) => {
        const { choice = null } = item || {};
        const answersBody = (answers || [])
            .map((answer) => {
                const { label = null } = answer || {};
                const { body = null } = label || {};
                return body;
            })
            .filter((body) => body !== null);
        const hasResult = answersBody.find((body) => body === choice);
        if (hasResult) {
            return true;
        }
        return false;
    });

    const hasQuestion = isTextFilled(question);
    const hasDefaultResult = isTextFilled(result);

    const {
        active: allowCustomAnswer = false,
        placeholder = null,
        textStyle: customAnswerTextStyle = null,
        boxStyle: customAnswerBoxStyle = null,
        submit: customAnswerSubmit = null,
        multiline: customAnswerMultiline = false,
    } = customAnswer || {};

    const { body: placeholderBody = null, textStyle: placeholderTextStyle = null } =
        placeholder || {};

    const showInstantAnswer = isStatic || isCapture;
    const [userAnswerIndex, setUserAnswerIndex] = useState(showInstantAnswer ? -1 : null);
    const answered = userAnswerIndex !== null;

    const quizAnswersComputed = useMemo(() => {
        const total =
            answers !== null
                ? (quizAnswers || []).reduce(
                      (points, { count = 0 }) => points + parseInt(count, 10),
                      userAnswerIndex !== null && userAnswerIndex > -1 ? 1 : 0,
                  )
                : 0;
        const computed =
            answers !== null
                ? (answers || []).reduce((answersTotal, ans, i) => {
                      const { label = {} } = ans || {};
                      const { body = null } = label || {};
                      const { count = 0 } = quizAnswers.find((qa) => qa.choice === body) || {};
                      const countWithUser = i === userAnswerIndex ? count + 1 : count;
                      if (body !== null) {
                          return {
                              ...answersTotal,
                              [body]: {
                                  percent: total > 0 ? (countWithUser / total) * 100 : 0,
                                  count: countWithUser,
                              },
                          };
                      }
                      return answersTotal;
                  }, {})
                : {};

        const quizAnswersPct =
            total > 0 ? Object.keys(computed).map((key) => computed[key].percent || 0) : [];

        const evenlySplit = getLargestRemainderRound(quizAnswersPct, 100);

        return Object.keys(computed).reduce(
            (acc, key, i) => ({
                ...acc,
                [key]: {
                    ...computed[key],
                    percent: evenlySplit[i],
                },
            }),
            {},
        );
    }, [answers, quizAnswers, userAnswerIndex]);

    const isSplitted = layout === 'split';
    const isMiddleLayout = layout === 'middle';
    const verticalAlign = isSplitted ? null : layout;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const mediaShouldLoad = current || preload;

    const onAnswerClick = useCallback(
        (answerIndex) => {
            if (userAnswerIndex === null) {
                setUserAnswerIndex(answerIndex);
                const answer = answers !== null ? answers[answerIndex] : null;
                submitQuiz({ choice: answer.label.body || answerIndex, value: 1 });
                trackScreenEvent(
                    'click_answer',
                    `Answer ${userAnswerIndex + 1}: ${answer.label.body}`,
                    {
                        linkType: 'survey_answer',
                        answer,
                        answerIndex,
                        answerType: 'button',
                    },
                );
            }
        },
        [userAnswerIndex, setUserAnswerIndex, trackScreenEvent, submitQuiz],
    );

    useEffect(() => {
        if (!current && isEdit && userAnswerIndex !== null) {
            setUserAnswerIndex(null);
        }
    }, [isEdit, current, userAnswerIndex, setUserAnswerIndex]);

    const onQuizReset = useCallback(() => {
        setUserAnswerIndex(null);
    }, [setUserAnswerIndex]);

    const [textInput, setTextInput] = useState(null);
    const [inputFocused, setInputFocused] = useState(false);
    const inputDisabled = isPreview || answered;

    const onInputFocused = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setInputFocused(true);
        },
        [setInputFocused],
    );

    const onInputBlurred = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setInputFocused(false);
        },
        [setInputFocused],
    );

    const onTextInputChange = useCallback(
        (e) => {
            const value = DOMPurify.sanitize(e.currentTarget.value || '');
            setTextInput(value !== '' ? value : null);
        },
        [setTextInput],
    );

    const onTextInputClear = useCallback(() => {
        setTextInput('');
    }, [setTextInput]);

    const onSubmitSuggestion = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (textInput !== null && textInput !== '' && !answered) {
                submitQuiz({ choice: textInput, value: 1 });
                setUserAnswerIndex('input');
                setInputFocused(false);
                trackScreenEvent('click_answer', `Answer input: ${textInput}`, {
                    textInput,
                    answerIndex: null,
                    answerType: 'custom',
                });
            }
        },
        [textInput, submitQuiz, answered, setUserAnswerIndex, setInputFocused, trackScreenEvent],
    );

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const { ref: headerRef, height: headerHeight = 0 } = useDimensionObserver();
    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();

    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;
    const [scrolledBottom, setScrolledBottom] = useState(false);

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

    const [hasScroll, setHasScroll] = useState(false);
    const onScrollHeightChange = useCallback(
        ({ canScroll = false }) => {
            setHasScroll(canScroll);
        },
        [setHasScroll],
    );

    // Question
    const items = [
        <ScreenElement
            key="question"
            placeholder="title"
            emptyLabel={
                <FormattedMessage defaultMessage="Question" description="Question placeholder" />
            }
            emptyClassName={styles.emptyQuestion}
            isEmpty={!hasQuestion}
        >
            {hasQuestion ? (
                <Transitions
                    transitions={transitions}
                    playing={transitionPlaying}
                    disabled={transitionDisabled}
                >
                    <Heading {...question} className={styles.question} />
                </Transitions>
            ) : null}
        </ScreenElement>,
    ];

    if (isSplitted || (!isPlaceholder && hasFooter && isMiddleLayout)) {
        items.push(<Spacer key="spacer" />);
    }

    const finalTransitionDuration = useMemo(
        () => (showInstantAnswer ? 0 : `${resultTransitionDuration}ms`),
        [showInstantAnswer, resultTransitionDuration],
    );

    const {
        barColor: resultsBarColor = null,
        textColor: resultsTextColor = null,
        percentageTextStyle: resultsPercentageTextStyle = null,
    } = resultsStyle || {};

    const finalResult = useMemo(() => {
        const defaultResult = hasDefaultResult ? result : null;
        const answer =
            answers !== null && userAnswerIndex !== null ? answers[userAnswerIndex] : null;
        const { result: answerResult = null } = answer || {};
        return answerResult || defaultResult;
    }, [hasDefaultResult, result, answers, userAnswerIndex]);

    const showReset = isEdit && userAnswerIndex !== null;

    items.push(
        <div key="answers" className={styles.answers}>
            {answers !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {(isPlaceholder ? [...new Array(3)] : answers).map((answer, answerIndex) => {
                        const hasAnswer = answer !== null;
                        const {
                            label = null,
                            buttonStyle: answerButtonStyle = null,
                            textStyle: answerButtonTextStyle = null, // for backwards compat, leave there
                            resultStyle: answerResultStyle = null,
                        } = answer || {};

                        const {
                            barColor: answerResultBarColor = null,
                            textColor: answerResultTextColor,
                            percentageTextStyle: answerResultPercentageTextStyle = null,
                        } = answerResultStyle || {};

                        const { body = null } = label || {};
                        const { percent = 0, count = 0 } =
                            body !== null ? quizAnswersComputed[body] || {} : {};
                        const { textStyle = null } = label || {};
                        const { color: labelColor = null } = textStyle || {};

                        const hasAnswerLabel = isTextFilled(label);
                        const userAnswer = userAnswerIndex === answerIndex;
                        const buttonStyles = {
                            ...buttonsStyle,
                            ...answerButtonStyle,
                            ...(answered ? { textAlign: 'left' } : null),
                        };

                        const { borderRadius: answerResultBorderRadius = null } =
                            buttonStyles || {};
                        const finalBarBorderRadius =
                            answerResultBorderRadius !== null &&
                            isNumber(answerResultBorderRadius) &&
                            answerResultBorderRadius > 2
                                ? answerResultBorderRadius - 2
                                : answerResultBorderRadius;

                        return (
                            <div
                                key={`answer-${answerIndex + 1}`}
                                className={classNames([
                                    styles.item,
                                    {
                                        [styles.userAnswer]: userAnswer,
                                    },
                                ])}
                            >
                                <ScreenElement
                                    placeholder="surveyAnswer"
                                    placeholderProps={{ className: styles.placeholderAnswer }}
                                    emptyLabel={
                                        <FormattedMessage
                                            defaultMessage="Answer"
                                            description="Answer placeholder"
                                        />
                                    }
                                    emptyClassName={styles.emptyAnswer}
                                    isEmpty={!hasAnswerLabel}
                                >
                                    {hasAnswer ? (
                                        <div className={styles.itemContent}>
                                            <div
                                                className={styles.itemInner}
                                                style={{
                                                    borderRadius: answerResultBorderRadius,
                                                    transitionDuration: finalTransitionDuration,
                                                }}
                                            >
                                                <Button
                                                    className={styles.button}
                                                    onPointerUp={(e) => {
                                                        if (
                                                            e.pointerType !== 'mouse' ||
                                                            e.button === 0
                                                        ) {
                                                            onAnswerClick(answerIndex);
                                                        }
                                                    }}
                                                    disabled={isPreview || userAnswerIndex !== null}
                                                    focusable={current && isView}
                                                    buttonStyle={buttonStyles}
                                                    textStyle={{
                                                        ...buttonsTextStyle,
                                                        ...textStyle,
                                                        ...answerButtonTextStyle,
                                                    }}
                                                >
                                                    <span className={styles.itemLabel}>
                                                        <Text
                                                            {...label}
                                                            textStyle={{
                                                                ...buttonsTextStyle,
                                                                ...textStyle,
                                                                ...answerButtonTextStyle,
                                                            }}
                                                            inline
                                                            className={styles.itemText}
                                                        />
                                                        {!withoutPercentage ? (
                                                            <div
                                                                className={styles.resultLabel}
                                                                style={{
                                                                    ...getStyleFromColor(
                                                                        answered
                                                                            ? answerResultTextColor ||
                                                                                  resultsTextColor ||
                                                                                  answerResultBarColor ||
                                                                                  resultsBarColor ||
                                                                                  labelColor
                                                                            : null,
                                                                        'color',
                                                                    ),
                                                                    ...(answered
                                                                        ? { opacity: 1 }
                                                                        : { opacity: 0 }),
                                                                }}
                                                            >
                                                                <Text
                                                                    {...label}
                                                                    textStyle={{
                                                                        ...buttonsTextStyle,
                                                                        ...textStyle,
                                                                        ...answerButtonTextStyle,
                                                                        ...resultsTextColor,
                                                                        ...resultsPercentageTextStyle,
                                                                        ...answerResultTextColor,
                                                                        ...answerResultPercentageTextStyle,
                                                                    }}
                                                                    inline
                                                                    className={styles.resultText}
                                                                    body={
                                                                        showCount
                                                                            ? count
                                                                            : `${percent}%`
                                                                    }
                                                                />
                                                            </div>
                                                        ) : null}
                                                        {!withoutBar ? (
                                                            <div
                                                                className={styles.resultBar}
                                                                style={{
                                                                    borderRadius:
                                                                        finalBarBorderRadius,
                                                                    transitionDuration:
                                                                        finalTransitionDuration,
                                                                    width:
                                                                        percent !== null
                                                                            ? `${percent}%`
                                                                            : '0%',
                                                                    ...getStyleFromColor(
                                                                        answerResultBarColor ||
                                                                            resultsBarColor ||
                                                                            labelColor,
                                                                        'backgroundColor',
                                                                    ),
                                                                    ...(answered
                                                                        ? { opacity: 0.5 }
                                                                        : { opacity: 0 }),
                                                                }}
                                                            />
                                                        ) : null}
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : null}
                                </ScreenElement>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.answered]: answered,
                    [styles.inputFocused]: inputFocused,
                    [styles.withPercentage]: !withoutPercentage,
                    [styles.withBar]: !withoutBar,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    verticalAlign={verticalAlign}
                    disabled={scrollingDisabled}
                    onScrolledTrigger={onScrolledTrigger}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    onScrollHeightChange={onScrollHeightChange}
                    withShadow
                >
                    {showReset ? (
                        <Button
                            className={styles.reset}
                            icon={<FontAwesomeIcon icon={faRedo} size="md" />}
                            onClick={onQuizReset}
                        />
                    ) : null}
                    {!isPlaceholder && hasHeader ? (
                        <div
                            className={classNames([
                                styles.header,
                                {
                                    [styles.disabled]:
                                        scrolledBottom && !scrollingDisabled && hasScroll,
                                },
                            ])}
                            ref={headerRef}
                            style={{
                                paddingTop: spacing / 2,
                                paddingLeft: spacing,
                                paddingRight: spacing,
                                paddingBottom: spacing,
                                transform: !isPreview ? `translate(0, ${viewerTopHeight}px)` : null,
                            }}
                        >
                            <Header {...header} />
                        </div>
                    ) : null}
                    <Layout
                        className={styles.layout}
                        verticalAlign={verticalAlign}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop:
                                          (current && !isPreview ? viewerTopHeight : 0) +
                                          (headerHeight || spacing),
                                      paddingBottom:
                                          (current && !isPreview ? viewerBottomHeight : 0) +
                                          (footerHeight + spacing),
                                  }
                                : null
                        }
                    >
                        {items}
                        {!isPlaceholder && allowCustomAnswer ? (
                            <form
                                className={classNames([
                                    styles.input,
                                    {
                                        [styles.focused]: inputFocused,
                                        [styles.filled]: textInput !== null && textInput !== '',
                                        [styles.disabled]: inputDisabled,
                                        [styles.selected]: userAnswerIndex === 'input',
                                        [styles.multiline]: customAnswerMultiline,
                                    },
                                ])}
                                onSubmit={onSubmitSuggestion}
                            >
                                <TextInput
                                    className={styles.textInput}
                                    disabled={inputDisabled}
                                    focusable={current && isView}
                                    buttonStyle={{ ...buttonsStyle, ...customAnswerBoxStyle }}
                                    textStyle={{
                                        ...buttonsTextStyle,
                                        ...customAnswerTextStyle,
                                        // ...(answered ? { textAlign: 'left' } : null),
                                    }}
                                    placeholderTextStyle={{
                                        ...buttonsTextStyle,
                                        ...customAnswerTextStyle,
                                        ...placeholderTextStyle,
                                        // ...(answered ? { textAlign: 'left' } : null),
                                    }}
                                    value={textInput}
                                    label={placeholderBody}
                                    onChange={onTextInputChange}
                                    onFocus={onInputFocused}
                                    onBlur={onInputBlurred}
                                    multiline={customAnswerMultiline}
                                />
                                {!answered ? (
                                    <Button
                                        className={classNames([
                                            styles.confirm,
                                            {
                                                [styles.disabled]:
                                                    inputDisabled ||
                                                    textInput === null ||
                                                    textInput === '',
                                            },
                                        ])}
                                        type="button"
                                        onClick={onTextInputClear}
                                        disabled={
                                            inputDisabled || textInput === null || textInput === ''
                                        }
                                    >
                                        <CloseIcon className={styles.icon} />
                                    </Button>
                                ) : null}
                                {!answered ? (
                                    <Button
                                        className={classNames([
                                            styles.submit,
                                            {
                                                [styles.disabled]:
                                                    inputDisabled ||
                                                    textInput === null ||
                                                    textInput === '',
                                            },
                                        ])}
                                        type="submit"
                                        buttonStyle={customAnswerSubmit?.buttonStyle}
                                        disabled={
                                            inputDisabled || textInput === null || textInput === ''
                                        }
                                    >
                                        <Text {...customAnswerSubmit} inline />
                                    </Button>
                                ) : null}
                            </form>
                        ) : null}
                        {userAnswerIndex !== null && finalResult !== null ? (
                            <Transitions
                                transitions={transitions}
                                playing={transitionPlaying}
                                disabled={transitionDisabled}
                            >
                                <Text {...(finalResult || {})} className={styles.resultText} />
                            </Transitions>
                        ) : null}
                    </Layout>
                </Scroll>
                {!isPlaceholder && hasFooter ? (
                    <div
                        ref={footerRef}
                        className={classNames([
                            styles.footer,
                            {
                                [styles.disabled]: !scrolledBottom,
                            },
                        ])}
                        style={{
                            transform: !isPreview ? `translate(0, -${viewerBottomHeight}px)` : null,
                            paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingTop: spacing / 2,
                            paddingBottom: spacing / 2,
                        }}
                    >
                        <Footer {...footerProps} />
                    </div>
                ) : null}
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
}

export default SurveyScreen;
