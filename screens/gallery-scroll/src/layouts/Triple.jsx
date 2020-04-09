/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import GalleryScrollScreen from '../GalleryScrollScreen';

const propTypes = {
    columns: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {
    columns: [3],
};

const GalleryScrollTriple = ({ columns, ...otherProps }) => {
    return <GalleryScrollScreen columns={columns} {...otherProps} />;
};

GalleryScrollTriple.propTypes = propTypes;
GalleryScrollTriple.defaultProps = defaultProps;

export default GalleryScrollTriple;
