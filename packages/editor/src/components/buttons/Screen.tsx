/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { Label } from '@micromag/core';
import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/screen.module.css';

interface ScreenButtonProps {
    active?: boolean;
    id?: string;
    href?: string;
    label?: Label;
    icon?: React.ReactNode;
    title?: string;
    onClick?: (...args: unknown[]) => void;
    children?: React.ReactNode;
    refButton?: { current?: unknown };
    className?: string;
}

const ScreenButton = ({
    active = false,
    id = null,
    href = null,
    className = null,
    label = null,
    icon = null,
    children = null,
    title = null,
    onClick = null,
    refButton = null,
}) => (
    <div
        className={classNames([
            styles.container,
            'rounded',
            {
                [styles.active]: active,
                [className]: className !== null,
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
            refButton={refButton}
        >
            <span className={classNames([styles.border, 'rounded'])} />
        </Button>
    </div>
);

export default React.forwardRef((props, ref) => <ScreenButton {...props} refButton={ref} />);
