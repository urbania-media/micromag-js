/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/radios.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    options: MicromagPropTypes.selectOptions,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    options: [],
    className: null,
    buttonClassName: null,
    onChange: null,
};

const Radios = ({ name, value, options, className, buttonClassName, onChange }) => {
    const finalOptions = useMemo(() => getSelectOptions(options), [options]);
    return (
        <div
            className={classNames([
                'btn-group',
                'btn-group-toggle',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            data-toggle="buttons"
        >
            {finalOptions.map(({ value: optionValue, label }) => (
                <label
                    key={`radio-${optionValue}`}
                    className={classNames([
                        'btn',
                        'btn-outline-secondary',
                        {
                            active: optionValue === value,
                            [buttonClassName]: buttonClassName !== null,
                        },
                    ])}
                >
                    <input
                        type="radio"
                        name={name}
                        autoComplete="off"
                        value={optionValue}
                        onChange={e => {
                            if (onChange !== null) {
                                onChange(e.currentTarget.checked ? optionValue : null);
                            }
                        }}
                        checked={optionValue === value}
                    />{' '}
                    {label}
                </label>
            ))}
        </div>
    );
};

Radios.propTypes = propTypes;
Radios.defaultProps = defaultProps;

export default Radios;
