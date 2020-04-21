/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import PanoramaScreen from '../PanoramaScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const PanoramaCenter = ({ ...otherProps }) => {
    return <PanoramaScreen {...otherProps} />;
};

PanoramaCenter.propTypes = propTypes;
PanoramaCenter.defaultProps = defaultProps;

export default PanoramaCenter;
