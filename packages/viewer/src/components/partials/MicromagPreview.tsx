/* eslint-disable react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';

import type { ScreenComponent } from '@micromag/core';
import { ScreenPreview } from '@micromag/core/components';

import styles from '../../styles/partials/micromag-preview.module.css';

interface MicromagPreviewProps {
    screen?: ScreenComponent;
    title?: string;
    url?: string;
    description?: string;
    className?: string;
}

function MicromagPreview({
    screen = null,
    title = null,
    url = null,
    description = null,
    className = null,
}: MicromagPreviewProps) {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.cover}>
                <ScreenPreview screen={screen} width={100} height={150} withSize />
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                {url ? <div className={styles.url}>{url}</div> : null}
                <p>{description}</p>
            </div>
        </div>
    );
}

export default MicromagPreview;
