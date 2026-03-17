/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { BoxStyle, ButtonLayout, Color, QuizAnswer, TextStyle } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { getStyleFromColor, isImageFilled, isTextFilled } from '@micromag/core/utils';
import { RichButton } from '@micromag/element-button';
import Keypad from '@micromag/element-keypad';

import styles from './answers.module.css';

interface AnswersProps {
    items: QuizAnswer[];
    keypadLayout?: Record<string, unknown>;
    answeredIndex?: number;
    answersCollapseDelay?: number;
    buttonsStyle?: BoxStyle;
    buttonsLayout?: ButtonLayout;
    inactiveButtonsStyle?: BoxStyle;
    buttonsTextStyle?: TextStyle;
    inactiveButtonsTextStyle?: TextStyle;
    goodAnswerColor?: Color;
    badAnswerColor?: Color;
    showUserAnswer?: boolean;
    withoutGoodAnswer?: boolean;
    withoutIcon?: boolean;
    focusable?: boolean;
    animated?: boolean;
    collapsed?: boolean;
    onClick?: (...args: unknown[]) => void;
    onCollapse?: (...args: unknown[]) => void;
    onCollapsed?: (...args: unknown[]) => void;
    onTransitionEnd?: (...args: unknown[]) => void;
    withoutCollapse?: boolean;
    className?: string;
}

