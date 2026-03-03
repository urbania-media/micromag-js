/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import type { FormField, Label, Media, MediaType } from '@micromag/core';
import { getFileName } from '@micromag/core/utils';
import { useFieldContext } from '@micromag/core/contexts';

import FieldWithForm from './FieldWithForm';

interface MessageFieldProps {
    type?: MediaType | MediaType[];
    value?: Media;
    fields?: FormField[];
    noValueLabel?: Label;
    withoutThumbnail?: boolean;
    onChange?: (...args: unknown[]) => void;
    closeForm?: (...args: unknown[]) => void;
}

const MessageField = ({
    type = null,
    value = null,
    fields = null,
    noValueLabel = (<FormattedMessage
        defaultMessage="Edit content..."
        description="Label when no value is provided to Field with form"
    />),
    withoutThumbnail = false,
    onChange = null,
    closeForm = null,
    ...props
}) => {
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
};

MessageField.withForm = true;

export default MessageField;
