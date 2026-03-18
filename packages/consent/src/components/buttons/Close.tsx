/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/close.module.css';

interface CloseButtonProps {
    className?: string;
}

function CloseButton({ className = null, ...props }: CloseButtonProps) {
    return (
        <Button
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            withoutStyle
            icon={<FontAwesomeIcon icon={faTimes} className={styles.icon} />}
            iconPosition="right"
            {...props}
        />
    );
}

export default CloseButton;
