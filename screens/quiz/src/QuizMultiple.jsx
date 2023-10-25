/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import {
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useScreenState,
    usePlaybackContext,
    usePlaybackMediaRef,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { isHeaderFilled, isFooterFilled, getFooterProps } from '@micromag/core/utils';
import { useQuizCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Scroll from '@micromag/element-scroll';

import Question from './partials/Question';
import Results from './partials/Results';
import Title from './partials/Title';

import styles from './quiz.module.scss';

const propTypes = {
    id: PropTypes.string,
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    introLayout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    title: MicromagPropTypes.textElement,
    description: MicromagPropTypes.textElement,
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            text: MicromagPropTypes.textElement,
            answers: MicromagPropTypes.quizAnswers,
        }),
    ),
    results: PropTypes.arrayOf(
        PropTypes.shape({
            title: MicromagPropTypes.textElement,
            description: MicromagPropTypes.textElement,
        }),
    ),
    buttonsStyle: MicromagPropTypes.boxStyle,
    buttonsTextStyle: MicromagPropTypes.textStyle,
    questionsHeadingStyle: MicromagPropTypes.textStyle,
    resultsHeadingStyle: MicromagPropTypes.textStyle,
    resultsTextStyle: MicromagPropTypes.textStyle,
    goodAnswerColor: MicromagPropTypes.color,
    badAnswerColor: MicromagPropTypes.color,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    introButton: MicromagPropTypes.textElement,
    introBackground: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    id: null,
    layout: 'middle',
    introLayout: null,
    title: null,
    description: null,
    questions: null,
    results: null,
    buttonsStyle: null,
    buttonsTextStyle: null,
    questionsHeadingStyle: null,
    resultsHeadingStyle: null,
    resultsTextStyle: null,
    goodAnswerColor: null,
    badAnswerColor: null,
    spacing: 20,
    background: null,
    introButton: null,
    introBackground: null,
    header: null,
    footer: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 100,
    type: null,
    className: null,
};

