/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/checkboxes.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    singleChoice: PropTypes.bool,
    options: MicromagPropTypes.selectOptions,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    singleChoice: false,
    options: [],
    className: null,
    buttonClassName: null,
    onChange: null,
};

const Checkboxes = ({
    name,
    value,
    singleChoice,
    options,
    className,
    buttonClassName,
    onChange,
}) => {
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
            {finalOptions.map(({ value: optionValue, label }) => {
                const active =
                    (value !== null && isArray(value) && value.indexOf(optionValue) !== -1) ||
                    (!isArray(value) && value === optionValue);

                return (
                    <label
                        key={`radio-${optionValue}`}
                        className={classNames([
                            'btn',
                            'btn-outline-secondary',
                            styles.item,
                            {
                                [buttonClassName]: buttonClassName !== null,
                                active,
                            },
                        ])}
                    >
                        <input
                            type="checkbox"
                            name={`${name}[]`}
                            autoComplete="off"
                            value={optionValue}
                            className="btn-check"
                            onChange={(e) => {
                                let newValue = null;
                                if (!singleChoice) {
                                    newValue = value || [];
                                    if (e.currentTarget.checked) {
                                        newValue.push(optionValue);
                                    } else {
                                        newValue =
                                            value !== null
                                                ? value.filter((it) => it !== optionValue)
                                                : null;
                                    }
                                    if (newValue.length === 0) {
                                        newValue = null;
                                    }
                                } else if (e.currentTarget.checked) {
                                    newValue = optionValue;
                                } else {
                                    newValue = null;
                                }

                                if (onChange !== null) {
                                    onChange(newValue);
                                }
                            }}
                            checked={active}
                        />{' '}
                        {label}
                    </label>
                );
            })}
        </div>
    );
};

Checkboxes.propTypes = propTypes;
Checkboxes.defaultProps = defaultProps;

export default Checkboxes;
