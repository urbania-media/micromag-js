/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { getStyleFromText, getFontFamilyFromFont } from '@micromag/core/utils';

import FieldWithForm from './FieldWithForm';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    fields: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    sections: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    fields: [],
    isForm: false,
    isHorizontal: false,
    sections: null,
    className: null,
    onChange: null,
    closeForm: null,
};

const TextStyleForm = ({ value, fields, sections, onChange, closeForm, ...props }) => {
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
            isForm
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
};

TextStyleForm.propTypes = propTypes;
TextStyleForm.defaultProps = defaultProps;
TextStyleForm.withForm = true;

export default TextStyleForm;
