/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import AdScreen from '../AdScreen';

const propTypes = {
    fullScreen: PropTypes.bool,
    align: MicromagPropTypes.stackAlign,
};

const defaultProps = {
    fullScreen: true,
    align: {
        verticalAlign: 'center',
    },
};

const AdFull = ({ ...otherProps }) => {
    return <AdScreen {...otherProps} />;
};

AdFull.propTypes = propTypes;
AdFull.defaultProps = defaultProps;

export default AdFull;
