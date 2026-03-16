/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { ImageMedia } from '@micromag/core';

import MediaField from './Media';

interface ImageFieldProps {
    value?: ImageMedia | null;
}

function ImageField({ value: value = null, ...props }: ImageFieldProps) {
    return (
        <MediaField
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Select an image..."
                    description="Label when no value is provided to Image field"
                />
            }
            {...props}
            value={value}
            type="image"
        />
    );
}

ImageField.withForm = true;

export default ImageField;
