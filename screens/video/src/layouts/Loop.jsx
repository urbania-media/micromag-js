/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import VideoScreen from '../VideoScreen';

const propTypes = {
    box: MicromagPropTypes.boxComponent,
    fit: PropTypes.shape({
        size: PropTypes.string,
    }),
    loop: PropTypes.bool,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    playsInline: PropTypes.bool,
    controls: PropTypes.bool,
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    fit: { size: 'contain' },
    loop: true,
    autoPlay: true,
    playsInline: true,
    muted: true,
    controls: false,
};

const VideoLoop = ({ ...props }) => {
    return <VideoScreen {...props} />;
};

VideoLoop.propTypes = propTypes;
VideoLoop.defaultProps = defaultProps;

export default VideoLoop;
