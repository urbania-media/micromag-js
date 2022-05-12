import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getShadowCoords } from '@micromag/core/utils';

import Radios from './Radios';

import styles from '../styles/shadow-angle.module.scss';

const propTypes = {
    types: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    types: [45, 90, -45, -90],
    value: null,
    className: null,
    onChange: null,
};

const ShadowAngle = ({ types, value, className, onChange }) => {
    const onShadowAngleChange = newVal => {
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
                    options={types.map((type) => {
                        const { x, y } = getShadowCoords(type, 5);
                        return {
                            value: type,
                            label: (
                                <div className={styles.type}>
                                    <div
                                        style={{
                                            width: 30,
                                            height: 30,
                                            border: `2px solid currentColor`,
                                            position: 'relative',
                                            top: `${-y/2}px`,
                                            left: `${-x/2}px`,
                                            boxShadow: `${x}px ${y}px 0 0 currentColor`,
                                        }}
                                    />
                                </div>
                            ),
                        };
                    })}
                    value={value || null}
                    className={classNames([
                        styles.container,
                        {
                            [className]: className !== null,
                        },
                    ])}
                    buttonClassName={styles.button}
                    onChange={onShadowAngleChange}
                />
            </div>
        </div>
    );
}

ShadowAngle.propTypes = propTypes;
ShadowAngle.defaultProps = defaultProps;

export default ShadowAngle;
