/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fields from './Fields';

import styles from '../styles/marker.module.scss';

const propTypes = {
    value: PropTypes.shape({
        text: PropTypes.string,
    }),
    isForm: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    isForm: false,
    className: null,
};

const MarkerField = ({ isForm, value, className, ...props }) => {
    const { text = null } = value || {};
    return isForm ? (
        <div
            className={classNames([
                styles.panel,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Fields {...props} value={value} />
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
            {text !== null ? (
                <>
                    <span className={styles.value}>{text}</span>
                </>
            ) : (
                <span className={styles.noValue}>Entrez les infos...</span>
            )}
        </div>
    );
};

MarkerField.propTypes = propTypes;
MarkerField.defaultProps = defaultProps;

export default MarkerField;
