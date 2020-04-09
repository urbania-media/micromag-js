/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TitleScreen from '../TitleScreen';

const propTypes = {
    groups: PropTypes.arrayOf(PropTypes.array),
    grid: MicromagPropTypes.gridComponent,
};

const defaultProps = {
    groups: [['title', 'subtitle'], ['description']],
    grid: {
        layout: [
            {
                rows: 3,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
        ],
    },
};

const ThreeOneSplit = ({ grid, groups, ...otherProps }) => {
    return <TitleScreen grid={grid} groups={groups} {...otherProps} />;
};

ThreeOneSplit.propTypes = propTypes;
ThreeOneSplit.defaultProps = defaultProps;

export default ThreeOneSplit;
