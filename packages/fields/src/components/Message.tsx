/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { FormField, Label, Media, MediaType } from '@micromag/core';
import { useFieldContext } from '@micromag/core/contexts';
import { getFileName } from '@micromag/core/utils';

import FieldWithForm from './FieldWithForm';

interface MessageFieldProps {
    type?: MediaType | MediaType[] | null;
    value?: Media | null;
    fields?: FormField[] | null;
    noValueLabel?: Label;
    withoutThumbnail?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
    closeForm?: ((...args: unknown[]) => void) | null;
}

function MessageField({
    type = null,
    value = null,
    fields = null,

    noValueLabel = (
        <FormattedMessage
            defaultMessage="Edit content..."
            description="Label when no value is provided to Field with form"
        />
    ),

    withoutThumbnail = false,
    onChange = null,
    closeForm = null,
    ...props
}: MessageFieldProps) {
    const context = useFieldContext();
    const { options } = context || {};

    const label = value !== null ? value.name || getFileName(value.url) || null : null;

    return (
        <FieldWithForm
            value={value}
            onChange={onChange}
            noValueLabel={noValueLabel}
            label={label}
            thumbnailPath="thumbnail_url"
            fields={fields.map((field) =>
                field.name === 'speaker' ? { ...field, options } : field,
            )}
            {...props}
        />
    );
}

MessageField.withForm = true;

export default MessageField;
