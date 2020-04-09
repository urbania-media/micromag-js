/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Checkbox from '@micromag/component-checkbox';
import Button from '@micromag/component-button';

import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    choices: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textComponent,
    }),
    // value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    choices: null,
    result: null,
    // value: [],
    onChange: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const SurveyCheckbox = ({ choices, result, onChange, background, renderFormat, className }) => {
    const [value, setValue] = useState([]);

    const [answered, setAnswered] = useState(false);

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
                        {answered ? (
                            <div className={styles.choices}>
                                {choices.length > 0 && renderFormat !== 'placeholder' ? (
                                    choices.map((item, i) => (
                                        <Checkbox
                                            className={styles.choice}
                                            onChange={onChange}
                                            key={`checkbox-${i + 1}`}
                                            option={<TextComponent {...item} />}
                                            value={value}
                                        />
                                    ))
                                ) : (
                                    <>
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<Placeholders.Text />}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<Placeholders.Text />}
                                        />
                                        <Checkbox
                                            className={styles.placeholder}
                                            option={<Placeholders.Text />}
                                        />
                                    </>
                                )}
                            </div>
                        ) : (
                            <TextComponent {...result} />
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
