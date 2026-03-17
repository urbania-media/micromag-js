/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { VideoMedia } from '@micromag/core';

import MediaField from './Media';

interface VideoFieldProps {
    value?: VideoMedia | null;
}

function VideoField({ value: value = null, ...props }: VideoFieldProps) {
    return (
        <MediaField
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Select a video..."
                    description="Label when no value is provided to Video field"
                />
            }
            {...props}
            value={value}
            type="video"
        />
    );
}

VideoField.withForm = true;

export default VideoField;
