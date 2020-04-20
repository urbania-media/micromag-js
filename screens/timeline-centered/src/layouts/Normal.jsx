/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';


import TimelineCenteredScreen from '../TimelineCenteredScreen';

const propTypes = {
    //
};

const defaultProps = {
    //
};

const TimelineNormal = props => {
    return <TimelineCenteredScreen {...props} />;
};

TimelineNormal.propTypes = propTypes;
TimelineNormal.defaultProps = defaultProps;

export default TimelineNormal;
