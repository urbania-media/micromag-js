/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import * as AppPropTypes from '../../../lib/PropTypes';
import { isMessage } from '../../../lib/utils';

const propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['sm', 'lg']),
    placeholder: AppPropTypes.text,
    errors: AppPropTypes.formErrors,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    inputRef: AppPropTypes.ref,
    className: PropTypes.string,
    nativeOnChange: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
};

const defaultProps = {
    name: null,
    type: 'text',
    value: null,
    size: null,
    placeholder: null,
    errors: null,
    required: false,
    disabled: false,
    readOnly: false,
    inputRef: null,
    className: null,
    nativeOnChange: false,
    onChange: null,
    onClick: null,
    onFocus: null,
    onBlur: null,
    onKeyDown: null,
};

const TextField = ({
    type,
    name,
    value,
    size,
    placeholder,
    errors,
    required,
    disabled,
    readOnly,
    inputRef,
    className,
    nativeOnChange,
    onChange,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
}) => {
    const intl = useIntl();
    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                onChange(
                    type === 'number' ? parseInt(e.currentTarget.value, 10) : e.currentTarget.value,
                );
            }
        },
        [type, onChange],
    );
    return (
        <input
            type={type}
            name={name}
            value={value || ''}
            placeholder={isMessage(placeholder) ? intl.formatMessage(placeholder) : placeholder}
            onChange={nativeOnChange ? onChange : onInputChange}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            ref={inputRef}
            className={classNames([
                'form-control',
                {
                    'is-invalid': errors !== null,
                    [`form-control-${size}`]: size !== null,
                    [className]: className !== null,
                },
            ])}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    );
};

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <TextField {...props} inputRef={ref} />);
