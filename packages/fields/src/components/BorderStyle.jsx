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
    types: ['solid', 'dotted', 'dashed', 'groove'],
    value: null,
    className: null,
    onChange: null,
};

const BorderStyle = ({ types, value, className, onChange }) => (
    <div
        className={classNames([
            'd-flex',
            {
                [className]: className !== null,
            },
        ])}
    >
        <div className={classNames(['d-inline-flex', 'ml-auto', 'mr-auto'])}>
            <Radios
                options={types.map((type) => ({
                    value: type,
                    label: (
                        <div className={styles.type}>
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    border: `2px ${type} #ccc`,
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
                onChange={onChange}
            />
        </div>
    </div>
);

BorderStyle.propTypes = propTypes;
BorderStyle.defaultProps = defaultProps;

export default BorderStyle;
