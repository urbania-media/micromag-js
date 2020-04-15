/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import MapScreen from '../MapScreen';

const propTypes = {
    align: PropTypes.string,
};

const defaultProps = {
    align: 'bottom',
};

const MapBottom = ({ align, ...otherProps }) => {
    return <MapScreen align={align} {...otherProps} />;
};

MapBottom.propTypes = propTypes;
MapBottom.defaultProps = defaultProps;

export default MapBottom;
