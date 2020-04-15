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
    options: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textComponent,
    }),
    background: MicromagPropTypes.backgroundComponent,
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
                                    {question !== null && renderFormat !== 'placeholder' ? (
                                        <TextComponent className={styles.question} {...question} />
                                    ) : (
                                        <Placeholders.Text className={styles.placeholder} />
                                    )}
                                </div>
                                <div className={styles.buttons}>
                                    {options !== null && renderFormat !== 'placeholder' ? (
                                        options.map((item, index) => (
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
                                    ) : (
                                        <>
                                            <Button className={styles.buttonPlaceholder} />
                                            <Button className={styles.buttonPlaceholder} />
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

SurveyMultipleChoice.propTypes = propTypes;
SurveyMultipleChoice.defaultProps = defaultProps;

export default SurveyMultipleChoice;
