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
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    fit: { size: 'cover' },
};

const VideoFull = ({ box, fit, ...otherProps }) => {
    return <VideoScreen box={box} fit={fit} {...otherProps} />;
};

VideoFull.propTypes = propTypes;
VideoFull.defaultProps = defaultProps;

export default VideoFull;
