/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/close.module.css';

interface CloseButtonProps {
    className?: string;
}

function CloseButton({ className = null, ...props }) {
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
