/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TitleComponent from '../TitleComponent';

const propTypes = {
    groups: PropTypes.arrayOf(PropTypes.array),
    grid: MicromagPropTypes.gridComponent,
};

const defaultProps = {
    groups: [['title', 'subtitle'], ['description']],
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
        reverse: true,
    },
};

const TitleOneOneSplit = ({ grid, groups, ...otherProps }) => {
    return <TitleComponent grid={grid} groups={groups} {...otherProps} />;
};

TitleOneOneSplit.propTypes = propTypes;
TitleOneOneSplit.defaultProps = defaultProps;

export default TitleOneOneSplit;
