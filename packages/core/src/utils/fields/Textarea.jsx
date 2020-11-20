/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';

import * as AppPropTypes from '../../../lib/PropTypes';
import { isMessage } from '../../../lib/utils';

const propTypes = {
    intl: AppPropTypes.intl.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'lg']),
    placeholder: AppPropTypes.text,
    required: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    size: null,
    placeholder: null,
    required: false,
    className: null,
    onChange: null,
};

const TextareaField = ({ intl, name, value, size, placeholder, required, onChange, className }) => {
    const onInputChange = useCallback(
        e => {
            if (onChange !== null) {
                onChange(e.currentTarget.value);
            }
        },
        [onChange],
    );
    return (
        <textarea
            name={name}
            value={value || ''}
            placeholder={isMessage(placeholder) ? intl.formatMessage(placeholder) : placeholder}
            onChange={onInputChange}
            required={required}
            className={classNames([
                'form-control',
                {
                    [`form-control-${size}`]: size !== null,
                    [className]: className !== null,
                },
            ])}
        />
    );
};

TextareaField.propTypes = propTypes;
TextareaField.defaultProps = defaultProps;

export default injectIntl(TextareaField);
