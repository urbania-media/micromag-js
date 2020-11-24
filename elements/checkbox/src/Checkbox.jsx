/* eslint-disable react/no-array-index-key, jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    option: MicromagPropTypes.textElement,
    value: PropTypes.string,
    onChange: PropTypes.func,
    checkboxStyle: MicromagPropTypes.checkboxStyle,
    className: PropTypes.string,
};

const defaultProps = {
    option: null,
    value: null,
    onChange: null,
    checkboxStyle: null,
    className: null,
};

const Checkbox = ({ option, value, onChange, checkboxStyle, className }) => {

    const { body } = option;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ ...checkboxStyle }}
        >
            <label
                className={classNames([
                    styles.label,
                    {
                        active: body === value,
                    },
                ])}
            >
                <input
                    className={styles.input}
                    type="checkbox"
                    autoComplete="off"
                    value={value}
                    checked={body === value}
                    onChange={e => {
                        if (e.currentTarget.checked && onChange !== null) {
                            onChange(body);
                        }
                    }}
                />
                {option}
            </label>
        </div>
    );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
