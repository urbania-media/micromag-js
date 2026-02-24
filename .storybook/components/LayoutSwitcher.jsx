import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles/layout-switcher.module.css';

const propTypes = {
    layouts: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultLayout: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

const LayoutSwitcher = ({ layouts, children, defaultLayout = null }) => {
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
};

LayoutSwitcher.propTypes = propTypes;

export default LayoutSwitcher;
