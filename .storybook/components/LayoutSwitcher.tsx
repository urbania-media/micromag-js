import React, { useState } from 'react';

import styles from './styles/layout-switcher.module.css';

interface LayoutSwitcherProps {
    layouts: string[];
    defaultLayout?: string;
    children: React.ReactNode | ((...args: unknown[]) => React.ReactNode);
}

function LayoutSwitcher({ layouts, children, defaultLayout = null }: LayoutSwitcherProps) {
    const firstLayout = layouts !== null && layouts.length > 0 ? layouts[0] : null;
    const [layout, setLayout] = useState(defaultLayout || firstLayout);
    const onSelectChange = (e) => setLayout(e.currentTarget.value);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                Layout:
                <select value={layout} className="form-control" onChange={onSelectChange}>
                    {(layouts || []).map((it) => (
                        <option key={`option-${it}`} value={it}>
                            {it}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.screen}>{children(layout)}</div>
        </div>
    );
}

export default LayoutSwitcher;
