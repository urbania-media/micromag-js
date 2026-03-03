/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons/faClone';
import { Button } from '@micromag/core/components';

interface DuplicateButtonProps {
    className?: string;
}

function DuplicateButton({ className = null, ...props }) {
    return (
        <Button
            className={className}
            theme="secondary"
            size="sm"
            icon={<FontAwesomeIcon icon={faClone} />}
            {...props}
        />
    );
}

export default DuplicateButton;
