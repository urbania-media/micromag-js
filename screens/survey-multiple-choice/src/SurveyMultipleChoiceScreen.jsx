/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/element-text';
import Image from '@micromag/element-image';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Button from '@micromag/element-button';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    question: MicromagPropTypes.textElement,
    options: PropTypes.arrayOf(MicromagPropTypes.textElement),
    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textElement,
    }),
    background: MicromagPropTypes.backgroundElement,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    question: null,
    options: null,
    result: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const SurveyMultipleChoice = ({
    question,
    options,
    result,
    background,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();

    const [answered, setAnswered] = useState(false);

    const { image, text: resultText } = result || {};

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
                                    {renderFormat !== 'placeholder' ? (
                                        <>
                                            {question !== null ? (
                                                <TextComponent
                                                    className={styles.question}
                                                    {...question}
                                                />
                                            ) : null}{' '}
                                        </>
                                    ) : (
                                        <Placeholders.Text className={styles.placeholder} />
                                    )}
                                </div>
                                <div className={styles.buttons}>
                                    {renderFormat !== 'placeholder' ? (
                                        <>
                                            {options !== null
                                                ? options.map((item, index) => (
                                                    <Button className={styles.button}>
                                                        <div className={styles.label}>
                                                            <div className={styles.letter}>
                                                                {String.fromCharCode(index + 65)}
                                                            </div>
                                                            <TextComponent
                                                                className={styles.choice}
                                                                {...item}
                                                              />
                                                        </div>
                                                    </Button>
                                                  ))
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
                                {renderFormat !== 'placeholder' ? (
                                    <Button className={styles.submitButton} onClick={onClickSubmit}>
                                        soumettre
                                    </Button>
                                ) : (
                                    <Placeholders.Button
                                        className={styles.submitButtonPlaceholder}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

SurveyMultipleChoice.propTypes = propTypes;
SurveyMultipleChoice.defaultProps = defaultProps;

export default SurveyMultipleChoice;
