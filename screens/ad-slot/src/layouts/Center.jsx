/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import AdSlotScreen from '../AdSlotScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const AdCenter = ({ ...otherProps }) => {
    return <AdSlotScreen {...otherProps} />;
};

AdCenter.propTypes = propTypes;
AdCenter.defaultProps = defaultProps;

export default AdCenter;
