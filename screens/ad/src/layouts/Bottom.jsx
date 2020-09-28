/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import AdScreen from '../AdScreen';

const propTypes = {
    align: MicromagPropTypes.stackAlign,
};

const defaultProps = {
    align: {
        verticalAlign: 'bottom',
    },
};

const AdBottom = ({ ...otherProps }) => {
    return <AdScreen {...otherProps} />;
};

AdBottom.propTypes = propTypes;
AdBottom.defaultProps = defaultProps;

export default AdBottom;
