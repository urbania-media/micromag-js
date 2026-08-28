import classNames from 'classnames';
import React from 'react';

import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/pill.module.css';

interface PillButtonProps {
    children?: React.ReactNode;
    color?: string;
    backgroundColor?: string;
    active?: boolean;
    invert?: boolean;
    disabled?: boolean;
    dark?: boolean;
    onClick?: (...args: unknown[]) => void;
    className?: string;
}

function PillButton({
    children = null,
    color = null,
    backgroundColor = null,
    className = null,
    active = false,
    disabled = false,
    invert = false,
    dark = false,
    onClick = null,
    ...props
}: PillButtonProps) {
    return (
        <Button
            className={classNames([
                styles.container,
                className,
                {
                    [styles.active]: active,
                    [styles.dark]: dark,
                    [styles.invert]: invert,
                    [styles.disabled]: disabled,
                },
            ])}
            {...props}
            onClick={disabled ? null : onClick}
            style={{ color, backgroundColor }}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}

export default PillButton;
