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
        loop: PropTypes.bool,
        autoPlay: PropTypes.bool,
        muted: PropTypes.bool,
        controls: PropTypes.bool,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
    fit: { size: 'cover' },
    defaultParams: {
        loop: true,
        autoPlay: true,
        muted: true,
        controls: false,
    },
};

const FullLoop = ({ ...props }) => {
    return <VideoScreen {...props} />;
};

FullLoop.propTypes = propTypes;
FullLoop.defaultProps = defaultProps;

export default FullLoop;
