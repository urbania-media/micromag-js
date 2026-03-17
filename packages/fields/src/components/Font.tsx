/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { FontMedia } from '@micromag/core';

import MediaField from './Media';

interface FontFieldProps {
    value?: FontMedia | null;
}

function FontField({ value = null, ...props }: FontFieldProps) {
    return (
        <MediaField
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Select a font file..."
                    description="Label when no value"
                />
            }
            {...props}
            value={value}
            type="font"
        />
    );
}

FontField.withForm = true;

export default FontField;
