/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextElement from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import VideoElement from '@micromag/element-video';
import Button from '@micromag/element-button';

import {
    Label,
    PlaceholderText,
    PlaceholderButton,
    PropTypes as MicromagPropTypes,
} from '@micromag/core';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import messages from './messages';

import styles from './styles.module.scss';

export const layouts = ['normal'];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    multipleAnswers: PropTypes.bool,
    question: MicromagPropTypes.textElement,
    answers: PropTypes.arrayOf(MicromagPropTypes.textElement),
    success: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textElement,
    }),
    failure: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textElement,
    }),
    textStyle: MicromagPropTypes.textStyle,
    button: MicromagPropTypes.buttonElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    multipleAnswers: false,
    question: null,
    answers: null,
    success: null,
    failure: null,
    textStyle: null,
    button: null,
    background: null,
    current: true,
    active: false,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: null,
    className: null,
};

const SurveyMultipleChoice = ({
    layout,
    multipleAnswers,
    question: questionField,
    answers: answerFields,
    success: successField,
    failure: failureField,
    textStyle,
    button,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const [answer, setAnswer] = useState(null);
    const [answered, setAnswered] = useState([]);

    const { width, height } = useScreenSize();
    const { isPreview, isEditor, isPlaceholder, isView } = getRenderFormat(renderFormat);
    const isSimple = isPreview || isPlaceholder;

    const spacing = 10;
    const videoProps = {
        fit: {
            size: 'contain',
        },
        maxWidth: Math.min(width, 768) - spacing * 2,
        maxHeight: Math.min(height, 400) - spacing * 2,
    };

    const onClickAnswer = useCallback(
        (answerItem) => {
            if (multipleAnswers) {
                setAnswered([...answered, answerItem]);
            } else if (answerItem.isTrue === true) {
                setAnswer(true);
            } else {
                setAnswer(false);
            }
        },
        [answered, setAnswer, setAnswered, multipleAnswers],
    );

    const onClickSubmit = useCallback(() => {
        const success = answerFields.reduce((value, current) => {
            const answerItem =
                answered.find(
                    (a) =>
                        a.text === current.text &&
                        a.image === current.image &&
                        a.video === current.video,
                ) || null;
            if (!answerItem && current.isTrue !== true) {
                return value;
            }
            return (
                answerItem !== null &&
                answerItem.isTrue === true &&
                current.isTrue === true &&
                value === true
            );
        }, answered.length > 0);
        setAnswer(success);
    }, [answered, answerFields, setAnswered]);

    const onClickReset = useCallback(() => {
        setAnswered([]);
        setAnswer(null);
    }, [setAnswer, setAnswered]);

    const { text: questionText, image: questionImage, video: questionVideo } = questionField || {};
    const questionBlock =
        questionText !== null || questionImage !== null || questionVideo !== null ? (
            <div className={styles.questionContainer}>
                <VideoElement className={styles.video} video={questionVideo} {...videoProps} />
                <ImageElement className={styles.image} image={questionImage} />
                <TextElement body={questionText} textStyle={textStyle} />
            </div>
        ) : null;

    const answerProps = answer === true ? successField : failureField;
    const { text: answerText, image: answerImage, video: answerVideo } = answerProps || {};

    const answerBlock = (
        <div className={styles.questionContainer}>
            <VideoElement className={styles.video} video={answerVideo} {...videoProps} />
            <ImageElement className={styles.image} image={answerImage} />
            <TextElement body={answerText} textStyle={textStyle} />
        </div>
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    <div className={styles.inner}>
                        {answer !== null ? (
                            answerBlock
                        ) : (
                            <>
                                <div className={styles.questionContainer}>
                                    {renderFormat !== 'placeholder' ? (
                                        questionBlock
                                    ) : (
                                        <PlaceholderText className={styles.placeholder} />
                                    )}
                                </div>
                                <div className={styles.buttons}>
                                    {renderFormat !== 'placeholder' ? (
                                        <>
                                            {answerFields !== null
                                                ? answerFields.map((item, i) => {
                                                      const currentAnswer =
                                                          answered.find(
                                                              (a) =>
                                                                  a.text === item.text &&
                                                                  a.image === item.image &&
                                                                  a.video === item.video,
                                                          ) || null;
                                                      return (
                                                          <Button
                                                              key={`question-${i + 1}`}
                                                              className={classNames([
                                                                  styles.button,
                                                                  {
                                                                      [styles.selected]:
                                                                          multipleAnswers &&
                                                                          currentAnswer !== null,
                                                                  },
                                                              ])}
                                                              onClick={() => onClickAnswer(item)}
                                                          >
                                                              <div
                                                                  className={styles.answerContainer}
                                                              >
                                                                  <VideoElement
                                                                      className={styles.video}
                                                                      video={item.video || null}
                                                                      {...videoProps}
                                                                  />
                                                                  <ImageElement
                                                                      className={styles.image}
                                                                      image={item.image || null}
                                                                  />
                                                                  <TextElement
                                                                      body={item.text || null}
                                                                      textStyle={textStyle}
                                                                  />
                                                              </div>
                                                          </Button>
                                                      );
                                                  })
                                                : null}
                                        </>
                                    ) : (
                                        <>
                                            <PlaceholderButton
                                                className={styles.buttonPlaceholder}
                                            />
                                            <PlaceholderButton
                                                className={styles.buttonPlaceholder}
                                            />
                                            <PlaceholderButton
                                                className={styles.buttonPlaceholder}
                                            />
                                            <PlaceholderButton
                                                className={styles.buttonPlaceholder}
                                            />
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {renderFormat !== 'placeholder' && multipleAnswers && answer === null ? (
                            <Button
                                className={styles.submitButton}
                                onClick={onClickSubmit}
                                {...button}
                            >
                                <Label>{messages.submit}</Label>
                            </Button>
                        ) : (
                            <PlaceholderButton className={styles.submitButtonPlaceholder} />
                        )}
                        {renderFormat !== 'placeholder' && isEditor && answer !== null ? (
                            <Button
                                className={styles.submitButton}
                                onClick={onClickReset}
                                {...button}
                            >
                                <Label>{messages.retry}</Label>
                            </Button>
                        ) : null}
                    </div>
                </div>
            </Container>
        </div>
    );
};

SurveyMultipleChoice.propTypes = propTypes;
SurveyMultipleChoice.defaultProps = defaultProps;

export default SurveyMultipleChoice;
