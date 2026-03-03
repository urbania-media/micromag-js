/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import Button from './Button';

interface BackButtonProps {
    className?: string;
}

function BackButton({ className = null, ...props }) {
    return (
        <Button
            className={classNames([
                'px-2',
                {
                    [className]: className,
                },
            ])}
            size="sm"
            icon={<FontAwesomeIcon icon={faAngleLeft} size="lg" />}
            {...props}
        />
    );
}

export default BackButton;
