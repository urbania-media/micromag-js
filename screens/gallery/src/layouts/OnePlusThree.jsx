/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Component from '../GalleryComponent';

const propTypes = {
    grid: MicromagPropTypes.boxComponent,
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
    return <Component grid={grid} {...otherProps} />;
};

GalleryOnePlusThree.propTypes = propTypes;
GalleryOnePlusThree.defaultProps = defaultProps;

export default GalleryOnePlusThree;
