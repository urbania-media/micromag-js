/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import AdComponent from '../AdComponent';

const propTypes = {
    //
};

const defaultProps = {
    //
};

const DefaultAd = ({ ...otherProps }) => {
    return <AdComponent {...otherProps} />;
};

DefaultAd.propTypes = propTypes;
DefaultAd.defaultProps = defaultProps;

export default DefaultAd;
