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
    types: ['label-bottom', 'label-top', 'no-label', 'label-over'],
    value: null,
    className: null,
    onChange: null,
};

const ButtonLayout = ({ types, value, className, onChange }) => {
    const onButtonLayoutChange = newVal => {
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
                                {type}
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
                    onChange={onButtonLayoutChange}
                />
            </div>
        </div>
    );
}

ButtonLayout.propTypes = propTypes;
ButtonLayout.defaultProps = defaultProps;

export default ButtonLayout;
