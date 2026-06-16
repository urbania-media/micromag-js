import classNames from 'classnames';
import { ForwardedRef, ReactNode } from 'react';

import type { Label } from '@micromag/core';
import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/screen.module.css';

interface ScreenButtonProps {
    active?: boolean;
    id?: string;
    href?: string;
    label?: Label;
    icon?: ReactNode;
    title?: string;
    onClick?: (...args: unknown[]) => void;
    children?: ReactNode;
    ref: ForwardedRef<HTMLButtonElement>;
    className?: string;
}

function ScreenButton({
    active = false,
    id = null,
    href = null,
    className = null,
    label = null,
    icon = null,
    children = null,
    title = null,
    onClick = null,
    ref: refButton = null,
}: ScreenButtonProps) {
    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.active]: active,
                },
            ])}
        >
            {children !== null ? (
                children
            ) : (
                <div className={styles.screen}>
                    <div className={styles.inner}>
                        {icon !== null ? <div className={styles.icon}>{icon}</div> : null}
                        {label !== null ? <div className={styles.label}>{label}</div> : null}
                    </div>
                </div>
            )}
            <Button
                className={styles.button}
                withoutStyle
                id={id}
                href={href}
                title={title}
                onClick={onClick}
                ref={refButton}
            >
                <span
                    className={classNames([
                        'position-absolute top-0 start-0 w-100 h-100 border border-primary border-3 fade',
                        {
                            'opacity-0': !active,
                            'opacity-100': active,
                        },
                    ])}
                />
            </Button>
        </div>
    );
}

export default ScreenButton;
