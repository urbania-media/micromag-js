/* eslint-disable react/jsx-props-no-spreading, react/jsx-indent */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Checkbox from '@micromag/component-checkbox';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    choices: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    choices: null,
    value: [],
    onChange: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

// @TODO: how to distinguish/separate groups of choices like in model

const SurveyCheckbox = ({ choices, value, onChange, background, renderFormat, className }) => {
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
                        <div className={styles.choices}>
                            {renderFormat !== 'placeholder' &&
                            choices !== null &&
                            choices.length > 0 ? (
                                choices.map((item, i) => (
                                    <Checkbox
                                        className={styles.choice}
                                        onChange={onChange}
                                        key={`checkbox-${i + 1}`}
                                        option={<TextComponent {...item} />}
                                        // option={item}
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
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

SurveyCheckbox.propTypes = propTypes;
SurveyCheckbox.defaultProps = defaultProps;

export default SurveyCheckbox;
