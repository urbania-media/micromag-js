/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Radios from './Radios';

import styles from '../styles/object-fit-size.module.scss';

const propTypes = {
    values: PropTypes.arrayOf(PropTypes.string),
    value: MicromagPropTypes.objectFitSize,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    values: ['cover', 'contain', 'fill', 'scale-down', 'none'],
    value: null,
    className: null,
    onChange: null,
};

const ObjectFitSize = ({ values, value, className, onChange }) => (
    <Radios
        options={values.map(val => ({
            value: val,
            label: (
                <div className={classNames([styles.frame, styles[val]])}>
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
ObjectFitSize.defaultProps = defaultProps;

export default ObjectFitSize;
