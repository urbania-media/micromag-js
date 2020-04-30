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
    videoParams: PropTypes.shape({
        loop: PropTypes.bool,
        autoPlay: PropTypes.bool,
        muted: PropTypes.bool,
        controls: PropTypes.bool,
        // playsInline: PropTypes.bool,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    fit: { size: 'contain' },
    videoParams: {
        loop: true,
        autoPlay: true,
        muted: true,
        controls: false,
        // playsInline: true,
    },
};

const VideoLoop = ({ ...props }) => {
    return <VideoScreen {...props} />;
};

VideoLoop.propTypes = propTypes;
VideoLoop.defaultProps = defaultProps;

export default VideoLoop;
