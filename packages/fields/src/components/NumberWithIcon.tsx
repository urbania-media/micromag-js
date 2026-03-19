/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import Number from './Number';

interface NumberWithIconProps {
    icon?: React.ReactNode | unknown | null;
    iconRotation?: number;
    isHorizontal?: boolean;
    className?: string | null;
}

function NumberWithIcon({
    icon = null,
    iconRotation = 0,
    isHorizontal = false,
    className = null,
    ...props
}: NumberWithIconProps) {
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                className,
                {
                    'justify-content-end': isHorizontal,
                },
            ])}
        >
            <span
                className="me-2"
                style={iconRotation !== 0 ? { transform: `rotate(${iconRotation}deg)` } : null}
            >
                <FontAwesomeIcon icon={icon} />
            </span>
            <Number {...props} />
        </div>
    );
}

NumberWithIcon.isHorizontal = true;

export default NumberWithIcon;
