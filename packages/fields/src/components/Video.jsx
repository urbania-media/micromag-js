/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MediaField from './Media';

const messages = defineMessages({
    noValue: {
        id: 'video.no_value',
        defaultMessage: 'Select a video...',
    },
});

const propTypes = {
    value: MicromagPropTypes.videoMedia,
};

const defaultProps = {
    value: null,
};

const VideoField = props => <MediaField noValueLabel={messages.noValue} {...props} type="video" />;

VideoField.propTypes = propTypes;
VideoField.defaultProps = defaultProps;
VideoField.withForm = true;

export default VideoField;
