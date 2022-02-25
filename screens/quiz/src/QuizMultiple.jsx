/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenRenderContext, useScreenSize, useViewer } from '@micromag/core/contexts';
import { useResizeObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { useQuizCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Question from './Question';
import styles from './styles.module.scss';

const propTypes = {
    id: PropTypes.string,
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            question: MicromagPropTypes.textElement,
            answers: MicromagPropTypes.quizAnswers,
        }),
    ),
    buttonsStyle: MicromagPropTypes.boxStyle,
    goodAnswerColor: MicromagPropTypes.color,
    badAnswerColor: MicromagPropTypes.color,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
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
    questions: null,
    buttonsStyle: null,
    goodAnswerColor: null,
    badAnswerColor: null,
    spacing: 20,
    background: null,
    callToAction: null,
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
    questions,
    buttonsStyle,
    goodAnswerColor,
    badAnswerColor,
    spacing,
    background,
    callToAction,
    current,
    active,
    transitions,
    transitionStagger,
    type,
    className,
}) => {
    const screenId = id || 'screen-id';
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;

    // Call to Action

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();
    const { height: callToActionHeight = 0 } = callToActionRect || {};

    const showInstantAnswer = isStatic || isCapture;

    const [userAnswers, setUserAnswers] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);

    const { create: submitQuiz } = useQuizCreate({
        screenId,
    });

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
        const nextIndex = questionIndex + 1;
        if (nextIndex < questions.length) {
            setQuestionIndex(nextIndex);
        }
    }, [questions, questionIndex, setQuestionIndex]);

    useEffect(() => {
        if (!current && isEdit && userAnswers !== null) {
            setUserAnswers(null);
        }
    }, [isEdit, current, userAnswers, setUserAnswers]);

    // useEffect(() => {
    //     if (userAnswerIndex !== null) {
    //         const { good: isGood = false, label = {} } =
    //             userAnswerIndex !== null && answers ? answers[userAnswerIndex] : {};
    //         const { body = '' } = label || {};
    //         submitQuiz({ choice: body || userAnswerIndex, value: isGood ? 1 : 0 });
    //     }
    // }, [userAnswerIndex, answers, submitQuiz]);

    const { text = null, answers = [] } =
        questions !== null && questions.length > 0 ? questions[questionIndex] || {} : {};

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
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
                    shouldLoad={backgroundShouldLoad}
                />
            ) : null}
            <Container width={width} height={height}>
                <TransitionGroup>
                    <CSSTransition
                        key={`question-${questionIndex}`}
                        classNames={{
                            ...styles,
                        }}
                        timeout={10000}
                    >
                        <Question
                            question={text}
                            answers={answers}
                            answeredIndex={
                                userAnswers !== null ? userAnswers[questionIndex] || null : null
                            }
                            buttonsStyle={buttonsStyle}
                            goodAnswerColor={goodAnswerColor}
                            badAnswerColor={badAnswerColor}
                            focusable={current && isView}
                            showInstantAnswer={showInstantAnswer}
                            layout={layout}
                            withoutGoodAnswer
                            callToActionHeight={callToActionHeight}
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
                                              (menuOverScreen && !isPreview ? menuSize : 0) +
                                              spacing,
                                      }
                                    : null
                            }
                        />
                    </CSSTransition>
                </TransitionGroup>
                {!isPlaceholder && hasCallToAction ? (
                    <CallToAction
                        ref={callToActionRef}
                        className={styles.callToAction}
                        callToAction={callToAction}
                        animationDisabled={isPreview}
                        focusable={current && isView}
                    />
                ) : null}
            </Container>
        </div>
    );
};

QuizMultipleScreen.propTypes = propTypes;
QuizMultipleScreen.defaultProps = defaultProps;

export default QuizMultipleScreen;
