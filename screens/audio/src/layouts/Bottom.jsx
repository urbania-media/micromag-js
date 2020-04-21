/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import AudioScreen from '../AudioScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'bottom',
    },
};

const AudioBottom = ({ box, ...otherProps }) => {
    return <AudioScreen box={box} {...otherProps} />;
};

AudioBottom.propTypes = propTypes;
AudioBottom.defaultProps = defaultProps;

export default AudioBottom;
