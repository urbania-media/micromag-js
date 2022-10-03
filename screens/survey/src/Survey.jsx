/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
    useVisitor,
} from '@micromag/core/contexts';
import { useTrackScreenEvent, useDimensionObserver } from '@micromag/core/hooks';
import { getLargestRemainderRound, getStyleFromColor, isTextFilled } from '@micromag/core/utils';
import { useQuiz, useQuizCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';

import styles from './survey.module.scss';

const propTypes = {
    id: PropTypes.string,
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    question: MicromagPropTypes.textElement,
    answers: MicromagPropTypes.answers,
    buttonsStyle: MicromagPropTypes.boxStyle,
    buttonsTextStyle: MicromagPropTypes.textStyle,
    resultsStyle: PropTypes.shape({
        barColor: MicromagPropTypes.color,
        textColor: MicromagPropTypes.color,
        percentageTextStyle: MicromagPropTypes.textStyle,
    }),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    withoutPercentage: PropTypes.bool,
    withoutBar: PropTypes.bool,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    resultTransitionDuration: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    id: null,
    layout: 'middle',
    question: null,
    answers: null,
    buttonsStyle: null,
    buttonsTextStyle: null,
    resultsStyle: null,
    spacing: 20,
    background: null,
    callToAction: null,
    withoutPercentage: false,
    withoutBar: false,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 100,
    resultTransitionDuration: 500,
    type: null,
    className: null,
};

const SurveyScreen = ({
    id,
    layout,
    question,
    answers,
    buttonsStyle,
    buttonsTextStyle,
    resultsStyle,
    spacing,
    background,
    callToAction,
    withoutPercentage,
    withoutBar,
    current,
    active,
    transitions,
    transitionStagger,
    resultTransitionDuration,
    type,
    className,
}) => {
    const screenId = id || 'screen-id';
    const visitor = useVisitor();
    const { id: visitorId = null } = visitor || {};
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, resolution } = useScreenSize();
    const { create: submitQuiz } = useQuizCreate({
        screenId,
        visitorId,
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
    const mediaRef = usePlaybackMediaRef(current);

    const { quiz: allQuizAnswers = [] } = useQuiz({ screenId, opts: { autoload: !isPlaceholder } });
    const quizAnswers = allQuizAnswers.filter((item) => {
        const { choice = null } = item || {};
        const answersBody = answers
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
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const verticalAlign = isSplitted ? null : layout;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    const onAnswerClick = useCallback(
        (answerIndex) => {
            if (userAnswerIndex === null) {
                setUserAnswerIndex(answerIndex);
                const answer = answers[answerIndex];
                submitQuiz({ choice: answer.label.body || answerIndex, value: 1 });
                trackScreenEvent(
                    'click_answer',
                    `Answer ${userAnswerIndex + 1}: ${answer.label.body}`,
                    {
                        answer,
                        answerIndex,
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

    // Call to Action
    const { active: hasCallToAction = false } = callToAction || {};
    const { ref: callToActionRef, height: callToActionHeight = 0 } = useDimensionObserver();

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

    if (isSplitted || (!isPlaceholder && hasCallToAction && isMiddleLayout)) {
        items.push(<Spacer key="spacer" />);
    }

    const finalTransitionDuration = showInstantAnswer ? 0 : `${resultTransitionDuration}ms`;

    const {
        barColor: resultsBarColor = null,
        textColor: resultsTextColor = null,
        percentageTextStyle: resultsPercentageTextStyle = null,
    } = resultsStyle || {};

    items.push(
        <div key="answers" className={styles.answers}>
            {answers !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {(isPlaceholder ? [...new Array(3)] : answers).map((answer, answerIndex) => {
                        const hasAnswer = answer !== null;
                        const {
                            label = null,
                            buttonStyle: answerButtonStyle = null,
                            textStyle: answerButtonTextStyle = null,
                            resultStyle: answerResultStyle = null,
                        } = answer || {};
                        const {
                            barColor: answerResultBarColor = null,
                            textColor: answerResultTextColor,
                            percentageTextStyle: answerResultPercentageTextStyle = null,
                        } = answerResultStyle || {};
                        const { body = null } = label || {};
                        const { percent = 0 } =
                            body !== null ? quizAnswersComputed[body] || {} : {};
                        const { textStyle = null } = label || {};
                        const { color: labelColor = null } = textStyle || {};
                        const hasAnswerLabel = isTextFilled(label);
                        const userAnswer = userAnswerIndex === answerIndex;

                        return (
                            <div
                                key={`answer-${answerIndex}`}
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
                                        <Transitions
                                            transitions={transitions}
                                            playing={transitionPlaying}
                                            delay={(answerIndex + 1) * transitionStagger}
                                            disabled={transitionDisabled}
                                        >
                                            <div className={styles.itemContent}>
                                                <div
                                                    className={styles.itemInner}
                                                    style={{
                                                        transitionDuration: finalTransitionDuration,
                                                    }}
                                                >
                                                    <Button
                                                        className={styles.button}
                                                        onClick={() => onAnswerClick(answerIndex)}
                                                        disabled={
                                                            isPreview || userAnswerIndex !== null
                                                        }
                                                        focusable={current && isView}
                                                        buttonStyle={{
                                                            ...buttonsStyle,
                                                            ...answerButtonStyle,
                                                            ...(answered
                                                                ? { textAlign: 'left' }
                                                                : null),
                                                        }}
                                                        textStyle={{
                                                            ...textStyle,
                                                            ...buttonsTextStyle,
                                                            ...answerButtonTextStyle,
                                                        }}
                                                    >
                                                        <span className={styles.itemLabel}>
                                                            <Text
                                                                {...label}
                                                                textStyle={{
                                                                    ...textStyle,
                                                                    ...buttonsTextStyle,
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
                                                                            ...textStyle,
                                                                            ...buttonsTextStyle,
                                                                            ...resultsTextColor,
                                                                            ...resultsPercentageTextStyle,
                                                                            ...answerResultTextColor,
                                                                            ...answerResultPercentageTextStyle,
                                                                        }}
                                                                        inline
                                                                        className={
                                                                            styles.resultText
                                                                        }
                                                                        body={`${percent}%`}
                                                                    />
                                                                </div>
                                                            ) : null}
                                                            {!withoutBar ? (
                                                                <div
                                                                    className={styles.resultBar}
                                                                    style={{
                                                                        transitionDuration:
                                                                            finalTransitionDuration,
                                                                        width:
                                                                            percent !== null
                                                                                ? `${percent}%`
                                                                                : null,
                                                                        ...getStyleFromColor(
                                                                            answered
                                                                                ? answerResultBarColor ||
                                                                                      resultsBarColor ||
                                                                                      labelColor
                                                                                : null,
                                                                            'backgroundColor',
                                                                        ),
                                                                        ...(answered
                                                                            ? { opacity: 1 }
                                                                            : { opacity: 0 }),
                                                                    }}
                                                                />
                                                            ) : null}
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Transitions>
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
                    [styles.withPercentage]: !withoutPercentage,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    verticalAlign={verticalAlign}
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                >
                    <Layout
                        className={styles.layout}
                        verticalAlign={verticalAlign}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                      paddingBottom:
                                          (current && !isPreview ? viewerBottomHeight : 0) +
                                          (callToActionHeight + spacing),
                                  }
                                : null
                        }
                    >
                        {items}
                    </Layout>
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
                            transform: !isPreview ? `translate(0, -${viewerBottomHeight}px)` : null,
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

SurveyScreen.propTypes = propTypes;
SurveyScreen.defaultProps = defaultProps;

export default SurveyScreen;