const QuizMultipleScreen = ({
    id,
    layout,
    introLayout,
    title,
    description,
    questions,
    results,
    buttonsStyle,
    buttonsTextStyle,
    questionsHeadingStyle,
    resultsHeadingStyle,
    resultsTextStyle,
    goodAnswerColor,
    badAnswerColor,
    spacing,
    background,
    introBackground,
    introButton,
    header,
    footer,
    current,
    active,
    transitions,
    transitionStagger,
    type,
    className,
}) => {
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
    const mediaRef = usePlaybackMediaRef(current);
    const { open: openWebView } = useViewerWebView();
    const screenState = useScreenState();
    const [stateId = null, stateIndex = 0] = screenState !== null ? screenState.split('.') : [];

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active;

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
                    question: questions[questionIndex],
                    questionIndex,
                    answer,
                    answerIndex,
                },
            );
        },
        [userAnswers, setUserAnswers, trackScreenEvent, questions, questionIndex],
    );

    const onAnswerTransitionEnd = useCallback(() => {
        if (isEdit) {
            return;
        }
        const nextIndex = questionIndex + 1;
        const questionsCount = questions.length;
        if (nextIndex < questionsCount) {
            setQuestionIndex(nextIndex);
        } else if (nextIndex === questionsCount) {
            setQuestionIndex('results');
        }
    }, [questions, questionIndex, setQuestionIndex, isEdit]);

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
    } = currentQuestion;
    const currentAnsweredIndex =
        userAnswers !== null && typeof userAnswers[questionIndex] !== 'undefined'
            ? userAnswers[questionIndex]
            : null;

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

    const { background: resultBackground = null, layout: resultLayout = null } =
        currentResult || {};

    const { create: submitQuiz } = useQuizCreate({
        screenId,
    });

    useEffect(() => {
        if (!isResults || isEdit) {
            return;
        }
        submitQuiz({ choice: userAnswers, value: currentPoints });
    }, [isResults, userAnswers, submitQuiz]);

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
    }, [stateId, stateIndex, isEdit, setQuestionIndex]);

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
    const showReset = isEdit;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles[direction]]: direction !== null,
                    [className]: className !== null,
                },
            ])}
            data-screen-ready
        >
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
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    onScrollHeightChange={onScrollHeightChange}
                >
                    <TransitionGroup>
                        {[
                            isIntro ? (
                                <CSSTransition key="intro" classNames={styles} timeout={1000}>
                                    <Title
                                        title={title}
                                        description={description}
                                        layout={introLayout || layout}
                                        button={introButton}
                                        buttonDisabled={
                                            (questions || []).length < 1 || isEdit || isPreview
                                        }
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
                                                      paddingTop:
                                                          (!isPreview ? viewerTopHeight : 0) +
                                                          spacing,
                                                      paddingBottom:
                                                          (current && !isPreview
                                                              ? viewerBottomHeight
                                                              : 0) +
                                                          (callToActionHeight || spacing),
                                                  }
                                                : null
                                        }
                                        onClickButton={onClickIntroButton}
                                    />
                                </CSSTransition>
                            ) : null,
                            isQuestion ? (
                                <CSSTransition
                                    key={`question-${questionIndex}`}
                                    classNames={styles}
                                    timeout={1000}
                                >
                                    <Question
                                        index={questionIndex}
                                        totalCount={(questions || []).length}
                                        question={text}
                                        answers={answers}
                                        answeredIndex={currentAnsweredIndex}
                                        buttonsStyle={buttonsStyle}
                                        buttonsTextStyle={buttonsTextStyle}
                                        questionsHeadingStyle={questionsHeadingStyle}
                                        goodAnswerColor={goodAnswerColor}
                                        badAnswerColor={badAnswerColor}
                                        focusable={current && isView}
                                        showInstantAnswer={showInstantAnswer}
                                        layout={questionLayout || layout}
                                        withoutGoodAnswer
                                        withoutTrueFalse
                                        transitions={transitions}
                                        transitionPlaying={transitionPlaying}
                                        transitionStagger={transitionStagger}
                                        transitionDisabled={transitionDisabled}
                                        onAnswerClick={onAnswerClick}
                                        onAnswerTransitionEnd={onAnswerTransitionEnd}
                                        className={styles.question}
                                        style={
                                            !isPlaceholder
                                                ? {
                                                      padding: spacing,
                                                      paddingTop:
                                                          (current && !isPreview
                                                              ? viewerTopHeight
                                                              : 0) + (headerHeight || spacing),
                                                      paddingBottom:
                                                          (current && !isPreview
                                                              ? viewerBottomHeight
                                                              : 0) +
                                                          (callToActionHeight || spacing),
                                                  }
                                                : null
                                        }
                                    />
                                </CSSTransition>
                            ) : null,
                            isResults ? (
                                <CSSTransition key="results" classNames={styles} timeout={2000}>
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
                                                          (current && !isPreview
                                                              ? viewerTopHeight
                                                              : 0) + (headerHeight || spacing),
                                                      paddingBottom:
                                                          (current && !isPreview
                                                              ? viewerBottomHeight
                                                              : 0) +
                                                          (callToActionHeight || spacing),
                                                  }
                                                : null
                                        }
                                    />
                                </CSSTransition>
                            ) : null,
                        ]}
                    </TransitionGroup>
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
            {!isPlaceholder ? (
                <TransitionGroup>
                    <CSSTransition key={backgroundKey} classNames={styles} timeout={1000}>
                        <Background
                            background={finalBackground}
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
                    </CSSTransition>
                </TransitionGroup>
            ) : null}
        </div>
    );
};

QuizMultipleScreen.propTypes = propTypes;
QuizMultipleScreen.defaultProps = defaultProps;

export default QuizMultipleScreen;
