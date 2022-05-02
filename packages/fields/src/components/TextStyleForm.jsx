/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getStyleFromText, getFontFamilyFromFont } from '@micromag/core/utils';
import styles from '../styles/text-style.module.scss';
import FieldWithForm from './FieldWithForm';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
    closeForm: null,
};

const TextStyleForm = ({ value, onChange, closeForm, ...props }) => {
    const textStyle = getStyleFromText(value);
    const { fontFamily = null } = textStyle || {};
    const fontLabel = fontFamily !== null ? fontFamily.replace(/['"]+/g, '') : null;
    const finalFontLabel =
        fontLabel !== null && fontLabel.length > 12 ? fontLabel.substring(0, 12) : null;

    const previewElement =
        value !== null ? (
            <span className={styles.preview}>
                <span
                    className={styles.text}
                    style={{
                        ...textStyle,
                        padding: 0,
                        fontSize: '16px',
                        lineHeight: 1,
                    }}
                >
                    {finalFontLabel !== null ? (
                        finalFontLabel
                    ) : (
                        <FormattedMessage
                            defaultMessage="Text style"
                            description="Preview value label"
                        />
                    )}
                </span>
                {/* <strong
                    className="d-inline-block"
                    style={{ fontFamily: getFontFamilyFromFont(value) }}
                >
                    Aa
                </strong> */}
            </span>
        ) : null;
    return (
        <FieldWithForm
            isForm
            value={value}
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
