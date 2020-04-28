/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';

const propTypes = {
    children: MicromagPropTypes.label,
    muted: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    children: null,
    muted: true,
    className: null,
};

const FieldErrors = ({ children, muted, className }) => (
    <small
        id="passwordHelpBlock"
        className={classNames([
            'form-text',
            {
                'text-muted': muted,
                [className]: className !== null,
            },
        ])}
    >
        <Label>{children}</Label>
    </small>
);

FieldErrors.propTypes = propTypes;
FieldErrors.defaultProps = defaultProps;

export default FieldErrors;
