/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MediaField from './Media';

const messages = defineMessages({
    noValue: {
        id: 'audio.no_value',
        defaultMessage: 'Select an audio file...',
    },
});

const propTypes = {
    value: MicromagPropTypes.audio,
};

const defaultProps = {
    value: null,
};

const AudioField = props => <MediaField noValueLabel={messages.noValue} {...props} type="audio" />;

AudioField.propTypes = propTypes;
AudioField.defaultProps = defaultProps;
AudioField.withForm = true;

export default AudioField;
