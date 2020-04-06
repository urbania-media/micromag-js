/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import AudioComponent from '../AudioComponent';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const AudioCenter = ({ box, ...otherProps }) => {
    return <AudioComponent box={box} {...otherProps} />;
};

AudioCenter.propTypes = propTypes;
AudioCenter.defaultProps = defaultProps;

export default AudioCenter;
