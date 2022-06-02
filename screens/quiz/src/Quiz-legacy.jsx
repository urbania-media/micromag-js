/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenRenderContext, useScreenSize, useViewerContext } from '@micromag/core/contexts';
import { useResizeObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { getStyleFromBox, getStyleFromColor, isTextFilled } from '@micromag/core/utils';
import { useQuizCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './styles-legacy.module.scss';

const propTypes = {
    id: PropTypes.string,
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    question: MicromagPropTypes.textElement,
    answers: MicromagPropTypes.quizAnswers,
    result: PropTypes.shape({
        image: MicromagPropTypes.imageElement,
        text: MicromagPropTypes.textElement,
    }),
    buttonsStyle: MicromagPropTypes.boxStyle,
    goodAnswerColor: MicromagPropTypes.color,
    badAnswerColor: MicromagPropTypes.color,
    spacing: PropTypes.number,
    showResultsDelay: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    resultsTransitionDuration: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    id: null,
    layout: 'middle',
    question: null,
    answers: null,
    result: null,
    buttonsStyle: null,
    goodAnswerColor: null,
    badAnswerColor: null,
    spacing: 20,
    showResultsDelay: 750,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 100,
    resultsTransitionDuration: 500,
    type: null,
    className: null,
};

const QuizScreen = ({
    id,
    layout,
    question,
    answers,
    result,
    buttonsStyle,
    goodAnswerColor,
    badAnswerColor,
    spacing,
    showResultsDelay,
    background,
    callToAction,
    current,
    active,
    transitions,
    transitionStagger,
    resultsTransitionDuration,
    type,
    className,
}) => {
    const screenId = id || 'screen-id';
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasQuestion = isTextFilled(question);
    const hasResult = isTextFilled(result);

    const showInstantAnswer = isStatic || isCapture;
    const goodAnswerIndex =
        answers !== null ? answers.findIndex((answer) => answer !== null && answer.good) : null;

    const [userAnswerIndex, setUserAnswerIndex] = useState(
        showInstantAnswer ? goodAnswerIndex : null,
    );
    const [showResults, setShowResults] = useState(showInstantAnswer);
    // const [answerTransitionProps, setAnswerTransitionProps] = useState(null);
    const [answerTransitionComplete, setAnswerTransitionComplete] = useState(showInstantAnswer);

    const answered = userAnswerIndex !== null;
    const { good: hasUserAnsweredRight = false } =
        userAnswerIndex !== null && answers ? answers[userAnswerIndex] : {};

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active;

    // Call to Action

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();

    const { height: callToActionHeight = 0 } = callToActionRect || {};

    const { create: submitQuiz } = useQuizCreate({
        screenId,
    });

    const onAnswerClick = useCallback(
        (answerI) => {
            let timeout = null;
            if (userAnswerIndex === null) {
                setUserAnswerIndex(answerI);
                timeout = setTimeout(setShowResults, showResultsDelay, true);

                const answer = answers[answerI];
                trackScreenEvent('click_answer', `${userAnswerIndex + 1}: ${answer.label.body}`, {
                    answer,
                    answerIndex: answerI,
                });
            }

            return () => {
                if (timeout !== null) {
                    clearTimeout(timeout);
                }
            };
        },
        [userAnswerIndex, setUserAnswerIndex, showResultsDelay, trackScreenEvent, answers],
    );

    useEffect(() => {
        if (!current && isEdit && userAnswerIndex !== null) {
            setUserAnswerIndex(null);
            setShowResults(false);
            setAnswerTransitionComplete(false);
        }
    }, [
        isEdit,
        current,
        userAnswerIndex,
        setUserAnswerIndex,
        setShowResults,
        setAnswerTransitionComplete,
    ]);

    // we get .answer's current and future height to animate its height
    // we also get the right answer's Y to animate its position

    const {
        ref: answerRef,
        entry: { contentRect: answerContentRect },
    } = useResizeObserver();
    const { height: answerHeight } = answerContentRect || {};

    const {
        ref: rightAnswerRef,
        entry: { contentRect: rightAnswerContentRect },
    } = useResizeObserver();
    const { height: rightAnswerHeight } = rightAnswerContentRect || {};

    const {
        ref: resultRef,
        entry: { contentRect: resultContentRect },
    } = useResizeObserver();
    const { height: resultHeight } = resultContentRect || {};

    const [rightAnswerTop, setRightAnswerTop] = useState(0);

    useEffect(() => {
        if (rightAnswerRef.current !== null) {
            setRightAnswerTop(rightAnswerRef.current.offsetTop);
        }
    }, [rightAnswerHeight]);

    // when the animation is done, we set a state to remove animations props
    // .results' position changes from absolute to relative
    // the wrong answers are removed from DOM

    useEffect(() => {
        let timeout = null;
        if (!showInstantAnswer && showResults) {
            timeout = setTimeout(setAnswerTransitionComplete, resultsTransitionDuration, true);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [showResults, resultsTransitionDuration, setAnswerTransitionComplete, showInstantAnswer]);

    useEffect(() => {
        if (userAnswerIndex !== null) {
            const { good: isGood = false, label = {} } =
                userAnswerIndex !== null && answers ? answers[userAnswerIndex] : {};
            const { body = '' } = label || {};
            submitQuiz({ choice: body || userAnswerIndex, value: isGood ? 1 : 0 });
        }
    }, [userAnswerIndex, answers, submitQuiz]);

    // Question

    const items = [
        <ScreenElement
            key="question"
            placeholder="title"
            emptyLabel={
                <FormattedMessage defaultMessage="Question" description="Question placeholder" />
            }
            emptyClassName={styles.emptyTitle}
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

    if (isSplitted) {
        items.push(<Spacer key="spacer" />);
    }

    // Answer

    items.push(
        <div
            key="answers"
            className={styles.answers}
            ref={answerRef}
            style={
                answered && !answerTransitionComplete && (isView || isEdit)
                    ? {
                          transitionDuration: `${resultsTransitionDuration}ms`,
                          height: !showResults ? answerHeight : rightAnswerHeight + resultHeight,
                      }
                    : null
            }
        >
            {answers !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {(isPlaceholder ? [...new Array(2)] : answers).map((answer, answerI) => {
                        const userAnswer = answerI === userAnswerIndex;
                        const {
                            good: rightAnswer = false,
                            label = null,
                            buttonStyle: answerButtonStyle = null,
                        } = answer || {};
                        const { textStyle = null } = label || {};
                        const { color: labelColor = null } = textStyle || {};

                        const hasAnswer = isTextFilled(label);

                        return answerTransitionComplete && !rightAnswer ? null : (
                            <div
                                key={`answer-${answerI}`}
                                ref={rightAnswer ? rightAnswerRef : null}
                                className={classNames([
                                    styles.item,
                                    {
                                        [styles.rightAnswer]: rightAnswer,
                                        [styles.userAnswer]: userAnswer,
                                    },
                                ])}
                                style={
                                    showResults && rightAnswer && !answerTransitionComplete
                                        ? {
                                              transform: `translateY(${-rightAnswerTop}px)`,
                                              transitionDuration: `${resultsTransitionDuration}ms`,
                                          }
                                        : null
                                }
                            >
                                <div className={styles.itemContent}>
                                    <ScreenElement
                                        placeholder="quizAnswer"
                                        placeholderProps={{ good: answerI === 0 }}
                                        emptyLabel={
                                            <FormattedMessage
                                                defaultMessage="Answer"
                                                description="Answer placeholder"
                                            />
                                        }
                                        emptyClassName={styles.emptyAnswer}
                                        isEmpty={!hasAnswer}
                                    >
                                        {hasAnswer ? (
                                            <Transitions
                                                transitions={transitions}
                                                playing={transitionPlaying}
                                                delay={(answerI + 1) * transitionStagger}
                                                disabled={transitionDisabled}
                                            >
                                                <Button
                                                    className={styles.button}
                                                    onClick={() => onAnswerClick(answerI)}
                                                    disabled={isPreview}
                                                    focusable={current && isView}
                                                    buttonStyle={{
                                                        ...getStyleFromBox(buttonsStyle),
                                                        ...getStyleFromBox(answerButtonStyle),
                                                    }}
                                                >
                                                    {rightAnswer ? (
                                                        <span
                                                            className={styles.resultIcon}
                                                            style={getStyleFromColor(
                                                                goodAnswerColor,
                                                                'backgroundColor',
                                                            )}
                                                        >
                                                            <FontAwesomeIcon
                                                                className={styles.faIcon}
                                                                icon={faCheck}
                                                            />
                                                        </span>
                                                    ) : null}
                                                    {answered &&
                                                    !hasUserAnsweredRight &&
                                                    userAnswer ? (
                                                        <span
                                                            className={styles.resultIcon}
                                                            style={getStyleFromColor(
                                                                badAnswerColor,
                                                                'backgroundColor',
                                                            )}
                                                        >
                                                            <FontAwesomeIcon
                                                                className={styles.faIcon}
                                                                icon={faTimes}
                                                            />
                                                        </span>
                                                    ) : null}
                                                    <Text
                                                        {...label}
                                                        className={styles.optionLabel}
                                                    />
                                                </Button>
                                            </Transitions>
                                        ) : null}
                                    </ScreenElement>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : null}
            <div className={styles.result} ref={resultRef}>
                <div className={styles.resultContent}>
                    <ScreenElement
                        emptyLabel={
                            answered ? (
                                <FormattedMessage
                                    defaultMessage="Result"
                                    description="Result placeholder"
                                />
                            ) : null
                        }
                        isEmpty={answered && !hasResult}
                        emptyClassName={styles.emptyResult}
                    >
                        {hasResult && answers !== null ? (
                            <Transitions
                                transitions={transitions}
                                playing={transitionPlaying}
                                delay={(1 + answers.length) * transitionStagger}
                                disabled={transitionDisabled}
                            >
                                <Text {...result} className={styles.resultText} />
                                {hasCallToAction ? (
                                    <div style={{ height: callToActionHeight }} />
                                ) : null}
                            </Transitions>
                        ) : null}
                    </ScreenElement>
                </div>
            </div>
        </div>,
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.answered]: answered,
                    [styles.showResults]: showResults,
                    [styles.answerTransitionComplete]: answerTransitionComplete,
                },
            ])}
            data-screen-ready
        >
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={backgroundShouldLoad}
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    className={styles.layout}
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                  paddingBottom: (!isPreview ? viewerBottomHeight : 0) + spacing,
                              }
                            : null
                    }
                >
                    {items}
                </Layout>
                {!isPlaceholder && hasCallToAction ? (
                    <CallToAction
                        ref={callToActionRef}
                        className={styles.callToAction}
                        callToAction={callToAction}
                        disabled={!answerTransitionComplete}
                        animationDisabled={isPreview}
                        focusable={current && isView}
                        screenSize={{ width, height }}
                    />
                ) : null}
            </Container>
        </div>
    );
};

QuizScreen.propTypes = propTypes;
QuizScreen.defaultProps = defaultProps;

export default QuizScreen;
