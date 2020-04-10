/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import GalleryScreen from '../GalleryScreen';

const propTypes = {
    grid: MicromagPropTypes.gridComponent,
};

const defaultProps = {
    grid: {
        layout: [
            {
                rows: 1,
                columns: [1, 1],
            },
            {
                rows: 1,
                columns: [1, 1],
            },
        ],
    },
};

const GalleryTwoByTwo = ({ grid, ...otherProps }) => {
    return <GalleryScreen grid={grid} {...otherProps} />;
};

GalleryTwoByTwo.propTypes = propTypes;
GalleryTwoByTwo.defaultProps = defaultProps;

export default GalleryTwoByTwo;
