/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Component from '../GalleryScrollComponent';

const propTypes = {
    columns: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
    columns: [1, 2],
};

const GalleryScrollMixedDouble = ({ columns, ...otherProps }) => {
    return <Component columns={columns} {...otherProps} />;
};

GalleryScrollMixedDouble.propTypes = propTypes;
GalleryScrollMixedDouble.defaultProps = defaultProps;

export default GalleryScrollMixedDouble;
