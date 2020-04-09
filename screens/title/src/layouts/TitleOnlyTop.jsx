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
    groups: [['title']],
    grid: {
        layout: [
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
        ],
    },
};

const TitleOneOneSplit = ({ grid, groups, ...otherProps }) => {
    return <TitleScreen grid={grid} groups={groups} {...otherProps} />;
};

TitleOneOneSplit.propTypes = propTypes;
TitleOneOneSplit.defaultProps = defaultProps;

export default TitleOneOneSplit;
