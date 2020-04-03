/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import AdComponent from '../AdComponent';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const AdCenter = ({ ...otherProps }) => {
    return <AdComponent {...otherProps} />;
};

AdCenter.propTypes = propTypes;
AdCenter.defaultProps = defaultProps;

export default AdCenter;
