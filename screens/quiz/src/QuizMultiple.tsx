/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { animated, easings, useTransition } from '@react-spring/web';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    BackgroundElement,
    BoxStyle,
    Color,
    Footer as FooterConfig,
    Header as HeaderConfig,
    QuizAnswer,
    TextElement,
    TextStyle,
    Transitions,
} from '@micromag/core';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useScreenState,
    useViewerContext,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import {
    getFooterProps,
    isFooterFilled,
    isHeaderFilled,
    isImageFilled,
    isTextFilled,
} from '@micromag/core/utils';
import { useQuizCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';

import Question from './partials/Question';
import Results from './partials/Results';
import Title from './partials/Title';

import styles from './quiz.module.css';

interface QuizMultipleScreenProps {
    id?: string | null;
    layout?: 'top' | 'middle' | 'bottom' | 'split';
    introLayout?: 'top' | 'middle' | 'bottom' | 'split' | null;
    title?: TextElement | null;
    description?: TextElement | null;
    questions?: { text?: TextElement; answers?: QuizAnswer[] }[] | null;
    results?: { title?: TextElement; description?: TextElement }[] | null;
    buttonsStyle?: BoxStyle | null;
    inactiveButtonsStyle?: BoxStyle | null;
    buttonsTextStyle?: TextStyle | null;
    inactiveButtonsTextStyle?: TextStyle | null;
    questionsHeadingStyle?: TextStyle | null;
    resultsHeadingStyle?: TextStyle | null;
    resultsTextStyle?: TextStyle | null;
    feedbackTextStyle?: TextStyle | null;
    numbersTextStyle?: TextStyle | null;
    goodAnswerColor?: Color | null;
    badAnswerColor?: Color | null;
    spacing?: number;
    background?: BackgroundElement | null;
    introButton?: TextElement | null;
    introBackground?: BackgroundElement | null;
    nextButton?: TextElement | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    current?: boolean;
    active?: boolean;
    transitions?: Transitions | null;
    transitionStagger?: number;
    type?: string | null;
    className?: string | null;
}

function QuizMultipleScreen({
    id = null,
    layout = 'middle',
    introLayout = null,
    title = null,
    description = null,
    questions = null,
    results = null,
    buttonsStyle = null,
    inactiveButtonsStyle = null,
    buttonsTextStyle = null,
    inactiveButtonsTextStyle = null,
    questionsHeadingStyle = null,
    resultsHeadingStyle = null,
    resultsTextStyle = null,
    feedbackTextStyle = null,
    numbersTextStyle = null,
    goodAnswerColor = null,
    badAnswerColor = null,
    spacing = 20,
    background = null,
    introBackground = null,
    introButton = null,
    nextButton = null,
    header = null,
    footer = null,
    current = true,
    active = true,
    transitions = null,
    transitionStagger = 100,
    type = null,
    className = null,
}: QuizMultipleScreenProps) {
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
    const { muted } = usePlaybackContext();

    // console.log('isCurrentMedia', isCurrentMedia, mediaRef);

    const { open: openWebView } = useViewerWebView();
    const screenState = useScreenState();
    const [stateId = null, stateIndex = 0] = screenState !== null ? screenState.split('.') : [];

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const hasButtonText = isTextFilled(nextButton);

    // Call to Action
    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const { ref: headerRef, height: headerHeight = 0 } = useDimensionObserver();
    const { ref: footerRef, height: callToActionHeight = 0 } = useDimensionObserver();

    const showInstantAnswer = isStatic || isCapture;

    const hasIntro = title !== null || description !== null || isEdit || stateId === 'intro';

    const [userAnswers, setUserAnswers] = useState(null);
    let initialQuestionIndex = 'intro';
    if (stateId !== null) {
        initialQuestionIndex = stateId === 'questions' ? parseInt(stateIndex, 10) : stateId;
    } else if (isPlaceholder || !hasIntro) {
        initialQuestionIndex = 0;
    }
    const [questionIndex, setQuestionIndex] = useState(initialQuestionIndex);

    useEffect(() => {
        if (isPreview && hasIntro && questionIndex !== 'intro') {
            setQuestionIndex('intro');
        }
    }, [isPreview, hasIntro, questionIndex, setQuestionIndex]);

    const onAnswerClick = useCallback(
        (answer, answerIndex) => {
            setUserAnswers({
                ...userAnswers,
                [questionIndex]: answerIndex,
            });

            trackScreenEvent(
                'click_answer',
                `Question #${questionIndex + 1} ${answerIndex + 1}: ${answer.label.body}`,
                {
                    linkType: 'quiz_answer',
                    question: questions[questionIndex],
                    questionIndex,
                    answer,
                    answerIndex,
                },
            );
        },
        [userAnswers, setUserAnswers, trackScreenEvent, questions, questionIndex],
    );

    const onClickIntroButton = useCallback(() => {
        setQuestionIndex(0);
    }, [setQuestionIndex]);

    useEffect(() => {
        if (!current && isEdit && userAnswers !== null) {
            setUserAnswers(null);
        }
    }, [isEdit, current, userAnswers, setUserAnswers]);

    const hasQuestions = questions !== null && questions.length > 0;
    const currentQuestion = hasQuestions ? questions[questionIndex] || {} : {};
    const {
        text = null,
        answers = [],
        background: questionBackground = null,
        layout: questionLayout = null,
        keypadLayout = null,
        result: questionResult = null,
        resultImage: questionResultImage = null,
    } = currentQuestion || {};

    const currentAnsweredIndex =
        userAnswers !== null && typeof userAnswers[questionIndex] !== 'undefined'
            ? userAnswers[questionIndex]
            : null;

    const answer =
        currentAnsweredIndex !== null && typeof answers[currentAnsweredIndex] !== 'undefined'
            ? answers[currentAnsweredIndex]
            : null;
    const { result: answerResult = null } = answer || {};

    const hasTrueFalse =
        answers !== null
            ? (answers || []).find((ans) => ans?.good === true || ans?.good === false) !== undefined
            : false;
    const goodAnswerIndex =
        answers !== null ? answers.findIndex((ans) => ans !== null && ans.good === true) : null;
    const withoutGoodAnswer = goodAnswerIndex === null || goodAnswerIndex === -1;

    const questionResultHasText = isTextFilled(questionResult);
    const questionResultHasImage = isImageFilled(questionResultImage);
    const answerResultHasText = isTextFilled(answerResult);
    const hasResult = questionResultHasText || questionResultHasImage || answerResultHasText;

    const onNextSlide = useCallback(() => {
        // console.log('onNextSlide', isEdit, isPreview);
        if (isEdit || isPreview) {
            return;
        }
        const nextIndex = questionIndex + 1;
        const questionsCount = questions.length;
        if (nextIndex < questionsCount) {
            setQuestionIndex(nextIndex);
        } else if (nextIndex === questionsCount) {
            setQuestionIndex('results');
        }
    }, [questions, questionIndex, setQuestionIndex, isEdit, isPreview]);

    const currentPoints = useMemo(
        () =>
            userAnswers !== null
                ? Object.keys(userAnswers).reduce((totalPoints, answerQuestionIndex) => {
                      const { answers: questionAnswers = [] } =
                          questions !== null ? questions[answerQuestionIndex] || {} : {};
                      const answerIndex = userAnswers[answerQuestionIndex];
                      const { points = 0 } = questionAnswers[answerIndex] || {};
                      return points + totalPoints;
                  }, 0)
                : 0,
        [userAnswers, questions],
    );

    const isIntro = hasIntro && questionIndex === 'intro';
    const isResults = questionIndex === 'results';
    const isQuestion = !isIntro && !isResults;

    const currentResult = useMemo(() => {
        if (!isResults) {
            return null;
        }
        if (stateId === 'results') {
            return (results || [])[parseInt(stateIndex, 10)] || null;
        }
        return (results || [])
            .sort(({ points: pointsA = 0 }, { points: pointsB = 0 }) => {
                if (pointsA === pointsB) {
                    return 0;
                }
                return pointsA > pointsB ? 1 : -1;
            })
            .reduce((lastResult, result) => {
                const { points: lastPoints = 0 } = lastResult || {};
                const { points = 0 } = result || {};
                return currentPoints >= (lastPoints || 0) && currentPoints >= points
                    ? result
                    : lastResult;
            }, null);
    }, [isResults, results, currentPoints, stateId, stateIndex]);

    useEffect(() => {
        if (currentResult !== null && isResults) {
            const { title: resultTitle = null, points = null } = currentResult || {};
            trackScreenEvent('view_result', `Result: ${resultTitle?.body || 'No title'}`, {
                resultPoints: points || null,
                userPoints: currentPoints || null,
            });
        }
    }, [currentResult, currentPoints, isResults, trackScreenEvent]);

    const { background: resultBackground = null, layout: resultLayout = null } =
        currentResult || {};

    const { create: submitQuiz } = useQuizCreate({
        screenId,
    });

    useEffect(() => {
        if (!isResults || !isView) {
            return;
        }
        submitQuiz({ choice: userAnswers, value: currentPoints });
    }, [isView, isResults, userAnswers, submitQuiz]);

    // Switch state
    useEffect(() => {
        if (!isEdit && !isPreview) {
            return;
        }
        if (stateId === 'questions') {
            setQuestionIndex(parseInt(stateIndex, 10));
        } else if (stateId === 'results') {
            setQuestionIndex('results');
        } else if (stateId === 'intro') {
            setQuestionIndex('intro');
        }
    }, [stateId, stateIndex, isEdit, isPreview, setQuestionIndex]);

    let finalBackground = background;
    let backgroundKey = 'background';
    if (isIntro && introBackground !== null) {
        finalBackground = introBackground;
        backgroundKey = 'results';
    } else if (isResults && resultBackground !== null) {
        finalBackground = resultBackground;
        backgroundKey = 'results';
    } else if (isQuestion && questionBackground !== null) {
        finalBackground = questionBackground;
        backgroundKey = `question_${questionIndex}`;
    }

    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(
        current,
        finalBackground !== null,
        backgroundKey,
    );

    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const backgroundShouldLoad = current || active;

    console.log(
        'finalBackground',
        finalBackground,
        backgroundPlaying,
        backgroundShouldLoad,
        isCurrentMedia,
    );

    // Transition direction
    const lastQuestionIndexRef = useRef(questionIndex);
    const direction = useMemo(() => {
        if (questionIndex === lastQuestionIndexRef.current) {
            return null;
        }
        const { current: lastQuestionIndex } = lastQuestionIndexRef;
        lastQuestionIndexRef.current = questionIndex;
        if (
            questionIndex === 'intro' ||
            lastQuestionIndex === 'results' ||
            lastQuestionIndex > questionIndex
        ) {
            return 'left';
        }
        lastQuestionIndexRef.current = questionIndex;
        return 'right';
    }, [questionIndex]);

    const scrollingDisabled = (!isEdit && transitionDisabled) || !current || isIntro;
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

    const onQuizReset = useCallback(() => {
        setUserAnswers(null);
    }, [setUserAnswers]);

    let verticalAlign = layout;
    if (isIntro && introLayout !== null) {
        verticalAlign = introLayout;
    } else if (isQuestion && questionLayout !== null) {
        verticalAlign = questionLayout;
    } else if (isResults && resultLayout !== null) {
        verticalAlign = questionLayout;
    }

    const showPoints = isEdit;
    const showReset = isEdit && currentAnsweredIndex !== null;

    // Content transition items (captured for leaving animations)
    const contentItems = [];
    if (isIntro) {
        contentItems.push({
            key: 'intro',
            element: (
                <Title
                    title={title}
                    description={description}
                    layout={introLayout || layout}
                    button={introButton}
                    buttonDisabled={(questions || []).length < 1 || isEdit || isPreview}
                    focusable={current && isView}
                    transitions={transitions}
                    transitionPlaying={transitionPlaying}
                    transitionStagger={transitionStagger}
                    transitionDisabled={transitionDisabled}
                    className={styles.intro}
                    style={
                        !isPlaceholder
                            ? {
                                  paddingLeft: spacing,
                                  paddingRight: spacing,
                                  paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) +
                                      (callToActionHeight || spacing),
                              }
                            : null
                    }
                    onClickButton={onClickIntroButton}
                />
            ),
        });
    }
    if (isQuestion) {
        contentItems.push({
            key: `question-${questionIndex}`,
            element: (
                <Question
                    index={questionIndex}
                    totalCount={(questions || []).length}
                    question={text}
                    answers={answers}
                    keypadLayout={keypadLayout}
                    answeredIndex={currentAnsweredIndex}
                    buttonsStyle={buttonsStyle}
                    inactiveButtonsStyle={inactiveButtonsStyle}
                    buttonsTextStyle={buttonsTextStyle}
                    inactiveButtonsTextStyle={inactiveButtonsTextStyle}
                    questionsHeadingStyle={questionsHeadingStyle}
                    feedbackTextStyle={feedbackTextStyle}
                    numbersTextStyle={numbersTextStyle}
                    goodAnswerColor={goodAnswerColor}
                    badAnswerColor={badAnswerColor}
                    focusable={current && isView}
                    showInstantAnswer={showInstantAnswer}
                    layout={questionLayout || layout}
                    result={questionResult}
                    resultImage={questionResultImage}
                    withResult={hasResult}
                    withoutGoodAnswer={withoutGoodAnswer}
                    withoutTrueFalse={!hasTrueFalse}
                    withoutCollapse={hasTrueFalse}
                    transitions={transitions}
                    transitionPlaying={transitionPlaying}
                    transitionStagger={transitionStagger}
                    transitionDisabled={transitionDisabled}
                    onAnswerClick={onAnswerClick}
                    onAnswerTransitionEnd={hasResult ? null : onNextSlide}
                    className={styles.question}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (current && !isPreview ? viewerTopHeight : 0) +
                                      (headerHeight || spacing),
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) +
                                      (callToActionHeight || spacing),
                              }
                            : null
                    }
                />
            ),
        });
    }
    if (hasResult && currentAnsweredIndex !== null) {
        contentItems.push({
            key: 'next',
            element: (
                <div
                    className={styles.next}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (current && !isPreview ? viewerTopHeight : 0) +
                                      (headerHeight || spacing),
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) +
                                      (callToActionHeight || spacing),
                              }
                            : null
                    }
                >
                    <Button
                        disabled={currentAnsweredIndex === null}
                        focusable
                        buttonStyle={nextButton !== null ? nextButton.buttonStyle : null}
                        className={styles.nextButton}
                        onClick={onNextSlide}
                    >
                        {hasButtonText ? (
                            <Text {...nextButton} className={styles.label} />
                        ) : (
                            <span className={styles.label}>
                                <FormattedMessage
                                    defaultMessage="Next"
                                    description="Screen button label"
                                />
                            </span>
                        )}
                    </Button>
                </div>
            ),
        });
    }
    if (isResults) {
        contentItems.push({
            key: 'results',
            element: (
                <Results
                    {...currentResult}
                    resultsHeadingStyle={resultsHeadingStyle}
                    resultsTextStyle={resultsTextStyle}
                    layout={resultLayout || layout}
                    transitions={transitions}
                    transitionPlaying={transitionPlaying}
                    transitionStagger={transitionStagger}
                    transitionDisabled={transitionDisabled}
                    className={styles.results}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (current && !isPreview ? viewerTopHeight : 0) +
                                      (headerHeight || spacing),
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) +
                                      (callToActionHeight || spacing),
                              }
                            : null
                    }
                />
            ),
        });
    }

    const contentTransitions = useTransition(contentItems, {
        keys: (item) => item.key,
        from: (item) =>
            item.key === 'next'
                ? { transform: 'translateX(0%)' }
                : {
                      transform: direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
                  },
        enter: { transform: 'translateX(0%)' },
        leave: (item) =>
            item.key === 'next'
                ? { transform: 'translateX(0%)' }
                : {
                      transform: direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)',
                  },
        config: (item) =>
            item.key === 'next'
                ? { duration: 0 }
                : { duration: 1000, easing: easings.easeInOutSine },
    });

    // Background transition
    const bgItem = useMemo(
        () => ({
            key: backgroundKey,
            background: finalBackground || null,
        }),
        [backgroundKey, finalBackground],
    );

    const bgTransitions = useTransition(bgItem, {
        keys: (item) => item.key,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1000, easing: easings.easeInOutSine },
    });

    return (
        <div className={classNames([styles.container, className])} data-screen-ready>
            <Container width={width} height={height} className={styles.content}>
                {showPoints && currentPoints !== null && currentPoints > 0 ? (
                    <div className={styles.points}>
                        {`${currentPoints} `}
                        <FormattedMessage defaultMessage="points gained" description="Quiz label" />
                    </div>
                ) : null}
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
                <Scroll
                    verticalAlign={verticalAlign}
                    disabled={scrollingDisabled}
                    onScrolledTrigger={onScrolledTrigger}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    onScrollHeightChange={onScrollHeightChange}
                    withShadow
                >
                    <div style={{ position: 'absolute', inset: '0' }}>
                        {contentTransitions((springStyle, item) => {
                            const isActive = contentItems.some((ci) => ci.key === item.key);
                            return (
                                <animated.div
                                    style={{
                                        ...springStyle,
                                        ...(!isActive
                                            ? {
                                                  position: 'absolute' as const,
                                                  top: 0,
                                                  left: 0,
                                                  width: '100%',
                                                  minHeight: '100%',
                                                  zIndex: 0,
                                              }
                                            : {
                                                  position: 'relative' as const,
                                                  zIndex: 1,
                                                  top: 0,
                                                  left: 0,
                                                  width: '100%',
                                                  minHeight:
                                                      hasResult && currentAnsweredIndex !== null
                                                          ? 0
                                                          : '100%',
                                              }),
                                    }}
                                >
                                    {item.element}
                                </animated.div>
                            );
                        })}
                    </div>
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
                            paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingTop: spacing / 2,
                            paddingBottom: spacing / 2,
                            transform: !isPreview ? `translate(0, -${viewerBottomHeight}px)` : null,
                        }}
                    >
                        <Footer {...footerProps} />
                    </div>
                ) : null}
            </Container>
            {!isPlaceholder
                ? bgTransitions((springStyle, item) => (
                      <animated.div
                          style={{
                              ...springStyle,
                              position: 'absolute' as const,
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              zIndex: item.key === bgItem.key ? 1 : 0,
                          }}
                      >
                          <Background
                              background={item.background}
                              width={width}
                              height={height}
                              resolution={resolution}
                              playing={backgroundPlaying}
                              muted={muted}
                              shouldLoad={backgroundShouldLoad}
                              mediaRef={mediaRef}
                              className={styles.background}
                              withoutVideo={isPreview}
                          />
                      </animated.div>
                  ))
                : null}
        </div>
    );
}

export default QuizMultipleScreen;
