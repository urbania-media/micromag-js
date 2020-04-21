/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import GalleryScreen from '../GalleryScreen';

const propTypes = {
    grid: MicromagPropTypes.gridElement,
};

const defaultProps = {
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

const GalleryTwoHigh = ({ grid, ...otherProps }) => {
    return <GalleryScreen grid={grid} {...otherProps} />;
};

GalleryTwoHigh.propTypes = propTypes;
GalleryTwoHigh.defaultProps = defaultProps;

export default GalleryTwoHigh;
