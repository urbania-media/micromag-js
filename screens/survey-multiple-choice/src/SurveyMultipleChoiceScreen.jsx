/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Button from '@micromag/component-button';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    question: MicromagPropTypes.textComponent,
    choices: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    question: null,
    choices: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const SurveyMultipleChoice = ({ question, choices, background, renderFormat, className }) => {
    const { width, height } = useScreenSize();

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
                        <div className={styles.questionContainer}>
                            {question !== null && renderFormat !== 'placeholder' ? (
                                <TextComponent className={styles.question} {...question} />
                            ) : (
                                <Placeholders.Text className={styles.placeholder} />
                            )}
                        </div>
                        <div className={styles.buttons}>
                            {choices !== null && renderFormat !== 'placeholder' ? (
                                choices.map((item, index) => (
                                    <Button className={styles.button}>
                                        <div className={styles.label}>
                                            <div className={styles.letter}>
                                                {String.fromCharCode(index + 65)}
                                            </div>
                                            <TextComponent className={styles.choice} {...item} />
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
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

SurveyMultipleChoice.propTypes = propTypes;
SurveyMultipleChoice.defaultProps = defaultProps;

export default SurveyMultipleChoice;
