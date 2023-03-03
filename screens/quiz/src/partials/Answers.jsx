/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTransition, animated, config } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { getStyleFromColor, isTextFilled } from '@micromag/core/utils';
import Button from '@micromag/element-button';
import Text from '@micromag/element-text';

import styles from './answers.module.scss';

const propTypes = {
    items: MicromagPropTypes.quizAnswers.isRequired,
    answeredIndex: PropTypes.number,
    answersCollapseDelay: PropTypes.number,
    buttonsStyle: MicromagPropTypes.boxStyle,
    buttonsTextStyle: MicromagPropTypes.textStyle,
    goodAnswerColor: MicromagPropTypes.color,
    badAnswerColor: MicromagPropTypes.color,
    showUserAnswer: PropTypes.bool,
    withoutGoodAnswer: PropTypes.bool,
    withoutIcon: PropTypes.bool,
    focusable: PropTypes.bool,
    collapsed: PropTypes.bool,
    onClick: PropTypes.func,
    onCollapse: PropTypes.func,
    onCollapsed: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    answeredIndex: null,
    answersCollapseDelay: 2000,
    buttonsStyle: null,
    buttonsTextStyle: null,
    goodAnswerColor: null,
    badAnswerColor: null,
    showUserAnswer: false,
    withoutGoodAnswer: false,
    withoutIcon: false,
    focusable: false,
    collapsed: false,
    onClick: null,
    onCollapse: null,
    onCollapsed: null,
    onTransitionEnd: null,
    className: null,
};

