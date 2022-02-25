/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { useResizeObserver } from '@micromag/core/hooks';
import { getStyleFromBox, getStyleFromColor, isTextFilled } from '@micromag/core/utils';
import Button from '@micromag/element-button';
import Text from '@micromag/element-text';
import styles from './answers.module.scss';

const propTypes = {
    items: MicromagPropTypes.quizAnswers.isRequired,
    answeredIndex: PropTypes.number,
    answersCollapseDelay: PropTypes.number,
    buttonsStyle: MicromagPropTypes.boxStyle,
    goodAnswerColor: MicromagPropTypes.color,
    badAnswerColor: MicromagPropTypes.color,
    withoutGoodAnswer: PropTypes.bool,
    focusable: PropTypes.bool,
    collapsed: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionPlaying: PropTypes.bool,
    transitionStagger: PropTypes.number,
    transitionDisabled: PropTypes.bool,
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
    goodAnswerColor: null,
    badAnswerColor: null,
    withoutGoodAnswer: false,
    focusable: false,
    collapsed: false,
    transitions: null,
    transitionPlaying: false,
    transitionStagger: 100,
    transitionDisabled: false,
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
    goodAnswerColor,
    badAnswerColor,
    withoutGoodAnswer,
    focusable,
    collapsed: initialCollapsed,
    transitions,
    transitionPlaying,
    transitionStagger,
    transitionDisabled,
    onClick,
    onCollapse,
    onCollapsed,
    onTransitionEnd,
    className,
}) => {
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const answered = answeredIndex !== null;
    const { good: hasAnsweredRight = false } = answeredIndex !== null ? items[answeredIndex] : {};

    // we get .answer's current and future height to animate its height
    // we also get the right answer's Y to animate its position

    const {
        ref: answerRef,
        entry: { contentRect: answerContentRect },
    } = useResizeObserver();
    const { height: answerHeight } = answerContentRect || {};

    const {
        ref: rightAnswerRef,
        entry: { contentRect: rightAnswerContentRect },
    } = useResizeObserver();
    const { height: rightAnswerHeight } = rightAnswerContentRect || {};
    const rightAnswerTop = useMemo(() => (rightAnswerRef.current !== null ? rightAnswerRef.current.offsetTop : 0), [rightAnswerHeight]);

    const shouldCollapse = !withoutGoodAnswer;
    const [answersCollapsed, setAnswersCollapsed] = useState(answeredIndex !== null);
    const [answersDidCollapsed, setAnswersDidCollapsed] = useState(initialCollapsed || answeredIndex !== null);

    useEffect(() => {
        let timeout = null;
        if (answeredIndex !== null && shouldCollapse) {
            timeout = setTimeout(() => {
                setAnswersCollapsed(true);
                if (onCollapse !== null) {
                    onCollapse();
                }
            }, hasAnsweredRight ? 500 : answersCollapseDelay);
        }

        return () => {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [answeredIndex, withoutGoodAnswer, setAnswersCollapsed, onCollapse, answersCollapseDelay, hasAnsweredRight]);

    const onAnswerTransitionEnd = useCallback(() => {
        console.log('END');
        if (onTransitionEnd !== null) {
            onTransitionEnd();
        }

        if (shouldCollapse && answersCollapsed && !answersDidCollapsed) {
            setAnswersDidCollapsed(true);
            if (onCollapsed !== null) {
                onCollapsed();
            }
        }
    }, [shouldCollapse, answersCollapsed, answersDidCollapsed, setAnswersCollapsed, onCollapsed, onTransitionEnd]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.answered]: answered,
                    [styles.hasGoodAnswer]: !withoutGoodAnswer,
                    [styles.willCollapse]: shouldCollapse && answersCollapsed,
                    [styles.didCollapsed]: shouldCollapse && answersDidCollapsed,
                    [styles.isPlaceholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
            ref={answerRef}
            style={
                answered && !answersDidCollapsed && (isView || isEdit) && shouldCollapse
                    ? {
                          height: answersCollapsed ? rightAnswerHeight : answerHeight,
                      }
                    : null
            }
        >
            {items !== null || isPlaceholder ? (
                <div className={styles.items}>
                    {(isPlaceholder ? [...new Array(2)] : items).map((answer, answerI) => {
                        const userAnswer = answerI === answeredIndex;
                        const {
                            good: rightAnswer = false,
                            label = null,
                            buttonStyle: answerButtonStyle = null,
                        } = answer || {};

                        const hasAnswer = isTextFilled(label);

                        if (answersDidCollapsed && !rightAnswer) {
                            return null;
                        }

                        return (
                            <div
                                key={`answer-${answerI}`}
                                ref={rightAnswer ? rightAnswerRef : null}
                                className={classNames([
                                    styles.item,
                                    {
                                        [styles.rightAnswer]: rightAnswer && !withoutGoodAnswer,
                                        [styles.userAnswer]: userAnswer,
                                    },
                                ])}
                                style={
                                    answersCollapsed && rightAnswer && !answersDidCollapsed && shouldCollapse
                                        ? {
                                              transform: `translateY(${-rightAnswerTop}px)`,
                                          }
                                        : null
                                }
                                onTransitionEnd={rightAnswer || (withoutGoodAnswer && userAnswer) ? onAnswerTransitionEnd : null}
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
                                            <Transitions
                                                transitions={transitions}
                                                playing={transitionPlaying}
                                                delay={(answerI + 1) * transitionStagger}
                                                disabled={transitionDisabled}
                                            >
                                                <Button
                                                    className={styles.button}
                                                    onClick={() => onClick(answer, answerI)}
                                                    disabled={isPreview || answered}
                                                    focusable={focusable}
                                                    buttonStyle={{
                                                        ...getStyleFromBox(buttonsStyle),
                                                        ...getStyleFromBox(answerButtonStyle),
                                                    }}
                                                >
                                                    {!withoutGoodAnswer && rightAnswer ? (
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
                                                    {!withoutGoodAnswer && answered && !hasAnsweredRight && userAnswer ? (
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
                                                    />
                                                </Button>
                                            </Transitions>
                                        ) : null}
                                    </ScreenElement>
                                </div>
                            </div>
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
