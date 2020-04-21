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
                rows: 2,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1, 1, 1],
            },
        ],
    },
};

const GalleryOnePlusThree = ({ grid, ...otherProps }) => {
    return <GalleryScreen grid={grid} {...otherProps} />;
};

GalleryOnePlusThree.propTypes = propTypes;
GalleryOnePlusThree.defaultProps = defaultProps;

export default GalleryOnePlusThree;
