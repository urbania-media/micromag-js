/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextElement from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Button from '@micromag/element-button';
import Box from '@micromag/element-box';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    questionText: MicromagPropTypes.textElement,
    questionImage: MicromagPropTypes.imageElement,
    goodAnswerText: MicromagPropTypes.textElement,
    goodAnswerImage: MicromagPropTypes.imageElement,
    badAnswerText: MicromagPropTypes.textElement,
    badAnswerImage: MicromagPropTypes.imageElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    button: MicromagPropTypes.buttonElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    questionText: null,
    questionImage: null,
    goodAnswerText: null,
    goodAnswerImage: null,
    badAnswerText: null,
    badAnswerImage: null,
    background: null,
    box: null,
    button: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const SurveyYesNo = ({
    questionText,
    questionImage,
    goodAnswerText,
    badAnswerImage,
    badAnswerText,
    goodAnswerImage,
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

    const onClickTrue = useCallback(() => {
        setAnswered(true);
    }, [setAnswered]);

    const onClickFalse = useCallback(() => {
        setAnswered(false);
    }, [setAnswered]);

    const question =
        questionText !== null || questionImage !== null ? (
            <div className={styles.questionContainer}>
                <ImageElement className={styles.image} {...questionImage} />
                <TextElement {...questionText} />
            </div>
        ) : null;

    const answer =
        answered === true ? (
            <div className={styles.answerContainer}>
                <ImageElement className={styles.image} {...goodAnswerImage} />
                <TextElement className={styles.result} {...goodAnswerText} />
            </div>
        ) : (
            <div className={styles.answerContainer}>
                <ImageElement className={styles.image} {...badAnswerImage} />
                <TextElement className={styles.result} {...badAnswerText} />
            </div>
        );

    const buttons =
        renderFormat !== 'placeholder' ? (
            <>
                <Button className={styles.button} onClick={onClickTrue} {...button}>
                    Oui
                </Button>
                <Button className={styles.button} onClick={onClickFalse} {...button}>
                    Non
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
