/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { getFontFamilyFromFont, getStyleFromText } from '@micromag/core/utils';

import FieldWithForm from './FieldWithForm';

interface TextStyleFormProps {
    value?: { color?: string; alpha?: number };
    fields?: { id?: string }[];
    isForm?: boolean;
    isHorizontal?: boolean;
    sections?: string[];
    className?: string;
    onChange?: (...args: unknown[]) => void;
    closeForm?: (...args: unknown[]) => void;
}

function TextStyleForm({
    value = null,
    fields = [],
    sections = null,
    onChange = null,
    closeForm = null,
    isForm = false,
    ...props
}: TextStyleFormProps) {
    const textStyle = getStyleFromText(value);
    const { fontFamily = null } = textStyle || {};
    const fontLabel = fontFamily !== null ? fontFamily.replace(/['"]+/g, '') : null;

    const previewElement =
        value !== null ? (
            <strong className="d-inline-block" style={{ fontFamily: getFontFamilyFromFont(value) }}>
                Aa
            </strong>
        ) : null;

    const finalFields =
        sections !== null ? fields.filter(({ name }) => sections.indexOf(name) !== -1) : fields;

    return (
        <FieldWithForm
            isForm={isForm}
            fields={finalFields}
            value={value}
            label={fontLabel}
            onChange={onChange}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Edit style..." description="No value label" />
            }
            {...props}
        />
    );
}

TextStyleForm.withForm = true;

export default TextStyleForm;