function Answers({
    items,
    keypadLayout = null,
    answeredIndex = null,
    answersCollapseDelay = 1000,
    buttonsStyle = null,
    buttonsLayout = null,
    inactiveButtonsStyle = null,
    buttonsTextStyle = null,
    inactiveButtonsTextStyle = null,
    goodAnswerColor = null,
    badAnswerColor = null,
    showUserAnswer = false,
    withoutGoodAnswer = false,
    withoutIcon = false,
    focusable = false,
    animated: collapseAnimated = false,
    collapsed: initialCollapsed = false,
    onClick = null,
    onCollapse = null,
    onCollapsed = null,
    onTransitionEnd = null,
    withoutCollapse = false,
    className = null,
}: AnswersProps) {
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

    const shouldCollapse =
        !withoutGoodAnswer || (finalShowUserAnswer && answeredIndex !== null && !withoutCollapse);
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
                    // console.log('ok should collapse whatever');
                    setAnswersCollapsed(true);
                    if (onCollapse !== null) {
                        onCollapse();
                    }
                },
                hasAnsweredRight || finalShowUserAnswer ? 500 : answersCollapseDelay,
            );
        } else if (answeredIndex !== null && !shouldCollapse) {
            timeout = setTimeout(() => {
                // console.log('ok no collapse');
                if (onCollapse !== null) {
                    onCollapse();
                }
                if (onCollapsed !== null) {
                    onCollapsed();
                }
                if (onTransitionEnd !== null) {
                    onTransitionEnd();
                }
            }, answersCollapseDelay);
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
        onCollapsed,
        onTransitionEnd,
        answersCollapseDelay,
        hasAnsweredRight,
        finalShowUserAnswer,
        shouldCollapse,
    ]);

    useEffect(() => {
        let timeout = null;
        let endTimeout = null;
        if (answersCollapsed) {
            timeout = setTimeout(() => {
                setAnswersFinalCollapse(true);
            }, 300);
            endTimeout = setTimeout(() => {
                // Failsafe cause collapse transition is not always active
                if (onTransitionEnd !== null) {
                    onTransitionEnd();
                }
            }, 500);
        }
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            if (endTimeout !== null) {
                clearTimeout(endTimeout);
            }
        };
    }, [answersCollapsed, onTransitionEnd, setAnswersFinalCollapse]);

    // const [transitioned, setTransitioned] = useState(false);
    // const onAnswerTransitionEnd = useCallback(() => {
    //     setTransitioned(true);
    //     if (shouldCollapse && answersCollapsed && !answersDidCollapse) {
    //         setAnswersDidCollapse(true);
    //         if (onCollapsed !== null) {
    //             onCollapsed();
    //         }
    //     }
    // }, [
    //     shouldCollapse,
    //     answersCollapsed,
    //     answersDidCollapse,
    //     setAnswersCollapsed,
    //     onCollapsed,
    //     onTransitionEnd,
    // ]);

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
        const { label = null } = answer || {};
        const key = `key-${answerI}-${label?.body || null}`;
        return { ...answer, hidden, userAnswer, index: answerI, maxHeight: height, key };
    });

    // const transitions = useTransition(filteredListOfItems, {
    //     key: ({ key }) => key,
    //     update: ({ hidden = false, maxHeight = 0 }) => ({
    //         opacity: hidden && showAnimation && !withoutGoodAnswer ? 0 : 1,
    //         // Animate this, not height
    //         maxHeight:
    //             // eslint-disable-next-line no-nested-ternary
    //             hidden &&
    //             showAnimation &&
    //             !withoutGoodAnswer &&
    //             collapseAnimated &&
    //             answersFinalCollapse
    //                 ? 0
    //                 : maxHeight > 0
    //                   ? maxHeight
    //                   : null,
    //         height:
    //             hidden &&
    //             showAnimation &&
    //             !withoutGoodAnswer &&
    //             !collapseAnimated &&
    //             answersFinalCollapse
    //                 ? 0
    //                 : 'auto',
    //     }),
    //     // config: { tension: 300, friction: 35 },
    //     config: { duration: 300, easing: easings.easeOutSine },
    // });

    // useEffect(() => {
    //     if (transitioned && onTransitionEnd !== null) {
    //         onTransitionEnd();
    //     }
    // }, [transitioned, onTransitionEnd]);

    const hasGoodOrBadAnswerInList = useMemo(() => {
        if (filteredListOfItems !== null) {
            return filteredListOfItems.reduce(
                (hasGoodOrBad, answer) =>
                    hasGoodOrBad ||
                    (answer.good === true && !withoutGoodAnswer) ||
                    (answer.good === false && !withoutIcon),
                false,
            );
        }
        return false;
    }, [filteredListOfItems, withoutGoodAnswer, withoutIcon]);

    const hasOpacity = useMemo(() => {
        const { backgroundColor = null } = inactiveButtonsStyle || {};
        return backgroundColor === null;
    }, [inactiveButtonsStyle]);

    const itemsWithStyle = filteredListOfItems.map((answer) => {
        const { hidden, maxHeight } = answer || {};
        const style = {
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
        };
        return { ...answer, style };
    });

    // const keypadItems = transitions((style, answer, t, answerI) => {
    const keypadItems = (itemsWithStyle || []).map((answer, answerI) => {
        const userAnswer = answerI === answeredIndex;

        const {
            good: rightAnswer = null,
            label = null,
            visual = null,
            buttonLayout = null,
            buttonStyle: answerButtonStyle = null,
            textStyle: answerButtonTextStyle = null,
            style = null,
        } = answer || {};

        const { textStyle = null } = label || {};
        const hasText = isTextFilled(label);
        const hasVisual = isImageFilled(visual);
        const hasAnswer = hasText || hasVisual;

        const isUserAnswer = withoutGoodAnswer && userAnswer;
        const isOtherAnswer = withoutGoodAnswer && !userAnswer;

        const isInactive = isOtherAnswer && answeredIndex !== null;
        const inactiveButtonStyle = isInactive ? inactiveButtonsStyle : null;
        const inactiveButtonTextStyle = isInactive ? inactiveButtonsTextStyle : null;

        const finalButtonStyle = {
            ...buttonsStyle,
            ...inactiveButtonStyle,
            ...answerButtonStyle,
        };

        const finalTextStyle = {
            ...Object.keys(buttonsTextStyle || {}).reduce((acc, key) => {
                const value = buttonsTextStyle[key];
                if (value !== null && value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {}),
            ...Object.keys(textStyle || {}).reduce((acc, key) => {
                const value = textStyle[key];
                if (value !== null && value !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {}),
            ...inactiveButtonTextStyle,
            ...answerButtonTextStyle,
        };

        return (
            <div
                key={`answer-${answerI}`}
                className={classNames([
                    styles.item,
                    {
                        [styles.rightAnswer]: !withoutGoodAnswer && rightAnswer === true,
                        [styles.userAnswer]: isUserAnswer,
                        [styles.otherAnswer]: isOtherAnswer,
                        [styles.withoutOpacity]: !hasOpacity,
                    },
                ])}
                // onTransitionEnd={onAnswerTransitionEnd}
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
                            <RichButton
                                className={styles.button}
                                onPointerUp={(e) => {
                                    if (e.pointerType !== 'mouse' || e.button === 0) {
                                        onClick(answer, answerI);
                                    }
                                }}
                                disabled={!visible || isPreview || answered}
                                focusable={focusable}
                                buttonStyle={finalButtonStyle}
                                textStyle={finalTextStyle}
                                label={label}
                                visual={visual}
                                visualClassName={styles.optionVisual}
                                imageClassName={styles.optionImage}
                                layout={
                                    buttonLayout ||
                                    buttonsLayout ||
                                    (hasVisual ? 'label-right' : null)
                                }
                            >
                                {answered && !withoutIcon && rightAnswer === true ? (
                                    <span
                                        className={styles.resultIcon}
                                        style={getStyleFromColor(
                                            goodAnswerColor,
                                            'backgroundColor',
                                        )}
                                    >
                                        <FontAwesomeIcon className={styles.faIcon} icon={faCheck} />
                                    </span>
                                ) : null}
                                {!withoutIcon && answered && rightAnswer === false ? (
                                    <span
                                        className={styles.resultIcon}
                                        style={getStyleFromColor(badAnswerColor, 'backgroundColor')}
                                    >
                                        <FontAwesomeIcon className={styles.faIcon} icon={faTimes} />
                                    </span>
                                ) : null}
                            </RichButton>
                        ) : null}
                    </ScreenElement>
                </div>
            </div>
        );
    });

    const {
        columnAlign: align = null,
        columns = 1,
        spacing = null,
        withSquareItems = false,
    } = keypadLayout || {};

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.answered]: answered,
                    [styles.withIcon]: !withoutIcon && hasGoodOrBadAnswerInList,
                    [styles.withSquareItems]: withSquareItems === true,
                    [styles.isPlaceholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
        >
            {filteredListOfItems !== null || isPlaceholder ? (
                <Keypad
                    className={styles.items}
                    items={keypadItems}
                    align={align}
                    columns={columns}
                    spacing={spacing}
                />
            ) : null}
        </div>
    );
}

export default Answers;
