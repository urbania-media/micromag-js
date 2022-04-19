/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenRenderContext, useScreenSize, useViewer } from '@micromag/core/contexts';
import { useTrackScreenEvent } from '@micromag/core/hooks';
import {
    getLargestRemainderRound,
    getStyleFromBox,
    getStyleFromColor,
    isTextFilled,
} from '@micromag/core/utils';
import { useQuiz, useQuizCreate } from '@micromag/data';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';
import styles from './styles.module.scss';

const propTypes = {
    id: PropTypes.string,
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    question: MicromagPropTypes.textElement,
    answers: MicromagPropTypes.answers,
    buttonsStyle: MicromagPropTypes.boxStyle,
    resultsStyle: PropTypes.shape({
        barColor: MicromagPropTypes.color,
        textColor: MicromagPropTypes.color,
    }),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    withPercentLabels: PropTypes.bool,
    withoutResults: PropTypes.bool,
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
    resultsStyle: null,
    spacing: 20,
    background: null,
    callToAction: null,
    withPercentLabels: true,
    withoutResults: false,
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
    resultsStyle,
    spacing,
    background,
    callToAction,
    withPercentLabels,
    withoutResults,
    current,
    active,
    transitions,
    transitionStagger,
    resultTransitionDuration,
    type,
    className,
}) => {
    const screenId = id || 'screen-id';
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();
    const { create: submitQuiz } = useQuizCreate({
        screenId,
    });

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const { quiz: quizAnswers = [] } = useQuiz({ screenId, opts: { autoload: !isPlaceholder } });

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
    const backgroundShouldLoad = current || active || !isView;

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

    // Answer

    const buttonsRefs = useRef([]);
    const labelsRefs = useRef([]);
    const [buttonMaxWidth, setButtonMaxWidth] = useState(null);

    const finalTransitionDuration = showInstantAnswer ? 0 : `${resultTransitionDuration}ms`;
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (answers === null || isPlaceholder) {
            return;
        }

        const maxWidth = answers.reduce((currentMaxWidth, answer, answerI) => {
            const button = buttonsRefs.current[answerI] || null;
            const label = labelsRefs.current[answerI] || null;
            if (button !== null && label !== null) {
                const borderWidth = button.offsetWidth - button.clientWidth;
                const totalWidth = borderWidth + label.getBoundingClientRect().width + 20;
                return Math.max(currentMaxWidth, totalWidth);
            }
            return currentMaxWidth;
        }, 0);
        setButtonMaxWidth(Math.min(width * 0.75, Math.max(width * 0.2, maxWidth)));
        setReady(true);
    }, [answers, width, height, setButtonMaxWidth, finalTransitionDuration, isPlaceholder]);

    const { barColor: resultsBarColor = null, textColor: resultsTextColor = null } =
        resultsStyle || {};

    items.push(
        <div key="answers" className={styles.answers}>
            {answers !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {(isPlaceholder ? [...new Array(3)] : answers).map((answer, answerIndex) => {
                        const hasAnswer = answer !== null;
                        const {
                            label = null,
                            buttonStyle: answerButtonStyle = null,
                            resultStyle: answerResultStyle = null,
                        } = answer || {};
                        const {
                            barColor: answerResultBarColor = null,
                            textColor: answerResultTextColor,
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
                                                        width:
                                                            answered && !withoutResults
                                                                ? buttonMaxWidth
                                                                : null,
                                                        transitionDuration: finalTransitionDuration,
                                                    }}
                                                >
                                                    <Button
                                                        className={styles.button}
                                                        onClick={() => onAnswerClick(answerIndex)}
                                                        refButton={(el) => {
                                                            buttonsRefs.current[answerIndex] = el;
                                                        }}
                                                        disabled={isPreview}
                                                        focusable={current && isView}
                                                        buttonStyle={
                                                            !answered
                                                                ? {
                                                                      ...getStyleFromBox(
                                                                          buttonsStyle,
                                                                      ),
                                                                      ...getStyleFromBox(
                                                                          answerButtonStyle,
                                                                      ),
                                                                  }
                                                                : null
                                                        }
                                                    >
                                                        <span
                                                            className={styles.itemLabel}
                                                            ref={(el) => {
                                                                labelsRefs.current[answerIndex] =
                                                                    el;
                                                            }}
                                                        >
                                                            <Text
                                                                {...label}
                                                                textStyle={textStyle}
                                                                inline
                                                                className={styles.itemText}
                                                            />
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div
                                                    className={styles.resultContainer}
                                                    style={{
                                                        transitionDuration: finalTransitionDuration,
                                                    }}
                                                >
                                                    <div
                                                        className={styles.resultContent}
                                                        style={{
                                                            transitionDelay:
                                                                finalTransitionDuration,
                                                            transitionDuration:
                                                                finalTransitionDuration,
                                                        }}
                                                    >
                                                        <div
                                                            className={styles.result}
                                                            style={{
                                                                width: !withoutResults
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
                                                            }}
                                                        >
                                                            {withPercentLabels &&
                                                            !withoutResults ? (
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
                                                                    }}
                                                                >{`${percent}%`}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
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

    // Call to Action
    if (!isPlaceholder && hasCallToAction) {
        if (isTopLayout || isMiddleLayout) {
            items.push(<Spacer key="spacer-cta-bottom" />);
        }
        items.push(
            <div style={{ margin: -spacing, marginTop: 0 }} key="call-to-action">
                <CallToAction
                    callToAction={callToAction}
                    disabled={!answered}
                    animationDisabled={isPreview}
                    focusable={current && isView}
                    screenSize={{ width, height }}
                />
            </div>,
        );
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.answered]: answered,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready={ready}
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
                <Layout
                    className={styles.layout}
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (menuOverScreen && !isPreview ? menuSize : 0) + spacing,
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

SurveyScreen.propTypes = propTypes;
SurveyScreen.defaultProps = defaultProps;

export default SurveyScreen;
