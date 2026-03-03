/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { ClosedCaptionsMedia } from '@micromag/core';
import MediaField from './Media';

interface ClosedCaptionFieldProps {
    value?: ClosedCaptionsMedia;
}

function ClosedCaptionField(
    {
        value: value = null,
        ...props
    },
) {
    return (
        <MediaField
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Select a closed captions file..."
                    description="Label when no value is provided to Closed captions field"
                />
            }
            {...props}
            type="subtitle"
        />
    );
}

ClosedCaptionField.withForm = true;

export default ClosedCaptionField;
