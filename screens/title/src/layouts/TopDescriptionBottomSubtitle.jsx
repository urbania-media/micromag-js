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
    groups: [['description'], ['title'], ['subtitle']],
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
            {
                rows: 1,
                columns: [1],
            },
        ],
    },
};

const TitleTopDescriptionBottomSubtitle = ({ grid, groups, ...otherProps }) => {
    return <TitleComponent grid={grid} groups={groups} {...otherProps} />;
};

TitleTopDescriptionBottomSubtitle.propTypes = propTypes;
TitleTopDescriptionBottomSubtitle.defaultProps = defaultProps;

export default TitleTopDescriptionBottomSubtitle;
