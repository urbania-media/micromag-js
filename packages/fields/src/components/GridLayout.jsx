/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@micromag/element-grid';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getGridLayoutName } from '@micromag/core/utils';

import Radios from './Radios';

import styles from '../styles/grid-layout.module.scss';

const propTypes = {
    grids: PropTypes.arrayOf(MicromagPropTypes.gridLayout),
    value: PropTypes.arrayOf(
        PropTypes.shape({
            rows: PropTypes.number,
            columns: PropTypes.arrayOf(PropTypes.number),
        }),
    ),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    grids: [],
    value: null,
    className: null,
    onChange: null,
};

const GridLayout = ({ grids, value, className, onChange }) => (
    <Radios
        options={grids.map(layout => ({
            value: layout,
            label: <Grid layout={layout} className={styles.grid} columnClassName={styles.column} />,
        }))}
        value={
            value !== null
                ? grids.find(it => getGridLayoutName(it) === getGridLayoutName(value)) || null
                : null
        }
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        buttonClassName={styles.button}
        onChange={onChange}
    />
);

GridLayout.propTypes = propTypes;
GridLayout.defaultProps = defaultProps;

export default GridLayout;
