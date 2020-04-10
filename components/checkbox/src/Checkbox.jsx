/* eslint-disable react/no-array-index-key, jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    option: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    option: null,
    value: null,
    onChange: null,
    className: null,
};

const Checkbox = ({ option, value, onChange, className }) => {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <label
                className={classNames([
                  styles.label,
                    {
                        active: value !== null,
                    },
                ])}
            >
                <input
                    className={styles.input}
                    type="checkbox"
                    autoComplete="off"
                    value={value}
                    checked={value !== null}
                    onChange={onChange}
                />
                {option}
            </label>
        </div>
    );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
