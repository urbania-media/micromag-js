/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import MapScreen from '../MapScreen';

const propTypes = {
    box: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const MapCenter = ({ box, ...otherProps }) => {
    return <MapScreen box={box} {...otherProps} />;
};

MapCenter.propTypes = propTypes;
MapCenter.defaultProps = defaultProps;

export default MapCenter;
