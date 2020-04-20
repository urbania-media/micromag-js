/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import MapScreen from '../MapScreen';

const propTypes = {
    align: PropTypes.string,
};

const defaultProps = {
    align: 'top',
};

const MapCenter = ({ align, ...otherProps }) => {
    return <MapScreen align={align} {...otherProps} />;
};

MapCenter.propTypes = propTypes;
MapCenter.defaultProps = defaultProps;

export default MapCenter;
