/* eslint-disable jsx-a11y/no-autofocus */

/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

const propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.object })]),
    type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: MicromagPropTypes.errors,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    autofocus: PropTypes.bool,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    inputRef: null,
    type: 'text',
    value: null,
    errors: null,
    required: false,
    disabled: false,
    placeholder: null,
    prefix: null,
    autofocus: false,
    onChange: null,
    onFocus: null,
    className: null,
};

const TextField = ({
    inputRef,
    type,
    value,
    errors,
    required,
    disabled,
    placeholder,
    prefix,
    autofocus,
    onChange,
    onFocus,
    className,
}) => {
    const input = (
        <input
            ref={inputRef}
            type={type}
            className={classNames([
                'form-control',
                {
                    'is-invalid': errors !== null && errors.length > 0,
                    disabled,
                    [className]: className !== null,
                },
            ])}
            value={value || ''}
            onChange={({ currentTarget: { value: newValue = '' } }) =>
                onChange !== null ? onChange(!isEmpty(newValue) ? newValue : null) : null
            }
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoFocus={autofocus}
            {...(onFocus !== null ? { onFocus } : null)}
        />
    );

    return prefix !== null ? (
        <span className="input-group">
            <span className="input-group-text">{prefix}</span>
            {input}
        </span>
    ) : (
        input
    );
};

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <TextField {...props} inputRef={ref} />);
