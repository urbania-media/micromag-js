/* eslint-disable react/no-array-index-key, react/button-has-type, jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import getSelectOptions from '../utils/getSelectOptions';

import styles from '../styles/position.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    axisOptions: MicromagPropTypes.selectOptions,
    crossOptions: MicromagPropTypes.selectOptions,
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    axisOptions: ['top', 'center', 'bottom'],
    crossOptions: ['left', 'center', 'right'],
    className: null,
    buttonClassName: null,
    onChange: null,
};

const Position = ({
    name,
    value,
    axisOptions: vertical,
    crossOptions: horizontal,
    className,
    buttonClassName,
    onChange,
}) => {
    const axisOptions = useMemo(() => getSelectOptions(vertical), [vertical]);
    const crossOptions = useMemo(() => getSelectOptions(horizontal), [horizontal]);
    const { axisAlign = null, crossAlign = null } = value || {};
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
            {axisOptions.map(({ value: axisOption, label: axisLabel }) =>
                crossOptions.map(({ value: crossOption, label: crossLabel }) => (
                    <label
                        key={`radio-${axisOption}-${crossOption}`}
                        className={classNames([
                            'btn',
                            'btn-outline-secondary',
                            {
                                active: axisOption === axisAlign && crossOption === crossAlign,
                                [buttonClassName]: buttonClassName !== null,
                            },
                        ])}
                    >
                        <input
                            type="radio"
                            name={name}
                            autoComplete="off"
                            value={`${axisOption}-${crossOption}`}
                            onChange={e => {
                                if (onChange !== null) {
                                    onChange(
                                        e.currentTarget.checked
                                            ? {
                                                  axisAlign: axisOption,
                                                  crossAlign: crossOption,
                                              }
                                            : value,
                                    );
                                }
                            }}
                            checked={axisOption === axisAlign && crossOption === crossAlign}
                        />{' '}
                        {`${axisLabel}-${crossLabel}`}
                    </label>
                )),
            )}
        </div>
    );
};

Position.propTypes = propTypes;
Position.defaultProps = defaultProps;

export default Position;
