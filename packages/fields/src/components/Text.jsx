/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

const propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'number']),
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    type: 'text',
    value: null,
    className: null,
    onChange: null,
};

const TextField = ({ type, value, className, onChange }) => (
    <input
        type={type}
        className={classNames([
            'form-control',
            {
                [className]: className !== null,
            },
        ])}
        value={value || ''}
        onChange={({ currentTarget: { value: newValue = '' } }) =>
            onChange !== null ? onChange(!isEmpty(newValue) ? newValue : null) : null
        }
    />
);

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
