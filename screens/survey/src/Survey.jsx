/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

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
            percent: PropTypes.number,
        }),
    ),
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    withPercentLabels: PropTypes.bool,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    question: null,
    answers: null,
    spacing: 20,
    background: null,
    withPercentLabels: true,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const SurveyScreen = ({
    layout,
    question,
    answers,
    spacing,
    background,
    withPercentLabels,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const trackEvent = useTrackEvent();
    const { width, height } = useScreenSize();
    const { menuSize } = useViewer();

    const landscape = width > height;

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasQuestion = isTextFilled(question);

    const [userAnswerIndex, setUserAnswerIndex] = useState(null);
    const answered = userAnswerIndex !== null;
    
    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const transitionPlaying = current;
    const transitionDisabled = !isView && !isEdit;

    const onAnswerClick = useCallback(
        (answerIndex) => {
            if (userAnswerIndex === null) {
                setUserAnswerIndex(answerIndex);
                const userAnswer = answers[answerIndex];
                trackEvent('screen-interaction', 'survey-answered', { userAnswer });
            }
        },
        [userAnswerIndex, setUserAnswerIndex, trackEvent],
    );

    useEffect( () => {
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
                <Transitions transitions={transitions} playing={transitionPlaying} disabled={transitionDisabled}>
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

    useEffect(() => {
        let maxWidth = 0;
        buttonsRefs.current.forEach((button, buttonI) => {
            const label = labelsRefs.current[buttonI];
            const borderWidth = button.offsetWidth - button.clientWidth;
            const totalWidth = borderWidth + label.offsetWidth + 2;
            maxWidth = Math.max(maxWidth, totalWidth);
            setButtonMaxWidth(maxWidth);
        });
    }, [answers, width, height, setButtonMaxWidth]);

    items.push(
        <div key="answers" className={styles.answers}>
            {answers !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {(isPlaceholder ? [...new Array(3)] : answers).map((answer, answerIndex) => {
                        const hasAnswer = answer !== null;
                        const { label = null, percent = null } = answer || {};
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
                                                        width: answered ? buttonMaxWidth : null,
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
                                                <div className={styles.resultContainer}>
                                                    <div className={styles.resultContent}>
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

SurveyScreen.propTypes = propTypes;
SurveyScreen.defaultProps = defaultProps;

export default SurveyScreen;
