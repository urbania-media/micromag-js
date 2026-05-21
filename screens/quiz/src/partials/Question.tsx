/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    BoxStyle,
    ButtonLayout,
    Color,
    ImageElement,
    QuizAnswer,
    TextElement,
    TextStyle,
    Transitions as TransitionsConfig,
    VisualElement,
} from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { isImageFilled, isTextFilled } from '@micromag/core/utils';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import Answers from './Answers';

import styles from './question.module.css';

interface QuestionProps {
    question?: TextElement;
    answers?: QuizAnswer[];
    keypadLayout?: Record<string, unknown>;
    result?: { image?: ImageElement; text?: TextElement };
    resultImage?: VisualElement;
    index?: number;
    totalCount?: number;
    answeredIndex?: number;
    buttonsLayout?: ButtonLayout;
    buttonsStyle?: BoxStyle;
    inactiveButtonsStyle?: BoxStyle;
    buttonsTextStyle?: TextStyle;
    inactiveButtonsTextStyle?: TextStyle;
    questionsHeadingStyle?: TextStyle;
    feedbackTextStyle?: TextStyle;
    numbersTextStyle?: TextStyle;
    goodAnswerColor?: Color;
    badAnswerColor?: Color;
    focusable?: boolean;
    animated?: boolean;
    layout?: string;
    showInstantAnswer?: boolean;
    withResult?: boolean;
    withoutGoodAnswer?: boolean;
    withoutTrueFalse?: boolean;
    withoutIndex?: boolean;
    transitions?: TransitionsConfig;
    transitionPlaying?: boolean;
    transitionStagger?: number;
    transitionDisabled?: boolean;
    onAnswerClick?: (...args: unknown[]) => void;
    onAnswerTransitionEnd?: (...args: unknown[]) => void;
    withoutCollapse?: boolean;
    className?: string;
    style?: Record<string, string | number>;
}

function Question({
    question = null,
    answers = null,
    keypadLayout = null,
    result = null,
    resultImage = null,
    index = null,
    totalCount = null,
    answeredIndex = null,
    buttonsLayout = null,
    buttonsStyle = null,
    inactiveButtonsStyle = null,
    buttonsTextStyle = null,
    inactiveButtonsTextStyle = null,
    questionsHeadingStyle = null,
    feedbackTextStyle = null,
    numbersTextStyle = null,
    goodAnswerColor = null,
    badAnswerColor = null,
    focusable = false,
    animated = false,
    showInstantAnswer = false,
    withResult = false,
    withoutGoodAnswer = false,
    withoutTrueFalse = false,
    withoutIndex = false,
    layout = null,
    transitions = null,
    transitionPlaying = false,
    transitionStagger = 100,
    transitionDisabled = false,
    onAnswerClick = null,
    onAnswerTransitionEnd = null,
    withoutCollapse = false,
    className = null,
    style = null,
}: QuestionProps) {
    const { isPlaceholder } = useScreenRenderContext();

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const hasQuestion = isTextFilled(question);
    const { textStyle: questionTextStyle = null } = question || {};

    const [resultVisible, setResultVisible] = useState(showInstantAnswer);

    const answered = answeredIndex !== null;
    const answer = answeredIndex !== null && answers[answeredIndex] ? answers[answeredIndex] : null;
    const { result: answerResult = null, answerImage = null } = answer || {};

    const hasResult = isTextFilled(answerResult) || isTextFilled(result);
    const hasResultVisual = isImageFilled(answerImage) || isImageFilled(resultImage);

    const defaultResult = isTextFilled(result) ? result : null;
    const customResult = isTextFilled(answerResult) ? answerResult : null;
    const finalResult = customResult || defaultResult;
    const { textStyle: resultTextStyle = null } = finalResult || {};

    const onAnswersCollapse = useCallback(() => {
        setResultVisible(true);
    }, [setResultVisible]);

    const hasIndex = index !== null && totalCount !== null;

    return (
        <Layout
            className={classNames([
                styles.container,
                className,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.resultVisible]: resultVisible,
                    [styles.resultHidden]: !hasResult,
                },
            ])}
            verticalAlign={verticalAlign}
            style={style}
        >
            {[
                !withoutIndex && hasIndex ? (
                    <ScreenElement
                        key="stats"
                        placeholder={
                            <div className={classNames([styles.index, 'fs-3'])}>1 / 10</div>
                        }
                    >
                        {totalCount > 1 ? (
                            <Transitions
                                transitions={transitions}
                                playing={transitionPlaying}
                                disabled={transitionDisabled}
                            >
                                <Text
                                    className={styles.index}
                                    body={`${index + 1} / ${totalCount}`}
                                    textStyle={numbersTextStyle}
                                />
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
                    placeholderClassName="mb-4"
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
                    keypadLayout={keypadLayout}
                    answeredIndex={answeredIndex}
                    goodAnswerColor={goodAnswerColor}
                    badAnswerColor={badAnswerColor}
                    withoutGoodAnswer={withoutGoodAnswer}
                    withoutIcon={withoutTrueFalse}
                    showUserAnswer={withoutTrueFalse}
                    buttonsLayout={buttonsLayout}
                    buttonsStyle={buttonsStyle}
                    inactiveButtonsStyle={inactiveButtonsStyle}
                    buttonsTextStyle={buttonsTextStyle}
                    inactiveButtonsTextStyle={inactiveButtonsTextStyle}
                    focusable={focusable}
                    animated={animated}
                    transitions={transitions}
                    transitionStagger={transitionStagger}
                    transitionPlaying={transitionPlaying}
                    transitionDisabled={transitionDisabled}
                    onClick={onAnswerClick}
                    onCollapse={onAnswersCollapse}
                    onTransitionEnd={onAnswerTransitionEnd}
                    withoutCollapse={withoutCollapse}
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
                                {(hasResult || hasResultVisual) && answers !== null ? (
                                    <Transitions
                                        transitions={transitions}
                                        playing={transitionPlaying}
                                        delay={(1 + answers.length) * transitionStagger}
                                        disabled={transitionDisabled}
                                    >
                                        {hasResult ? (
                                            <Text
                                                {...(finalResult || {})}
                                                className={styles.resultText}
                                                textStyle={{
                                                    ...(feedbackTextStyle || null),
                                                    ...(resultTextStyle || null),
                                                }}
                                            />
                                        ) : null}
                                        {hasResultVisual ? (
                                            <Visual
                                                media={answerImage || resultImage}
                                                width="100%"
                                                height="auto"
                                            />
                                        ) : null}
                                    </Transitions>
                                ) : null}
                            </ScreenElement>
                        </div>
                    </div>
                ) : null,
            ]}
        </Layout>
    );
}

export default Question;
