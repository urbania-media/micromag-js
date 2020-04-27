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
        axisAlign: 'top',
    },
};

const AdBottom = ({ ...otherProps }) => {
    return <AdSlotScreen {...otherProps} />;
};

AdBottom.propTypes = propTypes;
AdBottom.defaultProps = defaultProps;

export default AdBottom;
