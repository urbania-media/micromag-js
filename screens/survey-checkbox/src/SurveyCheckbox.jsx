/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextComponent from '@micromag/element-text';
import Image from '@micromag/element-image';
import Checkbox from '@micromag/element-checkbox';
import Button from '@micromag/element-button';

import {
    PlaceholderTitle,
    PlaceholderSubtitle,
    PlaceholderButton,
    PropTypes as MicromagPropTypes,
} from '@micromag/core';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

export const layouts = ['normal'];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    question: MicromagPropTypes.textElement,
    options: PropTypes.arrayOf(MicromagPropTypes.textElement),
    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textElement,
    }),
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
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
    renderFormat: 'view',
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
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEditor, isView } = getRenderFormat(renderFormat);

    const [value, setValue] = useState('');
    const [answered, setAnswered] = useState(false);
    const { image, text: resultText } = result || {};

    const onClickSubmit = () => {
        setAnswered(true);
    };
    const onChange = useCallback((newValue) => setValue(newValue), [value]);

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
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
                <div className={styles.content}>
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
