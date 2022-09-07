/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    usePlaybackContext,
    usePlaybackMediaRef,
    useViewerWebView,
    useVisitor,
} from '@micromag/core/contexts';
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { useQuizCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Scroll from '@micromag/element-scroll';

import Question from './partials/Question';

import styles from './quiz.module.scss';

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
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    // Call to Action
    const { active: hasCallToAction = false } = callToAction || {};
    const { ref: callToActionRef, height: callToActionHeight = 0 } = useDimensionObserver();

    const showInstantAnswer = isStatic || isCapture;
    const goodAnswerIndex =
        answers !== null ? answers.findIndex((answer) => answer !== null && answer.good) : null;

    const [userAnswerIndex, setUserAnswerIndex] = useState(
        showInstantAnswer ? goodAnswerIndex : null,
    );

    const visitor = useVisitor();
    const { id: visitorId = null } = visitor || {};
    const { create: submitQuiz } = useQuizCreate({
        screenId,
        visitorId,
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

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

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
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                />
            ) : null}
            <Container width={width} height={height}>
                <Scroll
                    verticalAlign={verticalAlign}
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                >
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
                                      paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                      paddingBottom:
                                          (current && !isPreview ? viewerBottomHeight : 0) +
                                          (callToActionHeight || spacing),
                                  }
                                : null
                        }
                    />
                </Scroll>
                {!isPlaceholder && hasCallToAction ? (
                    <div
                        ref={callToActionRef}
                        className={classNames([
                            styles.callToAction,
                            {
                                [styles.disabled]: !scrolledBottom,
                            },
                        ])}
                        style={{
                            transform:
                                current && !isPreview
                                    ? `translate(0, -${viewerBottomHeight}px)`
                                    : null,
                            paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingTop: spacing / 2,
                            paddingBottom: spacing / 2,
                        }}
                    >
                        <CallToAction
                            {...callToAction}
                            animationDisabled={isPreview}
                            focusable={current && isView}
                            openWebView={openWebView}
                        />
                    </div>
                ) : null}
            </Container>
        </div>
    );
};

QuizScreen.propTypes = propTypes;
QuizScreen.defaultProps = defaultProps;

export default QuizScreen;