const Answers = ({
    items,
    answeredIndex,
    answersCollapseDelay,
    buttonsStyle,
    buttonsTextStyle,
    goodAnswerColor,
    badAnswerColor,
    showUserAnswer,
    withoutGoodAnswer,
    withoutIcon,
    focusable,
    collapsed: initialCollapsed,
    onClick,
    onCollapse,
    onCollapsed,
    onTransitionEnd,
    className,
}) => {
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();
    const answered = answeredIndex !== null;
    const { good: hasAnsweredRight = false } = answeredIndex !== null ? items[answeredIndex] : {};
    const [visible] = useState(true);

    const hasRightAnswer =
        items !== null && !isPlaceholder
            ? items.reduce((hasGood, answer) => {
                  const { good = false } = answer || {};
                  return hasGood || good;
              }, false)
            : false;
    const finalShowUserAnswer = showUserAnswer || !hasRightAnswer;

    const shouldCollapse = !withoutGoodAnswer || (finalShowUserAnswer && answeredIndex !== null);
    const [answersCollapsed, setAnswersCollapsed] = useState(answeredIndex !== null);
    const [answersDidCollapse, setAnswersDidCollapse] = useState(
        initialCollapsed || answeredIndex !== null,
    );

    useEffect(() => {
        let timeout = null;
        if (answeredIndex !== null && shouldCollapse) {
            timeout = setTimeout(
                () => {
                    setAnswersCollapsed(true);
                    if (onCollapse !== null) {
                        onCollapse();
                    }
                },
                hasAnsweredRight || finalShowUserAnswer ? 500 : answersCollapseDelay,
            );
        }
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [
        answeredIndex,
        withoutGoodAnswer,
        setAnswersCollapsed,
        onCollapse,
        answersCollapseDelay,
        hasAnsweredRight,
        finalShowUserAnswer,
    ]);

    const onAnswerTransitionEnd = useCallback(() => {
        if (onTransitionEnd !== null) {
            onTransitionEnd();
        }
        if (shouldCollapse && answersCollapsed && !answersDidCollapse) {
            setAnswersDidCollapse(true);
            if (onCollapsed !== null) {
                onCollapsed();
            }
        }
    }, [
        shouldCollapse,
        answersCollapsed,
        answersDidCollapse,
        setAnswersCollapsed,
        onCollapsed,
        onTransitionEnd,
    ]);

    const itemsRefs = useRef([]);
    const listOfItems = isPlaceholder || (isEdit && items.length === 0) ? [...new Array(2)] : items;

    // let total = 0;
    // const heights = listOfItems.reduce((acc, it, i) => {
    //     acc.push(total);
    //     if (itemsRefs.current[i]) {
    //         const { height } = itemsRefs.current[i].getBoundingClientRect() || {};
    //         total += height;
    //     }
    //     return acc;
    // }, []);

    const filteredListOfItems = listOfItems.map((answer, answerI) => {
        // const y = heights[answerI] ? heights[answerI] : 0;
        const userAnswer = answerI === answeredIndex;
        const { good: rightAnswer = false } = answer || {};
        let hidden = false;
        if (isView && answersDidCollapse && !rightAnswer && (hasRightAnswer || !userAnswer)) {
            hidden = true;
        }
        if (isView && answersCollapsed && !rightAnswer) {
            hidden = true;
        }
        return { ...answer, hidden, userAnswer, index: answerI };
    });

    // let finalList = filteredListOfItems;
    // if (answersCollapsed) {
    //     finalList = [...filteredListOfItems].sort(({ hidden = false }) => (hidden ? 1 : -1));
    //     console.log('da fuck', finalList);
    // }

    const transitions = useTransition(
        filteredListOfItems.map((data) => ({
            ...data,
            hidden: data.hidden,
        })),
        {
            key: ({ index = 0, label = null }) => `key-${index}-${label?.body || null}`,
            update: ({ hidden = false }) => ({
                opacity: hidden && isView && !withoutGoodAnswer ? 0 : 1,
                height: hidden && isView && !withoutGoodAnswer ? 0 : null,
            }),
            config: config.gentle,
            // onRest: () => {
            //     console.log('rest');
            // },
        },
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.answered]: answered,
                    [styles.withoutGoodAnswer]: withoutGoodAnswer || !hasRightAnswer,
                    [styles.withGoodAnswer]: !withoutGoodAnswer && hasRightAnswer,
                    [styles.withIcon]: !withoutGoodAnswer && hasRightAnswer && !withoutIcon,
                    [styles.willCollapse]: shouldCollapse && answersCollapsed,
                    [styles.didCollapsed]: shouldCollapse && answersDidCollapse,
                    [styles.isPlaceholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
        >
            {filteredListOfItems !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {transitions((style, answer, t, answerI) => {
                        const userAnswer = answerI === answeredIndex;
                        const {
                            good: rightAnswer = false,
                            label = null,
                            buttonStyle: answerButtonStyle = null,
                            textStyle: answerButtonTextStyle = null,
                        } = answer || {};
                        const { textStyle = null } = label || {};
                        const hasAnswer = isTextFilled(label);
                        return (
                            <animated.div
                                key={`answer-${answerI}`}
                                className={classNames([
                                    styles.item,
                                    {
                                        [styles.rightAnswer]: !withoutGoodAnswer && rightAnswer,
                                        [styles.userAnswer]: withoutGoodAnswer && userAnswer,
                                        [styles.otherAnswer]: withoutGoodAnswer && !userAnswer,
                                    },
                                ])}
                                style={{ ...style }}
                                ref={(el) => {
                                    itemsRefs.current[answerI] = el;
                                }}
                            >
                                <div className={styles.itemContent}>
                                    <ScreenElement
                                        placeholder="quizAnswer"
                                        placeholderProps={{ good: answerI === 0 }}
                                        emptyLabel={
                                            <FormattedMessage
                                                defaultMessage="Answer"
                                                description="Answer placeholder"
                                            />
                                        }
                                        emptyClassName={styles.emptyAnswer}
                                        isEmpty={!hasAnswer}
                                    >
                                        {hasAnswer ? (
                                            <Button
                                                className={styles.button}
                                                onPointerUp={(e) => {
                                                    if (
                                                        e.pointerType !== 'mouse' ||
                                                        e.button === 0
                                                    ) {
                                                        onClick(answer, answerI);
                                                        onAnswerTransitionEnd();
                                                    }
                                                }}
                                                disabled={!visible || isPreview || answered}
                                                focusable={focusable}
                                                buttonStyle={{
                                                    ...buttonsStyle,
                                                    ...answerButtonStyle,
                                                }}
                                                textStyle={{
                                                    ...buttonsTextStyle,
                                                    ...answerButtonTextStyle,
                                                }}
                                            >
                                                {!withoutGoodAnswer &&
                                                !withoutIcon &&
                                                rightAnswer ? (
                                                    <span
                                                        className={styles.resultIcon}
                                                        style={getStyleFromColor(
                                                            goodAnswerColor,
                                                            'backgroundColor',
                                                        )}
                                                    >
                                                        <FontAwesomeIcon
                                                            className={styles.faIcon}
                                                            icon={faCheck}
                                                        />
                                                    </span>
                                                ) : null}
                                                {!withoutGoodAnswer &&
                                                !withoutIcon &&
                                                answered &&
                                                !hasAnsweredRight &&
                                                userAnswer ? (
                                                    <span
                                                        className={styles.resultIcon}
                                                        style={getStyleFromColor(
                                                            badAnswerColor,
                                                            'backgroundColor',
                                                        )}
                                                    >
                                                        <FontAwesomeIcon
                                                            className={styles.faIcon}
                                                            icon={faTimes}
                                                        />
                                                    </span>
                                                ) : null}
                                                <Text
                                                    {...label}
                                                    className={styles.optionLabel}
                                                    textStyle={{
                                                        ...textStyle,
                                                        ...buttonsTextStyle,
                                                        ...answerButtonTextStyle,
                                                    }}
                                                />
                                            </Button>
                                        ) : null}
                                    </ScreenElement>
                                </div>
                            </animated.div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

Answers.propTypes = propTypes;
Answers.defaultProps = defaultProps;

export default Answers;
