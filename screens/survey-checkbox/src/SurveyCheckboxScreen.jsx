/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Image from '@micromag/component-image';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Checkbox from '@micromag/component-checkbox';
import Button from '@micromag/component-button';

import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
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

const SurveyCheckbox = ({ question, options, result, background, renderFormat, className }) => {
    const [value, setValue] = useState('');

    const [answered, setAnswered] = useState(false);

    const { width, height } = useScreenSize();

    const { image, text: resultText } = result || {};

    const onClickSubmit = () => {
        setAnswered(true);
    };

    const onChange = useCallback(newValue => setValue(newValue), [value]);

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
                                {renderFormat !== 'placeholder' ? (
                                    <div className={styles.choices}>
                                        {options !== null && options.length > 0 ? (
                                            <>
                                                {question !== null ? (
                                                    <TextComponent
                                                        className={styles.question}
                                                        {...question}
                                                    />
                                                ) : null}

                                                {options.map((item, i) => (
                                                    <Checkbox
                                                        className={styles.choice}
                                                        onChange={onChange}
                                                        key={`checkbox-${i + 1}`}
                                                        option={<TextComponent {...item} />}
                                                        value={value}
                                                    />
                                                ))}
                                                <Button
                                                    className={styles.button}
                                                    onClick={onClickSubmit}
                                                >
                                                    soumettre
                                                </Button>
                                            </>
                                        ) : null}
                                    </div>
                                ) : (
                                    <>
                                        <Placeholders.Title
                                            className={styles.questionPlaceholder}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<Placeholders.Subtitle />}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<Placeholders.Subtitle />}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<Placeholders.Subtitle />}
                                        />
                                        <Placeholders.Button
                                            className={styles.submitButtonPlaceholder}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

SurveyCheckbox.propTypes = propTypes;
SurveyCheckbox.defaultProps = defaultProps;

export default SurveyCheckbox;
