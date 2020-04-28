/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/field-errors.module.scss';

const propTypes = {
    errors: MicromagPropTypes.errors,
    className: PropTypes.string,
};

const defaultProps = {
    errors: null,
    className: null,
};

const FieldErrors = ({ errors, className }) =>
    errors !== null && errors.length > 0 ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {errors.map(error => (
                <div
                    key={`error-${error}`}
                    className={classNames(['invalid-feedback', styles.error])}
                >
                    {error}
                </div>
            ))}
        </div>
    ) : null;

FieldErrors.propTypes = propTypes;
FieldErrors.defaultProps = defaultProps;

export default FieldErrors;
