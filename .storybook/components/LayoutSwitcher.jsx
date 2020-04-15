import React, { useState } from 'react';

import styles from './styles/layout-switcher.module.scss';

const LayoutSwitcher = ({ layouts, children }) => {
    const [layout, setLayout] = useState(layouts[0]);
    const onSelectChange = e => setLayout(e.currentTarget.value);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                Layout:
                <select value={layout} className="form-control" onChange={onSelectChange}>
                    {layouts.map(it => (
                        <option value={it}>{it}</option>
                    ))}
                </select>
            </div>
            <div className={styles.screen}>{children(layout)}</div>
        </div>
    );
};

export default LayoutSwitcher;
