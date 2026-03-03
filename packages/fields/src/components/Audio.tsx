/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import type { AudioMedia } from '@micromag/core';
import MediaField from './Media';

interface AudioFieldProps {
    value?: AudioMedia;
}

function AudioField(
    {
        value: value = null,
        ...props
    },
) {
    return (
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
}

AudioField.withForm = true;

export default AudioField;
