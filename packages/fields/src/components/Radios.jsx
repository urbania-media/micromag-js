/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/radios.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    options: MicromagPropTypes.selectOptions,
    withBackground: PropTypes.bool,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    onChange: PropTypes.func,
    uncheckable: PropTypes.bool,
};

const defaultProps = {
    name: null,
    value: null,
    options: [],
    withBackground: false,
    className: null,
    buttonClassName: null,
    onChange: null,
    uncheckable: false,
};

const Radios = ({
    name,
    value,
    options,
    withBackground,
    className,
    buttonClassName,
    onChange,
    uncheckable,
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
            {finalOptions.map(({ value: optionValue, label }, index) => (
                <label
                    key={`radio-${optionValue}-${index + 1}`}
                    className={classNames([
                        'btn',
                        withBackground ? 'btn-secondary' : 'btn-outline-secondary',
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
                        value={optionValue || ''}
                        className="btn-check"
                        onClick={(e) => {
                            if (onChange !== null) {
                                if (uncheckable && optionValue === value) {
                                    onChange(null);
                                } else {
                                    onChange(e.currentTarget.checked ? optionValue : null);
                                }
                            }
                        }}
                        onChange={() => {}}
                        checked={optionValue === value}
                    />{' '}
                    <Label>{label}</Label>
                </label>
            ))}
        </div>
    );
};

Radios.propTypes = propTypes;
Radios.defaultProps = defaultProps;

export default Radios;
