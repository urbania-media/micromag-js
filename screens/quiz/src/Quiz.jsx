/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useTrackEvent } from '@micromag/core/hooks';
import { isTextFilled, getStyleFromColor } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Button from '@micromag/element-button';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    question: MicromagPropTypes.textElement,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            label: MicromagPropTypes.textElement,
            good: PropTypes.bool,
        }),
    ),
    result: PropTypes.shape({
        image: MicromagPropTypes.imageElement,
        text: MicromagPropTypes.textElement,
    }),
    spacing: PropTypes.number,
    showResultsDelay: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    resultsTransitionDuration: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    question: null,
    answers: null,
    result: null,
    spacing: 20,
    showResultsDelay: 750,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 100,
    resultsTransitionDuration: 500,
    className: null,
};

const QuizScreen = ({
    layout,
    question,
    answers,
    result,
    spacing,
    showResultsDelay,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    resultsTransitionDuration,
    className,
}) => {
    const trackEvent = useTrackEvent();
    const { width, height } = useScreenSize();
    const { menuSize } = useViewer();

    const landscape = width > height;
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasQuestion = isTextFilled(question);
    const hasResult = isTextFilled(result);

    const [userAnswerIndex, setUserAnswerIndex] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [answerTransitionProps, setAnswerTransitionProps] = useState(null);
    const [answerTransitionComplete, setAnswerTransitionComplete] = useState(false);

    const answered = userAnswerIndex !== null;
    const { good: hasUserAnsweredRight = false } =
        userAnswerIndex !== null && answers ? answers[userAnswerIndex] : {};

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const transitionPlaying = current;
    const transitionDisabled = !isView && !isEdit;

    const onAnswerClick = useCallback(
        (answerI) => {
            let timeout = null;
            if (userAnswerIndex === null) {
                setUserAnswerIndex(answerI);
                timeout = setTimeout(setShowResults, showResultsDelay, true);

                const answer = answers[answerI];
                trackEvent('screen-interaction', 'quiz', { label: 'answered', answer });
            }

            return () => {
                if (timeout !== null) {
                    clearTimeout(timeout);
                }
            };
        },
        [userAnswerIndex, setUserAnswerIndex, showResultsDelay, trackEvent, answers],
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

    const answerRef = useRef(null);
    const rightAnswerRef = useRef(null);
    const resultRef = useRef(null);

    useEffect(() => {
        const answerEl = answerRef.current;
        const rightAnswerEl = rightAnswerRef.current;
        const resultEl = resultRef.current;

        if (answerEl !== null && rightAnswerEl !== null && resultEl !== null) {
            const answerHeight = answerEl.offsetHeight;
            const rightAnswerY = rightAnswerEl.offsetTop;
            const rightAnswerHeight = rightAnswerEl.offsetHeight;
            const resultHeight = resultEl.offsetHeight;

            if (answerHeight > 0 && rightAnswerHeight > 0 && resultHeight > 0) {
                setAnswerTransitionProps({
                    rightAnswerTranslateY: -rightAnswerY,
                    answerInitialHeight: answerHeight,
                    answerAnsweredHeight: rightAnswerHeight + resultHeight,
                });
            }
        }
    }, [answers, setAnswerTransitionProps, width, height]);

    // when the animation is done, we set a state to remove animations props
    // .results' position changes from absolute to relative
    // the wrong answers are removed from DOM

    useEffect(() => {
        let timeout = null;
        if (showResults) {
            timeout = setTimeout(setAnswerTransitionComplete, resultsTransitionDuration, true);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [showResults, resultsTransitionDuration, setAnswerTransitionComplete]);

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
                answerTransitionProps !== null && !answerTransitionComplete && (isView || isEdit)
                    ? {
                          transitionDuration: `${resultsTransitionDuration}ms`,
                          height: !showResults
                              ? answerTransitionProps.answerInitialHeight
                              : answerTransitionProps.answerAnsweredHeight,
                      }
                    : null
            }
        >
            {answers !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {(isPlaceholder ? [...new Array(2)] : answers).map((answer, answerI) => {
                        const { good: rightAnswer = false } = answer || {};
                        const userAnswer = answerI === userAnswerIndex;

                        const { label = null } = answer || {};
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
                                    answerTransitionProps &&
                                    showResults &&
                                    rightAnswer &&
                                    !answerTransitionComplete
                                        ? {
                                              transform: `translateY(${answerTransitionProps.rightAnswerTranslateY}px)`,
                                              transitionDuration: `${resultsTransitionDuration}ms`,
                                          }
                                        : null
                                }
                            >
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
                                                borderStyle={
                                                    userAnswer || !answered
                                                        ? {
                                                              width: 2,
                                                              style: 'solid',
                                                              ...getStyleFromColor(
                                                                  labelColor,
                                                                  'color',
                                                              ),
                                                          }
                                                        : null
                                                }
                                            >
                                                {rightAnswer ? (
                                                    <span className={styles.resultIcon}>
                                                        <FontAwesomeIcon
                                                            className={styles.faIcon}
                                                            icon={faCheck}
                                                        />
                                                    </span>
                                                ) : null}
                                                {answered && !hasUserAnsweredRight && userAnswer ? (
                                                    <span className={styles.resultIcon}>
                                                        <FontAwesomeIcon
                                                            className={styles.faIcon}
                                                            icon={faTimes}
                                                        />
                                                    </span>
                                                ) : null}
                                                <Text
                                                    {...label}
                                                    inline
                                                    className={styles.optionLabel}
                                                />
                                            </Button>
                                        </Transitions>
                                    ) : null}
                                </ScreenElement>
                            </div>
                        );
                    })}
                </div>
            ) : null}
            <div className={styles.result} ref={resultRef}>
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
                        </Transitions>
                    ) : null}
                </ScreenElement>
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
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <Layout
                    className={styles.layout}
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!landscape && !isPreview ? menuSize : 0) + spacing,
                              }
                            : null
                    }
                >
                    {items}
                </Layout>
            </Container>
        </div>
    );
};

QuizScreen.propTypes = propTypes;
QuizScreen.defaultProps = defaultProps;

export default QuizScreen;
