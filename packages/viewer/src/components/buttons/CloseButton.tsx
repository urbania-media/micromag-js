/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';

import { CloseIcon } from '@micromag/core/components';

import IconButton from './IconButton';

interface CloseButtonProps {
    className?: string;
}

function CloseButton({ className = null, ...props }: CloseButtonProps) {
    const intl = useIntl();
    return (
        <IconButton
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            label={intl.formatMessage({
                defaultMessage: 'Close',
                description: 'Button label with icon',
            })}
            icon={<CloseIcon />}
            {...props}
        />
    );
}

export default CloseButton;
