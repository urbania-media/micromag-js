/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

// import { FormattedMessage } from 'react-intl';
import type { VideoMedia } from '@micromag/core';

import MediaField from './Media';

const visualTypes = ['video', 'image'];

interface VisualFieldProps {
    value?: VideoMedia | null;
}

function VisualField({ value: value = null, ...props }: VisualFieldProps) {
    return (
        <MediaField
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Select an image..."
                    description="Label when no value is provided to Visual field"
                />
            }
            {...props}
            type={visualTypes}
        />
    );
}

VisualField.withForm = true;

export default VisualField;
