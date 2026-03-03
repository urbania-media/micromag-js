/* eslint-disable react/jsx-props-no-spreading */
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Button } from '@micromag/core/components';

interface DeleteButtonProps {
    className?: string;
}

function DeleteButton({ className = null, ...props }) {
    return (
        <Button
            className={className}
            theme="danger"
            size="sm"
            icon={<FontAwesomeIcon icon={faTrash} />}
            {...props}
        />
    );
}

export default DeleteButton;
