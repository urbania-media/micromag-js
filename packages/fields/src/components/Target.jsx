/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import * as AppPropTypes from '../../lib/PropTypes';
import Select from './Select';

import styles from '../styles/font-family.module.scss';

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    isForm: PropTypes.bool,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    options: ['_blank', 'self'],
    isForm: false,
    value: null,
    className: null,
    onChange: null,
};

const TargetField = ({ options, value, isForm, className, onChange }) =>
    isForm ? (
        <div className={styles.form}>
            <Select options={options} value={value} className={className} onChange={onChange} />
        </div>
    ) : (
        <div className={styles.form}>{value}</div>
    );

TargetField.propTypes = propTypes;
TargetField.defaultProps = defaultProps;
TargetField.withForm = true;

export default TargetField;
