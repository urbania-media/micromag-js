import React from 'react';

import styles from './styles/layout-grid.module.scss';

const LayoutGrid = ({ layouts, children }) => (
    <div className={styles.container}>
        <div className={styles.items}>
            {layouts.map(layout => (
                <div className={styles.item}>
                    <h4>{layout}</h4>
                    <div className={styles.screen}>{children(layout)}</div>
                </div>
            ))}
        </div>
    </div>
);

export default LayoutGrid;
