/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextElement from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import VideoElement from '@micromag/element-video';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import Button from '@micromag/element-button';
import { Label, Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import messages from './messages';

import styles from './styles.module.scss';

const propTypes = {
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
    box: MicromagPropTypes.boxElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    multipleAnswers: false,
    question: null,
    answers: null,
    success: null,
    failure: null,
    textStyle: null,
    button: null,
    background: null,
    box: {
        axisAlign: 'top',
    },
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const SurveyMultipleChoice = ({
    multipleAnswers,
    question: questionField,
    answers: answerFields,
    success: successField,
    failure: failureField,
    textStyle,
    button,
    background,
    box,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const [answer, setAnswer] = useState(null);
    const [answered, setAnswered] = useState([]);

    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isView, isEditor } = getRenderFormat(renderFormat);
    const spacing = 10;
    const videoProps = {
        fit: {
            size: 'contain',
        },
        maxWidth: Math.min(width, 768) - spacing * 2,
        maxHeight: Math.min(height, 400) - spacing * 2,
    };

    const onClickAnswer = useCallback(
        answerItem => {
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
                    a =>
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
                    [styles.isPlaceholder]: renderFormat === 'placeholder',
                    [styles.isPreview]: renderFormat === 'preview',
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
                className={styles.background}
            >
                <Frame width={width} height={height} visible={visible} withScroll>
                    <Box {...box} withSmallSpacing={isSimple} className={styles.inner}>
                        <div className={styles.innerContainer}>
                            {answer !== null ? (
                                answerBlock
                            ) : (
                                <>
                                    <div className={styles.questionContainer}>
                                        {renderFormat !== 'placeholder' ? (
                                            questionBlock
                                        ) : (
                                            <Placeholders.Text className={styles.placeholder} />
                                        )}
                                    </div>
                                    <div className={styles.buttons}>
                                        {renderFormat !== 'placeholder' ? (
                                            <>
                                                {answerFields !== null
                                                    ? answerFields.map((item, i) => {
                                                          const currentAnswer =
                                                              answered.find(
                                                                  a =>
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
                                                                              currentAnswer !==
                                                                                  null,
                                                                      },
                                                                  ])}
                                                                  onClick={() =>
                                                                      onClickAnswer(item)
                                                                  }
                                                              >
                                                                  <div
                                                                      className={
                                                                          styles.answerContainer
                                                                      }
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
                                                <Placeholders.Button
                                                    className={styles.buttonPlaceholder}
                                                />
                                                <Placeholders.Button
                                                    className={styles.buttonPlaceholder}
                                                />
                                                <Placeholders.Button
                                                    className={styles.buttonPlaceholder}
                                                />
                                                <Placeholders.Button
                                                    className={styles.buttonPlaceholder}
                                                />
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                            {renderFormat !== 'placeholder' &&
                            multipleAnswers &&
                            answer === null ? (
                                <Button
                                    className={styles.submitButton}
                                    onClick={onClickSubmit}
                                    {...button}
                                >
                                    <Label>{messages.submit}</Label>
                                </Button>
                            ) : (
                                <Placeholders.Button className={styles.submitButtonPlaceholder} />
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
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

SurveyMultipleChoice.propTypes = propTypes;
SurveyMultipleChoice.defaultProps = defaultProps;

export default SurveyMultipleChoice;
