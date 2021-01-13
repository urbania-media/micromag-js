/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getStyleFromText } from '@micromag/core/utils';

import FieldWithForm from './FieldWithForm';
import Fields from './Fields';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.shape({
        textStyle: PropTypes.shape({
            fontFamily: PropTypes.string,
        }),
    }),
    fields: [],
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    fields: [],
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
};

const FontStyleField = ({ name, value, fields, onChange, ...props }) => {
    const label = useMemo(() => {
        const textStyle = value && value.textStyle ? value.textStyle : null;
        const style = textStyle ? getStyleFromText(textStyle) : null;
        return style !== null ? (
            <span style={{ ...style }}>
                {style.fontFamily ? (
                    style.fontFamily
                ) : (
                    <FormattedMessage defaultMessage="Text style" description="Empty label" />
                )}
            </span>
        ) : null;
    }, [value]);

    return (
        <FieldWithForm
            value={value}
            onChange={onChange}
            label={label}
            noValueLabel={
                <FormattedMessage defaultMessage="Select a font..." description="No value label" />
            }
            {...props}
        >
            <div className="p-2 bg-light text-dark">
                <Fields {...props} name={name} value={value} fields={fields} onChange={onChange} />
            </div>
        </FieldWithForm>
    );
};

FontStyleField.propTypes = propTypes;
FontStyleField.defaultProps = defaultProps;
FontStyleField.withForm = true;

export default FontStyleField;
