/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../../lib/PropTypes';
import Label from '../../partials/Label';

const propTypes = {
    name: PropTypes.string,
    label: AppPropTypes.label,
    errors: AppPropTypes.formErrors,
    helpText: PropTypes.node,
    children: PropTypes.node,
    horizontal: PropTypes.bool,
    withoutLabel: PropTypes.bool,
    withoutErrors: PropTypes.bool,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
};

const defaultProps = {
    name: null,
    label: null,
    errors: null,
    helpText: null,
    children: null,
    horizontal: false,
    withoutLabel: false,
    withoutErrors: false,
    className: null,
    labelClassName: null,
};

const FormGroup = ({
    name,
    label,
    helpText,
    children,
    errors,
    horizontal,
    withoutLabel,
    withoutErrors,
    className,
    labelClassName,
}) => (
    <div
        className={classNames([
            'form-group',
            {
                row: horizontal,
                'mx-n2': horizontal,
                [className]: className !== null,
            },
        ])}
    >
        {!withoutLabel && label !== null ? (
            <label
                htmlFor={name}
                className={classNames([
                    {
                        'col-sm-2': horizontal,
                        'px-2': horizontal,
                        [labelClassName]: labelClassName !== null,
                    },
                ])}
            >
                <Label>{label}</Label>
            </label>
        ) : null}
        <div
            className={classNames([
                {
                    'col-sm-10': horizontal,
                    'px-2': horizontal,
                },
            ])}
        >
            {children}
            {helpText !== null ? <small className="form-text text-muted">{helpText}</small> : null}
            {!withoutErrors && errors !== null ? (
                <div className={classNames(['invalid-feedback', 'd-block'])}>
                    <ul className="list-unstyled">
                        {errors.map((error) => (
                            <li key={`error-${error}`}>{error}</li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    </div>
);

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;

export default FormGroup;
