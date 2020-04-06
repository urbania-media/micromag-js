/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Component from '../GalleryComponent';

const propTypes = {
    grid: MicromagPropTypes.gridComponent,
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
                columns: [1, 1],
            },
        ],
    },
};

const GalleryOnePlusTwo = ({ grid, ...otherProps }) => {
    return <Component grid={grid} {...otherProps} />;
};

GalleryOnePlusTwo.propTypes = propTypes;
GalleryOnePlusTwo.defaultProps = defaultProps;

export default GalleryOnePlusTwo;
