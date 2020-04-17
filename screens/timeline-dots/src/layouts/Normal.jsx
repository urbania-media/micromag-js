/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TimelineDotsScreen from '../TimelineDotsScreen';

const propTypes = {

};

const defaultProps = {

};

const TimelineNormal = (props) => {
    return <TimelineDotsScreen {...props} />;
};

TimelineNormal.propTypes = propTypes;
TimelineNormal.defaultProps = defaultProps;

export default TimelineNormal;
