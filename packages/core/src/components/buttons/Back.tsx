/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import Button from './Button';

interface BackButtonProps {
    className?: string;
}

const BackButton = ({ className = null, ...props }) => (
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

export default BackButton;
