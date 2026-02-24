/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Button } from '@micromag/core/components';

const propTypes = {
    className: PropTypes.string,
};

const DeleteButton = ({ className = null, ...props }) => (
    <Button
        className={className}
        theme="danger"
        size="sm"
        icon={<FontAwesomeIcon icon={faTrash} />}
        {...props}
    />
);

DeleteButton.propTypes = propTypes;

export default DeleteButton;
