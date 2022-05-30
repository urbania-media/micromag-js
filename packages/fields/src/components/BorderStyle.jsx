import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Radios from './Radios';

import styles from '../styles/border-style.module.scss';

const propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    types: ['solid', 'dotted', 'dashed'],
    value: null,
    className: null,
    onChange: null,
};

const BorderStyle = ({ types, value, className, onChange }) => {
    const onBorderStyleChange = newVal => {
        const v = newVal === value ? null : newVal;

        onChange(v);
    }

    return (
        <div
            className={classNames([
                'd-flex',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={classNames(['d-inline-flex', 'ms-auto', 'me-auto'])}>
                <Radios
                    options={types.map((type) => ({
                        value: type,
                        label: (
                            <div className={styles.type}>
                                <div
                                    style={{
                                        width: 30,
                                        height: 30,
                                        border: `2px ${type} currentColor`,
                                    }}
                                />
                            </div>
                        ),
                    }))}
                    value={value || null}
                    className={classNames([
                        styles.container,
                        {
                            [className]: className !== null,
                        },
                    ])}
                    buttonClassName={styles.button}
                    onChange={onBorderStyleChange}
                />
            </div>
        </div>
    );
}

BorderStyle.propTypes = propTypes;
BorderStyle.defaultProps = defaultProps;

export default BorderStyle;
