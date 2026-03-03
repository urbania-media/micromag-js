import classNames from 'classnames';
import React from 'react';

import { ArrowIcon } from '@micromag/core/components';

import styles from '../../styles/partials/arrow-hint.module.css';

interface ArrowHintProps {
    withoutShadow?: boolean;
    className?: string;
}

function ArrowHint({ withoutShadow = false, className = null }) {
    return (
        <div
            className={classNames([
                styles.container,
                { [styles.withoutShadow]: withoutShadow, [className]: className !== null },
            ])}
        >
            <div className={styles.inner}>
                <ArrowIcon className={styles.arrow} />
            </div>
        </div>
    );
}

export default ArrowHint;
