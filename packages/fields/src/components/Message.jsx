/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getFileName } from '@micromag/core/utils';
import { useFieldContext } from '@micromag/core/contexts';

import FieldWithForm from './FieldWithForm';

const propTypes = {
    type: PropTypes.oneOfType([
        MicromagPropTypes.mediaTypes,
        PropTypes.arrayOf(MicromagPropTypes.mediaTypes),
    ]),
    value: MicromagPropTypes.media,
    fields: MicromagPropTypes.formFields,
    noValueLabel: MicromagPropTypes.label,
    withoutThumbnail: PropTypes.bool,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    type: null,
    value: null,
    fields: null,
    noValueLabel: (
        <FormattedMessage
            defaultMessage="Click to edit..."
            description="Label when no value is provided to Field with form"
        />
    ),
    withoutThumbnail: false,
    onChange: null,
    closeForm: null,
};

const MessageField = ({
    type,
    value,
    fields,
    noValueLabel,
    withoutThumbnail,
    onChange,
    closeForm,
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

MessageField.propTypes = propTypes;
MessageField.defaultProps = defaultProps;
MessageField.withForm = true;

export default MessageField;
