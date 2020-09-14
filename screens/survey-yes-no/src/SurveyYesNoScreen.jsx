/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextElement from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import VideoElement from '@micromag/element-video';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Button from '@micromag/element-button';
import Box from '@micromag/element-box';
import { Label, Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import messages from './messages';

import styles from './styles.module.scss';

const propTypes = {
    question: MicromagPropTypes.textMediaField,
    answerYes: MicromagPropTypes.textMediaField,
    answerNo: MicromagPropTypes.textMediaField,
    textStyle: MicromagPropTypes.textStyle,
    button: MicromagPropTypes.buttonElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    question: null,
    answerYes: null,
    answerNo: null,
    textStyle: null,
    button: null,
    background: null,
    box: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const SurveyYesNo = ({
    question: questionField,
    answerYes: answerYesField,
    answerNo: answerNoField,
    textStyle,
    box,
    background,
    button,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const [answered, setAnswered] = useState(null);
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEditor, isView, isSimple } = getRenderFormat(renderFormat);
    const spacing = 10;
    const videoProps = {
        fit: {
            size: 'contain',
        },
        maxWidth: Math.min(width, 768) - spacing * 2,
        maxHeight: Math.min(height, 400) - spacing * 2,
    };

    const { text: questionText, image: questionImage, video: questionVideo } = questionField || {};
    const { text: answerYesText, image: answerYesImage, video: answerYesVideo } =
        answerYesField || {};
    const { text: answerNoText, image: answerNoImage, video: answerNoVideo } = answerNoField || {};

    const onClickTrue = useCallback(() => {
        setAnswered(true);
    }, [setAnswered]);

    const onClickFalse = useCallback(() => {
        setAnswered(false);
    }, [setAnswered]);

    const onClickReset = useCallback(() => {
        setAnswered(null);
    }, [setAnswered]);

    const question =
        questionText !== null || questionImage !== null || questionVideo !== null ? (
            <div className={styles.questionContainer}>
                <VideoElement className={styles.video} video={questionVideo} {...videoProps} />
                <ImageElement className={styles.image} image={questionImage} />
                <TextElement body={questionText} textStyle={textStyle} />
            </div>
        ) : null;

    const answer =
        answered === true ? (
            <div className={styles.answerContainer}>
                <VideoElement className={styles.video} video={answerYesVideo} {...videoProps} />
                <ImageElement className={styles.image} image={answerYesImage} />
                <TextElement className={styles.result} body={answerYesText} textStyle={textStyle} />
                {isEditor ? (
                    <Button className={styles.button} onClick={onClickReset} {...button}>
                        Recommencer
                    </Button>
                ) : null}
            </div>
        ) : (
            <div className={styles.answerContainer}>
                <VideoElement className={styles.video} video={answerNoVideo} {...videoProps} />
                <ImageElement className={styles.image} image={answerNoImage} />
                <TextElement className={styles.result} body={answerNoText} textStyle={textStyle} />
                {isEditor ? (
                    <Button className={styles.button} onClick={onClickReset} {...button}>
                        <Label>{messages.retry}</Label>
                    </Button>
                ) : null}
            </div>
        );

    const buttons =
        renderFormat !== 'placeholder' ? (
            <>
                <Button className={styles.button} onClick={onClickTrue} {...button}>
                    <Label>{messages.yes}</Label>
                </Button>
                <Button className={styles.button} onClick={onClickFalse} {...button}>
                    <Label>{messages.no}</Label>
                </Button>
            </>
        ) : (
            <>
                <Placeholders.Button className={styles.buttonPlaceholder} />
                <Placeholders.Button className={styles.buttonPlaceholder} />
            </>
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
                playing={(isView && visible) || (isEditor && active)}
                className={styles.background}
            >
                <Frame width={width} height={height} visible={visible}>
                    <Box {...box} withSmallSpacing={isSimple} className={styles.inner}>
                        {answered !== null ? (
                            answer
                        ) : (
                            <>
                                {renderFormat !== 'placeholder' ? question : <Placeholders.Text />}
                                <div className={styles.buttons}>{buttons}</div>
                            </>
                        )}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

SurveyYesNo.propTypes = propTypes;
SurveyYesNo.defaultProps = defaultProps;

export default React.memo(SurveyYesNo);
