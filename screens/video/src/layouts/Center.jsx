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
    },
    fit: { size: 'contain' },
    defaultParams: {
        controls: true,
    },
};

const VideoCenter = ({ box, defaultParams, ...otherProps }) => {
    return <VideoScreen box={box} defaultParams={defaultParams} {...otherProps} />;
};

VideoCenter.propTypes = propTypes;
VideoCenter.defaultProps = defaultProps;

export default VideoCenter;
