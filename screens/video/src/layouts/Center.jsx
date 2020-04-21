/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import VideoScreen from '../VideoScreen';

const propTypes = {
    box: MicromagPropTypes.boxElement,
    fit: PropTypes.shape({
        size: PropTypes.string,
    }),
    controls: PropTypes.bool,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    fit: { size: 'contain' },
    controls: true,
};

const VideoCenter = ({ box, controls, ...otherProps }) => {
    return <VideoScreen box={box} controls={controls} {...otherProps} />;
};

VideoCenter.propTypes = propTypes;
VideoCenter.defaultProps = defaultProps;

export default VideoCenter;
