/* eslint-disable react/jsx-props-no-spreading */
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from '@micromag/core/components';

interface SettingsButtonProps {
    dots?: boolean;
    className?: string;
}

const SettingsButton = ({ className = null, dots = false, ...props }) => (
    <Button
        className={className}
        theme="secondary"
        size="sm"
        icon={<FontAwesomeIcon icon={dots ? faEllipsisV : faCogs} />}
        {...props}
    />
);

export default SettingsButton;
