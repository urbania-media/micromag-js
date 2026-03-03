/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { Badge } from '@micromag/core';
import Badge from '@micromag/element-badge';

import styles from './styles.module.css';

interface HeaderProps {
    badge?: Badge | null;
    fade?: boolean;
    className?: string | null;
}

function Header({ badge = null, fade = false, className = null }: HeaderProps) {
    if (badge === null) return null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.fade]: fade === true,
                    [className]: className !== null,
                },
            ])}
        >
            {badge !== null ? <Badge className={styles.badge} {...badge} /> : null}
        </div>
    );
}

export default Header;
