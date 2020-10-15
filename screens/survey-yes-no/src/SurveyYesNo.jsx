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

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['center', 'top', 'bottom']),
    question: MicromagPropTypes.textMediaField,
    answerYes: MicromagPropTypes.textMediaField,
    answerNo: MicromagPropTypes.textMediaField,
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
    layout: 'center',
    question: null,
    answerYes: null,
    answerNo: null,
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

const SurveyYesNo = ({
    layout,
    question: questionField,
    answerYes: answerYesField,
    answerNo: answerNoField,
    textStyle,
    background,
    button,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    console.log(renderFormat, layout)
    const [answered, setAnswered] = useState(false);
    const { width, height } = useScreenSize();
    const { isEditor, isPreview, isView, isPlaceholder } = getRenderFormat(renderFormat);
    const isSimple = isPreview || isPlaceholder;
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
        answered ? (
            <div className={styles.answerContainer}>
                <VideoElement className={styles.video} video={answerYesVideo} {...videoProps} />
                <ImageElement className={styles.image} image={answerYesImage} />
                <TextElement className={styles.result} body={answerYesText} textStyle={textStyle} />
                {isEditor ? (
                    <Button className={styles.button} onClick={onClickReset} {...button}>
                        Retry
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
                        <Label>Retry</Label>
                    </Button>
                ) : null}
            </div>
        );

    const buttons =
        renderFormat !== 'placeholder' ? (
            <>
                <Button className={styles.button} onClick={onClickTrue} {...button}>
                    <Label>Yes</Label>
                </Button>
                <Button className={styles.button} onClick={onClickFalse} {...button}>
                    <Label>No</Label>
                </Button>
            </>
        ) : (
            <>
                <PlaceholderButton className={styles.buttonPlaceholder} />
                <PlaceholderButton className={styles.buttonPlaceholder} />
            </>
        );

    let contentJustifyContentValue;

    switch (layout) {
        default:
        case 'center':
            contentJustifyContentValue = 'center'; break;
        case 'top':
            contentJustifyContentValue = 'flex-start'; break;
        case 'bottom':
            contentJustifyContentValue = 'flex-end'; break;
        case 'around':
            contentJustifyContentValue = 'space-around'; break;
        case 'between':
            contentJustifyContentValue = 'space-between'; break;
    }

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.placeholder]: isPlaceholder,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content} style={{
                    justifyContent: contentJustifyContentValue,
                }}>
                    {answered ? (
                        answer
                    ) : (
                        <>
                            {renderFormat !== 'placeholder' ? question : <PlaceholderText />}
                            <div className={styles.buttons}>{buttons}</div>
                        </>
                    )}
                </div>
            </Container>
        </div>
    );
};

SurveyYesNo.propTypes = propTypes;
SurveyYesNo.defaultProps = defaultProps;

export default React.memo(SurveyYesNo);
