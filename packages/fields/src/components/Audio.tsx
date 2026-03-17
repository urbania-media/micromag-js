/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { AudioMedia } from '@micromag/core';

import MediaField from './Media';

interface AudioFieldProps {
    value?: AudioMedia | null;
}

function AudioField({ value: value = null, ...props }: AudioFieldProps) {
    return (
        <MediaField
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Select an audio file..."
                    description="Label when no value is provided to Audio field"
                />
            }
            {...props}
            value={value}
            type="audio"
        />
    );
}

AudioField.withForm = true;

export default AudioField;
