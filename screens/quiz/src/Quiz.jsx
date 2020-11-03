/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Button from '@micromag/element-button';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    question: MicromagPropTypes.textElement,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            label: MicromagPropTypes.textElement,
            answer: PropTypes.bool,
        }),
    ),
    answerIndex: PropTypes.number,
    result: PropTypes.shape({
        image: MicromagPropTypes.imageElement,
        text: MicromagPropTypes.textElement,
    }),
    padding: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions, // @TODO transforme l'objet en string ???
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    question: null,
    options: null,
    answerIndex: null,
    result: null,
    padding: 20,
    background: null,
    current: true,
    active: false,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const Quiz = ({
    layout,
    question,
    options,
    answerIndex,
    result,
    padding,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasQuestion = question !== null;
    const hasResult = result !== null;

    const isEmptyQuestion = isEdit && !hasQuestion;
    const isEmptyResult = isEdit && !hasResult;

    const [userAnswerIndex, setUserAnswerIndex] = useState(null);
    const answered = userAnswerIndex !== null;
    const hasUserAnsweredRight = answered ? userAnswerIndex === answerIndex : null;

    const isSplitted = layout === 'split';
    const distribution = isSplitted ? 'between' : null;
    const verticalAlign = isSplitted ? null : layout;

    const onOptionClick = useCallback(
        (optionIndex) => {
            if (userAnswerIndex === null) {
                setUserAnswerIndex(optionIndex);
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
            isEmpty={isEmptyQuestion}
        >
            {hasQuestion ? (
                <Transitions transitions={transitions}>
                    <Heading {...question} className={styles.question} />
                </Transitions>
            ) : null}
        </ScreenElement>,
    ];

    // Options + Result

    items.push(
        <div key="answer" className={styles.answer}>
            {options !== null ? (
                <div className={styles.options}>
                    {options.map((option, optionI) => {
                        const hasOption = option !== null;
                        const isEmptyOption = isEdit && !hasOption;
                        const rightAnswer = optionI === answerIndex;

                        return (
                            <div key={`option-${optionI}`} className={classNames([
                                styles.option,
                                {
                                    [styles.answer]: rightAnswer,
                                    [styles[hasUserAnsweredRight ? 'right' : 'wrong']]: rightAnswer,
                                }
                            ])}>
                                <ScreenElement
                                    placeholder="button"
                                    emptyLabel={
                                        <FormattedMessage
                                            defaultMessage="Option"
                                            description="Option placeholder"
                                        />
                                    }
                                    emptyClassName={styles.empty}
                                    isEmpty={isEmptyOption}
                                >
                                    {hasOption ? (
                                        <Transitions
                                            transitions={transitions}
                                            delay={(optionI + 1) * transitionStagger}
                                        >
                                            <Button
                                                className={styles.button}
                                                onClick={() => onOptionClick(optionI)}
                                            >
                                                { answered ? 
                                                    <div className={styles.resultIcon}>
                                                        { hasUserAnsweredRight ? '✓' : 'x' }
                                                    </div>
                                                : null }
                                                <Text {...option.label} className={styles.optionLabel} />
                                            </Button>
                                        </Transitions>
                                    ) : null}
                                </ScreenElement>
                            </div>
                        );
                    })}
                </div>
            ) : null}
            <ScreenElement
                key="result"
                placeholder="text"
                emptyLabel={
                    <FormattedMessage defaultMessage="Result" description="Result placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmptyResult}
            >
                {hasResult ? (
                    <Transitions
                        transitions={transitions}
                        delay={(1 + (options !== null ? options.length : 0)) * transitionStagger}
                    >
                        <Text {...result} className={styles.result} />
                    </Transitions>
                ) : null}
            </ScreenElement>
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
                    distribution={distribution}
                    style={isView || isPreview ? { padding } : null}
                >
                    {items}
                </Layout>
            </Container>
        </div>
    );
};

Quiz.propTypes = propTypes;
Quiz.defaultProps = defaultProps;

export default Quiz;
