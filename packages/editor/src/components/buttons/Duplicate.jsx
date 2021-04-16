/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@micromag/core/components';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const DuplicateButton = ({ className, ...props }) => (
    <Button
        className={className}
        theme="secondary"
        size="sm"
        icon={<FontAwesomeIcon icon={faClone} />}
        {...props}
    />
);

DuplicateButton.propTypes = propTypes;
DuplicateButton.defaultProps = defaultProps;

export default DuplicateButton;
