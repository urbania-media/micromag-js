/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MediaField from './Media';

const propTypes = {
    value: MicromagPropTypes.audioMedia,
};

const defaultProps = {
    value: null,
};

const AudioField = (props) => (
    <MediaField
        noValueLabel={
            <FormattedMessage
                defaultMessage="Select an audio file..."
                description="Label when no value is provided to Audio field"
            />
        }
        {...props}
        type="audio"
    />
);

AudioField.propTypes = propTypes;
AudioField.defaultProps = defaultProps;
AudioField.withForm = true;

export default AudioField;
