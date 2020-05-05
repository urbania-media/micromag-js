/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fields from './Fields';

const propTypes = {
    isForm: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    isForm: false,
    className: null,
};

const MarkerField = ({ isForm, className, ...props }) => (
    <Fields
        className={classNames([
            {
                'p-2': isForm,
                className: className !== null,
            },
        ])}
        {...props}
    />
);

MarkerField.propTypes = propTypes;
MarkerField.defaultProps = defaultProps;

export default MarkerField;
