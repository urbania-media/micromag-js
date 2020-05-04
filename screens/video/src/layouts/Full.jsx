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
    defaultParams: PropTypes.shape({
        controls: PropTypes.bool,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
        spacing: 0,
    },
    fit: { size: 'cover' },
    defaultParams: {
        controls: true,
    },
};

const VideoFull = ({ box, fit, defaultParams, ...otherProps }) => {
    return <VideoScreen box={box} fit={fit} defaultParams={defaultParams} {...otherProps} />;
};

VideoFull.propTypes = propTypes;
VideoFull.defaultProps = defaultProps;

export default VideoFull;
