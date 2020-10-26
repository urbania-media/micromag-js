/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import {
    PlaceholderTitle,
    PlaceholderSubtitle,
    PlaceholderButton,
} from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextComponent from '@micromag/element-text';
import Image from '@micromag/element-image';
import Checkbox from '@micromag/element-checkbox';
import Button from '@micromag/element-button';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    question: MicromagPropTypes.textElement,
    options: PropTypes.arrayOf(MicromagPropTypes.textElement),
    result: PropTypes.shape({
        image: MicromagPropTypes.imageMedia,
        text: MicromagPropTypes.textElement,
    }),
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    question: null,
    options: null,
    result: null,
    background: null,
    current: true,
    active: false,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    className: null,
};

const SurveyCheckbox = ({
    layout,
    question,
    options,
    result,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEdit, isView } = useScreenRenderContext();

    const [value, setValue] = useState('');
    const [answered, setAnswered] = useState(false);
    const { image, text: resultText } = result || {};

    const onClickSubmit = () => {
        setAnswered(true);
    };
    const onChange = useCallback((newValue) => setValue(newValue), [value]);

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
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    <div className={styles.inner}>
                        {answered ? (
                            <div className={styles.resultContainer}>
                                <Image className={styles.image} {...image} />
                                <TextComponent className={styles.result} {...resultText} />
                            </div>
                        ) : (
                            <>
                                {isPlaceholder ? (
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
                                        <PlaceholderTitle className={styles.questionPlaceholder} />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<PlaceholderSubtitle />}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<PlaceholderSubtitle />}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<PlaceholderSubtitle />}
                                        />
                                        <PlaceholderButton
                                            className={styles.submitButtonPlaceholder}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

SurveyCheckbox.propTypes = propTypes;
SurveyCheckbox.defaultProps = defaultProps;

export default SurveyCheckbox;
