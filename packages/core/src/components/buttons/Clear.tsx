/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import styles from '../../styles/buttons/clear.module.css';

interface ClearButtonProps {
    onClick?: (...args: unknown[]) => void;
    className?: string;
}

const ClearButton = ({ onClick = null, className = null, ...props }) => (
    <button
        className={classNames([
            styles.container,
            {
                [className]: className,
            },
        ])}
        onClick={onClick}
        {...props}
    >
        <FontAwesomeIcon className={styles.icon} icon={faClose} size="md" />
    </button>
);

export default ClearButton;
