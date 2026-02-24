/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import MediaField from './Media';

const propTypes = {
    value: MicromagPropTypes.videoMedia,
};

const VideoField = (
    {
        value: value = null,
        ...props
    },
) => (<MediaField
    noValueLabel={
        <FormattedMessage
            defaultMessage="Select a video..."
            description="Label when no value is provided to Video field"
        />
    }
    {...props}
    type="video"
/>);

VideoField.propTypes = propTypes;
VideoField.withForm = true;

export default VideoField;
