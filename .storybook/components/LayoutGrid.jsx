/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';

import styles from './styles/layout-grid.module.scss';

const propTypes = {
    layouts: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ name: PropTypes.string })]),
    ).isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

const defaultProps = {};

const LayoutGrid = ({ layouts, children }) => (
    <div className={styles.container}>
        <div className={styles.items}>
            {layouts.map((layout, layoutIndex) => (
                <div key={`layout-${layoutIndex}`} className={styles.item}>
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
