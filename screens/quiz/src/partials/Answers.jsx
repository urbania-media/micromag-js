/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTransition, animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
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
    animated: PropTypes.bool,
    collapsed: PropTypes.bool,
    onClick: PropTypes.func,
    onCollapse: PropTypes.func,
    onCollapsed: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    answeredIndex: null,
    answersCollapseDelay: 1000,
    buttonsStyle: null,
    buttonsTextStyle: null,
    goodAnswerColor: null,
    badAnswerColor: null,
    showUserAnswer: false,
    withoutGoodAnswer: false,
    withoutIcon: false,
    focusable: false,
    animated: false,
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
    animated: collapseAnimated,
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
    const [answersFinalCollapse, setAnswersFinalCollapse] = useState(
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
        } else if (answeredIndex === null && shouldCollapse) {
            setAnswersCollapsed(false);
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

    useEffect(() => {
        let timeout = null;
        if (answersCollapsed) {
            timeout = setTimeout(() => {
                setAnswersFinalCollapse(true);
            }, 300);
        }
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [answersCollapsed]);

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

    const heights = useMemo(() => {
        if (animated) {
            const allHeights = listOfItems.reduce((acc, it, i) => {
                if (itemsRefs.current[i] && collapseAnimated) {
                    const { height = 0 } = itemsRefs.current[i].getBoundingClientRect() || {};
                    acc.push(height);
                }
                return acc;
            }, []);
            return allHeights;
        }
        return [];
    }, [animated, answeredIndex, shouldCollapse, collapseAnimated, listOfItems]);

    const showAnimation = isView || isEdit;
    const filteredListOfItems = listOfItems.map((answer, answerI) => {
        const height = heights[answerI] ? heights[answerI] : 0;
        const userAnswer = answerI === answeredIndex;
        const { good: rightAnswer = false } = answer || {};
        let hidden = false;
        if (
            answeredIndex !== null &&
            showAnimation &&
            answersDidCollapse &&
            !rightAnswer &&
            (hasRightAnswer || !userAnswer)
        ) {
            hidden = true;
        }
        if (answeredIndex !== null && showAnimation && answersCollapsed && !rightAnswer) {
            hidden = true;
        }
        return { ...answer, hidden, userAnswer, index: answerI, maxHeight: height };
    });

    const transitions = useTransition(filteredListOfItems, {
        key: ({ index = 0, label = null }) => `key-${index}-${label?.body || null}`,
        update: ({ hidden = false, maxHeight = 0 }) => ({
            opacity: hidden && showAnimation && !withoutGoodAnswer ? 0 : 1,
            // Animate this, not height
            maxHeight:
                // eslint-disable-next-line no-nested-ternary
                hidden &&
                showAnimation &&
                !withoutGoodAnswer &&
                collapseAnimated &&
                answersFinalCollapse
                    ? 0
                    : maxHeight > 0
                    ? maxHeight
                    : null,
            height:
                hidden &&
                showAnimation &&
                !withoutGoodAnswer &&
                !collapseAnimated &&
                answersFinalCollapse
                    ? 0
                    : 'auto',
        }),
        config: { tension: 300, friction: 35 },
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.answered]: answered,
                    [styles.withIcon]: !withoutIcon,
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
                            good: rightAnswer = null,
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
                                        [styles.rightAnswer]:
                                            !withoutGoodAnswer && rightAnswer === true,
                                        [styles.userAnswer]: withoutGoodAnswer && userAnswer,
                                        [styles.otherAnswer]: withoutGoodAnswer && !userAnswer,
                                    },
                                ])}
                                style={{ ...style }}
                            >
                                <div
                                    className={styles.itemContent}
                                    ref={(el) => {
                                        itemsRefs.current[answerI] = el;
                                    }}
                                >
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
                                                {answered &&
                                                !withoutIcon &&
                                                rightAnswer === true ? (
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
                                                {!withoutIcon &&
                                                answered &&
                                                rightAnswer === false ? (
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
