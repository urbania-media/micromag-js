/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TitleGroupedComponent from '../TitleGroupedComponent';

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
    },
};

const TitleGroupedTop = ({ grid, groups, ...otherProps }) => {
    return <TitleGroupedComponent grid={grid} groups={groups} {...otherProps} />;
};

TitleGroupedTop.propTypes = propTypes;
TitleGroupedTop.defaultProps = defaultProps;

export default TitleGroupedTop;
