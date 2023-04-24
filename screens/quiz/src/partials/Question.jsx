/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { isTextFilled } from '@micromag/core/utils';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import Answers from './Answers';

import styles from './question.module.scss';

const propTypes = {
    question: MicromagPropTypes.textElement,
    answers: MicromagPropTypes.quizAnswers,
    result: PropTypes.shape({
        image: MicromagPropTypes.imageElement,
        text: MicromagPropTypes.textElement,
    }),
    index: PropTypes.number,
    totalCount: PropTypes.number,
    answeredIndex: PropTypes.number,
    buttonsStyle: MicromagPropTypes.boxStyle,
    buttonsTextStyle: MicromagPropTypes.textStyle,
    questionsHeadingStyle: MicromagPropTypes.textStyle,
    goodAnswerColor: MicromagPropTypes.color,
    badAnswerColor: MicromagPropTypes.color,
    focusable: PropTypes.bool,
    animated: PropTypes.bool,
    layout: PropTypes.string,
    showInstantAnswer: PropTypes.bool,
    withResult: PropTypes.bool,
    withoutGoodAnswer: PropTypes.bool,
    withoutTrueFalse: PropTypes.bool,
    withoutIndex: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionPlaying: PropTypes.bool,
    transitionStagger: PropTypes.number,
    transitionDisabled: PropTypes.bool,
    onAnswerClick: PropTypes.func,
    onAnswerTransitionEnd: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

const defaultProps = {
    question: null,
    answers: null,
    result: null,
    index: null,
    totalCount: null,
    answeredIndex: null,
    buttonsStyle: null,
    buttonsTextStyle: null,
    questionsHeadingStyle: null,
    goodAnswerColor: null,
    badAnswerColor: null,
    focusable: false,
    animated: false,
    layout: null,
    showInstantAnswer: false,
    withResult: false,
    withoutGoodAnswer: false,
    withoutTrueFalse: false,
    withoutIndex: false,
    transitions: null,
    transitionPlaying: false,
    transitionStagger: 100,
    transitionDisabled: false,
    onAnswerClick: null,
    onAnswerTransitionEnd: null,
    className: null,
    style: null,
};

const Question = ({
    question,
    answers,
    result,
    index,
    totalCount,
    answeredIndex,
    buttonsStyle,
    buttonsTextStyle,
    questionsHeadingStyle,
    goodAnswerColor,
    badAnswerColor,
    focusable,
    animated,
    showInstantAnswer,
    withResult,
    withoutGoodAnswer,
    withoutTrueFalse,
    withoutIndex,
    layout,
    transitions,
    transitionPlaying,
    transitionStagger,
    transitionDisabled,
    onAnswerClick,
    onAnswerTransitionEnd,
    className,
    style,
}) => {
    const { isPlaceholder } = useScreenRenderContext();

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const hasQuestion = isTextFilled(question);
    const { textStyle: questionTextStyle = null } = question || {};

    const [resultVisible, setResultVisible] = useState(showInstantAnswer);

    const answered = answeredIndex !== null;
    const answer = answeredIndex !== null && answers[answeredIndex] ? answers[answeredIndex] : null;
    const { customAnswerLabel = null } = answer || {};

    const hasResult = isTextFilled(customAnswerLabel) || isTextFilled(result);

    const defaultResult = isTextFilled(result) ? result : null;
    const customResult = isTextFilled(customAnswerLabel) ? customAnswerLabel : null;

    const onAnswersCollapse = useCallback(() => {
        setResultVisible(true);
    }, [setResultVisible]);

    const hasIndex = index !== null && totalCount !== null;

    return (
        <Layout
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.resultVisible]: resultVisible,
                    [className]: className !== null,
                },
            ])}
            verticalAlign={verticalAlign}
            style={style}
        >
            {[
                !withoutIndex && hasIndex ? (
                    <ScreenElement
                        key="stats"
                        placeholder={<div className={styles.index}>1 / 10</div>}
                    >
                        {totalCount > 1 ? (
                            <Transitions
                                transitions={transitions}
                                playing={transitionPlaying}
                                disabled={transitionDisabled}
                            >
                                <div className={styles.index}>
                                    {index + 1} / {totalCount}
                                </div>
                            </Transitions>
                        ) : null}
                    </ScreenElement>
                ) : null,
                <ScreenElement
                    key="question"
                    placeholder="title"
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Question"
                            description="Placeholder label"
                        />
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
                            <Heading
                                {...question}
                                className={styles.question}
                                textStyle={{ ...questionsHeadingStyle, ...questionTextStyle }}
                            />
                        </Transitions>
                    ) : null}
                </ScreenElement>,
                isSplitted ? <Spacer key="spacer" /> : null,
                <Answers
                    key="answers"
                    items={answers || []}
                    answeredIndex={answeredIndex}
                    goodAnswerColor={goodAnswerColor}
                    badAnswerColor={badAnswerColor}
                    withoutGoodAnswer={withoutGoodAnswer}
                    withoutIcon={withoutTrueFalse}
                    showUserAnswer={withoutTrueFalse}
                    buttonsStyle={buttonsStyle}
                    buttonsTextStyle={buttonsTextStyle}
                    focusable={focusable}
                    animated={animated}
                    transitions={transitions}
                    transitionStagger={transitionStagger}
                    transitionPlaying={transitionPlaying}
                    transitionDisabled={transitionDisabled}
                    onClick={onAnswerClick}
                    onCollapse={onAnswersCollapse}
                    onTransitionEnd={onAnswerTransitionEnd}
                />,
                withResult ? (
                    <div className={styles.result} key="results">
                        <div className={styles.resultContent}>
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
                                        <Text
                                            {...(customResult || defaultResult)}
                                            className={styles.resultText}
                                        />
                                    </Transitions>
                                ) : null}
                            </ScreenElement>
                        </div>
                    </div>
                ) : null,
            ]}
        </Layout>
    );
};

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;

export default Question;
