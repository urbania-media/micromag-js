import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './styles/layout-switcher.module.scss';

const propTypes = {
    layouts: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultLayout: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    defaultLayout: null,
};

const LayoutSwitcher = ({ layouts, children, defaultLayout }) => {
    const [layout, setLayout] = useState(defaultLayout || layouts[0]);
    const onSelectChange = (e) => setLayout(e.currentTarget.value);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                Layout:
                <select value={layout} className="form-control" onChange={onSelectChange}>
                    {layouts.map((it) => (
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
LayoutSwitcher.defaultProps = defaultProps;

export default LayoutSwitcher;
