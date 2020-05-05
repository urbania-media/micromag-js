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

const GeoPosition = ({ isForm, className, ...props }) => (
    <Fields
        {...props}
        className={classNames([
            {
                'p-2': isForm,
                className: className !== null,
            },
        ])}
        isList
        isHorizontal
    />
);

GeoPosition.propTypes = propTypes;
GeoPosition.defaultProps = defaultProps;

export default GeoPosition;
