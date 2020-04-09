/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import SlideshowScreen from '../SlideshowScreen';

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

const SlideshowCenter = ({ box, ...otherProps }) => {
    return <SlideshowScreen box={box} {...otherProps} />;
};

SlideshowCenter.propTypes = propTypes;
SlideshowCenter.defaultProps = defaultProps;

export default SlideshowCenter;
