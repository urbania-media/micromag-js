import React, { useState } from 'react';

import styles from './styles/layout-switcher.module.scss';

const LayoutSwitcher = ({ layouts, children, defaultLayout = null } = {}) => {
    const [layout, setLayout] = useState(defaultLayout || layouts[0]);
    const onSelectChange = e => setLayout(e.currentTarget.value);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                Layout:
                <select value={layout} className="form-control" onChange={onSelectChange}>
                    {layouts.map(it => (
                        <option key={`option-${it}`} value={it}>
                            {it}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.screen}>{children(layout)}</div>
        </div>
    );
};

export default LayoutSwitcher;
