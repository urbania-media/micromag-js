/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';
import Select from './Select';

import styles from '../styles/font-family.module.scss';

const propTypes = {
    fonts: PropTypes.arrayOf(PropTypes.string),
    isForm: PropTypes.bool,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    fonts: ['Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman'],
    isForm: false,
    value: null,
    className: null,
    onChange: null,
};

const FontFamily = ({ fonts, value, isForm, className, onChange }) =>
    isForm ? (
        <div className={styles.form}>
            <Select options={fonts} value={value} className={className} onChange={onChange} />
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {value !== null ? (
                <>
                    <span className={styles.value}>{value}</span>
                </>
            ) : (
                <span className={styles.noValue}>Sélectionnez une police</span>
            )}
        </div>
    );

FontFamily.propTypes = propTypes;
FontFamily.defaultProps = defaultProps;
FontFamily.withForm = true;

export default FontFamily;
