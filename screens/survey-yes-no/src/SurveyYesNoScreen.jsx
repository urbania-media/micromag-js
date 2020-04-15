/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Image from '@micromag/component-image';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Button from '@micromag/component-button';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    question: MicromagPropTypes.textComponent,
    background: MicromagPropTypes.backgroundComponent,
    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textComponent,
    }),
    onClick: PropTypes.func,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    question: null,
    background: null,
    result: {},
    onClick: null,
    renderFormat: 'view',
    className: null,
};

const SurveyYesNo = ({ question, background, result, onClick, renderFormat, className }) => {
    const { width, height } = useScreenSize();

    const [answered, setAnswered] = useState(false);

    const { image, text: resultText } = result;

    const onClickSubmit = () => {
        setAnswered(true);
    };

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
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    <div className={styles.inner}>
                        {answered ? (
                            <div className={styles.resultContainer}>
                                <Image className={styles.image} {...image} />
                                <TextComponent className={styles.result} {...resultText} />
                            </div>
                        ) : (
                            <>
                                <div className={styles.questionContainer}>
                                    {question !== null && renderFormat !== 'placeholder' ? (
                                        <TextComponent {...question} />
                                    ) : (
                                        <Placeholders.Text className={styles.placeholder} />
                                    )}
                                </div>
                                <div className={styles.buttons}>
                                    {renderFormat !== 'placeholder' ? (
                                        <>
                                            <Button className={styles.button} onClick={onClick}>
                                                Oui
                                            </Button>
                                            <Button className={styles.button} onClick={onClick}>
                                                Non
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className={styles.buttonPlaceholder} />
                                            <Button className={styles.buttonPlaceholder} />
                                        </>
                                    )}
                                </div>
                                {renderFormat !== 'placeholder' ? (
                                    <Button className={styles.submitButton} onClick={onClickSubmit}>
                                        soumettre
                                    </Button>
                                ) : (
                                    <Button className={styles.submitButtonPlaceholder} />
                                )}
                            </>
                        )}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

SurveyYesNo.propTypes = propTypes;
SurveyYesNo.defaultProps = defaultProps;

export default SurveyYesNo;
