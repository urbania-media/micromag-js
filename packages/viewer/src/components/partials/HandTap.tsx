import classNames from 'classnames';
import React from 'react';

import HandIcon from '../icons/Hand';

import styles from '../../styles/partials/hand-tap.module.css';

interface HandTapProps {
    withoutShadow?: boolean;
    className?: string;
}

function HandTap({ withoutShadow = false, className = null }: HandTapProps) {
    return (
        <div
            className={classNames([
                styles.container,
                className,
                { [styles.withoutShadow]: withoutShadow },
            ])}
        >
            <div className={styles.inner}>
                <div className={styles.circle} />
                <HandIcon className={styles.hand} />
            </div>
        </div>
    );
}

export default HandTap;
