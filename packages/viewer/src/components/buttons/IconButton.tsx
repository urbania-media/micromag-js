/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Button from './Button';

import styles from '../../styles/buttons/icon-button.module.css';

interface IconButtonProps {
    iconClassName?: string;
    className?: string;
}

function IconButton({ iconClassName = null, className = null, ...props }: IconButtonProps) {
    return (
        <Button
            className={classNames([
                styles.container,
                className,
            ])}
            labelClassName={styles.label}
            iconClassName={classNames([
                styles.icon,
                iconClassName,
            ])}
            {...props}
        />
    );
}

export default IconButton;
