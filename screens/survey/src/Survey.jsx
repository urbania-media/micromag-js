/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useQuiz, useQuizCreate } from '@micromag/data';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled, getStyleFromColor } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Button from '@micromag/element-button';

import styles from './styles.module.scss';

const propTypes = {
    id: PropTypes.string,
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    question: MicromagPropTypes.textElement,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            label: MicromagPropTypes.textElement,
            percent: PropTypes.number,
        }),
    ),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    withPercentLabels: PropTypes.bool,
    current: PropTypes.bool,
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
    spacing: 20,
    background: null,
    withPercentLabels: true,
    current: true,
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
    spacing,
    background,
    withPercentLabels,
    current,
    transitions,
    transitionStagger,
    resultTransitionDuration,
    type,
    className,
}) => {
    const screenId = id || 'screen-id';
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, landscape } = useScreenSize();
    const { menuSize } = useViewer();
    const { create: submitQuiz } = useQuizCreate({
        screenId,
    });
    const { quiz: quizAnswers } = useQuiz({ screenId }); // eslint-disable-line

    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();

    const hasQuestion = isTextFilled(question);

    const showInstantAnswer = isStatic || isCapture;
    const [userAnswerIndex, setUserAnswerIndex] = useState(showInstantAnswer ? -1 : null);
    const answered = userAnswerIndex !== null;

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview;
    const backgroundPlaying = current && (isView || isEdit);

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

    if (isSplitted) {
        items.push(<Spacer key="spacer" />);
    }

    // Answer

    const buttonsRefs = useRef([]);
    const labelsRefs = useRef([]);
    const [buttonMaxWidth, setButtonMaxWidth] = useState(null);

    const finalTransitionDuration = showInstantAnswer ? 0 : `${resultTransitionDuration}ms`;
    const [ready, setReady] = useState(false);
    useEffect(() => {
        let maxWidth = 0;
        buttonsRefs.current.forEach((button, buttonI) => {
            const label = labelsRefs.current[buttonI];
            const borderWidth = button.offsetWidth - button.clientWidth;
            const totalWidth = borderWidth + label.offsetWidth + 2;
            maxWidth = Math.max(maxWidth, totalWidth);
            setButtonMaxWidth(maxWidth);
        });
        setReady(true);
    }, [answers, width, height, setButtonMaxWidth, finalTransitionDuration]);

    items.push(
        <div key="answers" className={styles.answers}>
            {answers !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {(isPlaceholder ? [...new Array(3)] : answers).map((answer, answerIndex) => {
                        const hasAnswer = answer !== null;
                        const { label = null, percent = 0 } = answer || {};
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
                                        // [styles.userAnswer]: userAnswer,
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
                                                        width: answered ? buttonMaxWidth : null,
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
                                                        <span
                                                            className={styles.itemLabel}
                                                            ref={(el) => {
                                                                labelsRefs.current[
                                                                    answerIndex
                                                                ] = el;
                                                            }}
                                                        >
                                                            <Text
                                                                {...label}
                                                                textStyle={{
                                                                    ...textStyle,
                                                                    color:
                                                                        userAnswer || !answered
                                                                            ? labelColor
                                                                            : null,
                                                                }}
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
                                                            transitionDelay: finalTransitionDuration,
                                                            transitionDuration: finalTransitionDuration,
                                                        }}
                                                    >
                                                        <div
                                                            className={styles.result}
                                                            style={{
                                                                width: `${percent}%`,
                                                                backgroundColor: userAnswer
                                                                    ? labelColor
                                                                    : null,
                                                            }}
                                                        >
                                                            {withPercentLabels ? (
                                                                <div
                                                                    className={styles.resultLabel}
                                                                    style={{
                                                                        color: userAnswer
                                                                            ? labelColor
                                                                            : null,
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
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={backgroundPlaying}
            />
            <Container width={width} height={height}>
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

SurveyScreen.propTypes = propTypes;
SurveyScreen.defaultProps = defaultProps;

export default SurveyScreen;
