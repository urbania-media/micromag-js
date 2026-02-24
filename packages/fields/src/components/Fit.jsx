/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Radios from './Radios';

import styles from '../styles/fit.module.css';

const propTypes = {
    values: PropTypes.arrayOf(MicromagPropTypes.objectFitSize),
    value: MicromagPropTypes.objectFitSize,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const ObjectFitSize = ({ values = ['cover', 'contain', null], value = null, className = null, onChange = null }) => (
    <Radios
        options={values.map(val => ({
            value: val,
            label: (
                <div className={classNames([styles.frame, styles[val || 'none']])}>
                    <div className={styles.shape}>
                        <div className={styles.inner}>
                            <div className={styles.media} />
                        </div>
                    </div>
                </div>
            ),
        }))}
        value={value}
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        buttonClassName={styles.button}
        onChange={onChange}
    />
);

ObjectFitSize.propTypes = propTypes;

export default ObjectFitSize;
