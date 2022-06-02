/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenRenderContext, useScreenSize, useViewer, useViewerInteraction } from '@micromag/core/contexts';
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
    question: MicromagPropTypes.textElement,
    answers: MicromagPropTypes.quizAnswers,
    result: PropTypes.shape({
        image: MicromagPropTypes.imageElement,
        text: MicromagPropTypes.textElement,
    }),
    buttonsStyle: MicromagPropTypes.boxStyle,
    buttonsTextStyle: MicromagPropTypes.textStyle,
    goodAnswerColor: MicromagPropTypes.color,
    badAnswerColor: MicromagPropTypes.color,
    withoutTrueFalse: PropTypes.bool,
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
    question: null,
    answers: null,
    result: null,
    buttonsStyle: null,
    buttonsTextStyle: null,
    goodAnswerColor: null,
    badAnswerColor: null,
    withoutTrueFalse: false,
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

const QuizScreen = ({
    id,
    layout,
    question,
    answers,
    result,
    buttonsStyle,
    buttonsTextStyle,
    goodAnswerColor,
    badAnswerColor,
    withoutTrueFalse,
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
    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight } = useViewer();
    const { enableInteraction, disableInteraction } = useViewerInteraction();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    // Call to Action

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();
    const { height: callToActionHeight = 0 } = callToActionRect || {};

    const showInstantAnswer = isStatic || isCapture;
    const goodAnswerIndex =
        answers !== null ? answers.findIndex((answer) => answer !== null && answer.good) : null;

    const [userAnswerIndex, setUserAnswerIndex] = useState(
        showInstantAnswer ? goodAnswerIndex : null,
    );

    const { create: submitQuiz } = useQuizCreate({
        screenId,
    });

    const onAnswerClick = useCallback(
        (answer, answerI) => {
            if (userAnswerIndex !== null) {
                return;
            }
            setUserAnswerIndex(answerI);

            trackScreenEvent('click_answer', `${userAnswerIndex + 1}: ${answer.label.body}`, {
                answer,
                answerIndex: answerI,
            });
        },
        [userAnswerIndex, setUserAnswerIndex, trackScreenEvent, answers],
    );

    useEffect(() => {
        if (!current && isEdit && userAnswerIndex !== null) {
            setUserAnswerIndex(null);
        }
    }, [isEdit, current, userAnswerIndex, setUserAnswerIndex]);

    useEffect(() => {
        if (userAnswerIndex !== null) {
            const { good: isGood = false, label = {} } =
                userAnswerIndex !== null && answers ? answers[userAnswerIndex] : {};
            const { body = '' } = label || {};
            submitQuiz({ choice: body || userAnswerIndex, value: isGood ? 1 : 0 });
        }
    }, [userAnswerIndex, answers, submitQuiz]);

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
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
                />
            ) : null}
            <Container width={width} height={height}>
                <Question
                    question={question}
                    answers={answers}
                    result={result}
                    answeredIndex={userAnswerIndex}
                    buttonsStyle={buttonsStyle}
                    buttonsTextStyle={buttonsTextStyle}
                    goodAnswerColor={goodAnswerColor}
                    badAnswerColor={badAnswerColor}
                    withoutTrueFalse={withoutTrueFalse}
                    focusable={current && isView}
                    showInstantAnswer={showInstantAnswer}
                    withResult
                    layout={layout}
                    callToActionHeight={callToActionHeight}
                    transitions={transitions}
                    transitionPlaying={transitionPlaying}
                    transitionStagger={transitionStagger}
                    transitionDisabled={transitionDisabled}
                    onAnswerClick={onAnswerClick}
                    className={styles.question}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (!isPreview ? viewerTopHeight : 0) + spacing,
                              }
                            : null
                    }
                />
                {!isPlaceholder && hasCallToAction ? (
                    <CallToAction
                        ref={callToActionRef}
                        className={styles.callToAction}
                        callToAction={callToAction}
                        animationDisabled={isPreview}
                        focusable={current && isView}
                        screenSize={{ width, height }}
                        enableInteraction={enableInteraction}
                        disableInteraction={disableInteraction}
                    />
                ) : null}
            </Container>
        </div>
    );
};

QuizScreen.propTypes = propTypes;
QuizScreen.defaultProps = defaultProps;

export default QuizScreen;
