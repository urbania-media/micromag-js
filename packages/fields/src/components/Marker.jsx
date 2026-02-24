/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fields from './Fields';

import styles from '../styles/marker.module.css';

const propTypes = {
    value: PropTypes.shape({
        text: PropTypes.string,
    }),
    isForm: PropTypes.bool,
    className: PropTypes.string,
};

const MarkerField = ({ isForm = false, value = null, className = null, ...props }) => {
    const { title = null } = value || {};
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
            {title !== null ? (
                <>
                    <span className={styles.value}>{title.body}</span>
                </>
            ) : (
                <span className={styles.noValue}>Entrez les infos...</span>
            )}
        </div>
    );
};

MarkerField.propTypes = propTypes;

export default MarkerField;
