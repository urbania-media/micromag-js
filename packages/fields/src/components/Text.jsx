/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

const propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.object })]),
    type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: MicromagPropTypes.errors,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    prefix: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    inputRef: null,
    type: 'text',
    value: null,
    errors: null,
    required: false,
    placeholder: null,
    prefix: null,
    className: null,
    onChange: null,
};

const TextField = ({
    inputRef,
    type,
    value,
    errors,
    required,
    placeholder,
    prefix,
    className,
    onChange,
}) => {
    const input = (
        <input
            ref={inputRef}
            type={type}
            className={classNames([
                'form-control',
                {
                    'is-invalid': errors !== null && errors.length > 0,
                    [className]: className !== null,
                },
            ])}
            value={value || ''}
            onChange={({ currentTarget: { value: newValue = '' } }) =>
                onChange !== null ? onChange(!isEmpty(newValue) ? newValue : null) : null
            }
            placeholder={placeholder}
            required={required}
        />
    );

    return prefix !== null ? (
        <span className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">{prefix}</span>
            </div>
            {input}
        </span>
    ) : (
        input
    );
};

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <TextField {...props} inputRef={ref} />);
