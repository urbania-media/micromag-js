import React from 'react';
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';

import styles from './styles/layout-grid.module.scss';

const propTypes = {
    layouts: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

const LayoutGrid = ({ layouts, children }) => (
    <div className={styles.container}>
        <div className={styles.items}>
            {layouts.map((layout) => (
                <div key={`layout-${layout}`} className={styles.item}>
                    <h4>{isObject(layout) ? layout.name : layout}</h4>
                    <div className={styles.screen}>{children(layout)}</div>
                </div>
            ))}
        </div>
    </div>
);

LayoutGrid.propTypes = propTypes;
LayoutGrid.defaultProps = defaultProps;

export default LayoutGrid;
