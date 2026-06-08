/* eslint-disable react/no-array-index-key */
import isObject from 'lodash-es/isObject';
import React from 'react';

import styles from './styles/layout-grid.module.css';

interface LayoutGridProps {
    layouts?: (string | { name?: string })[];
    children: React.ReactNode | ((...args: unknown[]) => React.ReactNode);
}

function LayoutGrid({ layouts = null, children }: LayoutGridProps) {
    return (
        <div className={styles.container}>
            <div className={styles.items}>
                {layouts !== null && layouts.length > 0 ? (
                    layouts.map((layout, layoutIndex) => (
                        <div key={`layout-${layoutIndex}`} className={styles.item}>
                            <h4>{isObject(layout) ? layout.name : layout}</h4>
                            <div className={styles.screen}>{children(layout)}</div>
                        </div>
                    ))
                ) : (
                    <div className={styles.item}>
                        <div className={styles.screen}>{children(null)}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LayoutGrid;
