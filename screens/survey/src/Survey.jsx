/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';

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
    layout: 'top',
    question: null,
    answers: null,
    spacing: 20,
    background: null,
    withPercentLabels: true,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: { in: 'fade', out: 'fade' },
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
    const { width, height } = useScreenSize();
    const landscape = width > height;

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasQuestion = isTextFilled(question);

    const [userAnswerIndex, setUserAnswerIndex] = useState(null);
    const answered = userAnswerIndex !== null;

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const onAnswerClick = useCallback(
        (answerIndex) => {
            if (userAnswerIndex === null) {
                setUserAnswerIndex(answerIndex);
            }
        },
        [userAnswerIndex, setUserAnswerIndex],
    );

    // Question

    const items = [
        <ScreenElement
            key="question"
            placeholder="title"
            emptyLabel={
                <FormattedMessage defaultMessage="Question" description="Question placeholder" />
            }
            emptyClassName={styles.empty}
            isEmpty={!hasQuestion}
        >
            {hasQuestion ? (
                <Transitions transitions={transitions} playing={current} disabled={!isView}>
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
    }, [width, height, setButtonMaxWidth]);

    items.push(
        <div key="answers" className={styles.answers}>
            {answers !== null ? (
                <div className={styles.items}>
                    {answers.map((answer, answerIndex) => {
                        const hasAnswer = answer !== null;

                        const { label = null, percent = null } = answer || {};
                        const hasAnswerLabel = isTextFilled(label);

                        return (
                            <div
                                key={`answer-${answerIndex}`}
                                className={classNames([
                                    styles.item,
                                    {
                                        [styles.userAnswered]: userAnswerIndex === answerIndex,
                                    },
                                ])}
                            >
                                <ScreenElement
                                    placeholder="button"
                                    emptyLabel={
                                        <FormattedMessage
                                            defaultMessage="Option"
                                            description="Option placeholder"
                                        />
                                    }
                                    emptyClassName={styles.empty}
                                    isEmpty={!hasAnswerLabel}
                                >
                                    {hasAnswer ? (
                                        <Transitions
                                            transitions={transitions}
                                            playing={current}
                                            delay={(answerIndex + 1) * transitionStagger}
                                            disabled={!isView}
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
                                                        disabled={isPreview || answered}
                                                    >
                                                        <span
                                                            className={styles.itemLabel}
                                                            ref={(el) => {
                                                                labelsRefs.current[answerIndex] = el;
                                                            }}
                                                        >
                                                            <Text {...label} tag="span" />
                                                        </span>
                                                    </Button>
                                                </div>
                                                <div className={styles.resultContainer}>
                                                    <div className={styles.resultContent}>
                                                        <div
                                                            className={styles.result}
                                                            style={{ width: `${percent}%` }}
                                                        >
                                                            {withPercentLabels ? (
                                                                <div
                                                                    className={styles.resultLabel}
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
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: !isPreview && !landscape ? spacing * 2 : spacing,
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
