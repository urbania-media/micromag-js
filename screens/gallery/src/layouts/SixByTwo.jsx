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
                columns: [1, 1, 1],
            },
            {
                rows: 2,
                columns: [1, 1, 1],
            },
        ],
    },
};

const GallerySixByTwo = ({ grid, ...otherProps }) => {
    return <GalleryScreen grid={grid} {...otherProps} />;
};

GallerySixByTwo.propTypes = propTypes;
GallerySixByTwo.defaultProps = defaultProps;

export default GallerySixByTwo;
