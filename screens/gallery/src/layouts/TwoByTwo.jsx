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
    return <Component grid={grid} {...otherProps} />;
};

GalleryTwoByTwo.propTypes = propTypes;
GalleryTwoByTwo.defaultProps = defaultProps;

export default GalleryTwoByTwo;
