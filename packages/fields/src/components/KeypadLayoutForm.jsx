/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { getStyleFromText, getStyleFromBox } from '@micromag/core/utils';
import { PlaceholderText, PlaceholderImage } from '@micromag/core/components';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/keypad-layout-form.module.scss';

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

const KeypadLayoutForm = ({ value, onChange, closeForm, ...props }) => {
    // const textStyle = getStyleFromText(value);
    // const { fontFamily = null } = textStyle || {};
    // const fontLabel = fontFamily !== null ? fontFamily.replace(/['"]+/g, '') : null;

    // const previewElement =
    //     value !== null ? (
    //         <strong className="d-inline-block" style={{ fontFamily: getFontFamilyFromFont(value) }}>
    //             Aa
    //         </strong>
    //     ) : null;

    const { buttonStyles = null } = value || {};
    const { buttonLayout = null, textStyle = null, boxStyle = null } = buttonStyles || {};

    console.log({ value });

    const preview = (
        <div
            className={classNames([
                styles.preview,
                {
                    [styles.layoutLabelBottom]: buttonLayout === 'label-bottom',
                    [styles.layoutLabelTop]: buttonLayout === 'label-top',
                    [styles.layoutNoLabel]: buttonLayout === 'no-label',
                    [styles.layoutLabelOver]: buttonLayout === 'label-over',
                    // [styles.isEmpty]: isEmpty,
                    // [styles.isPopupEmpty]: isPopupEmpty,
                },
            ])}
            style={{
                ...getStyleFromBox(boxStyle),
                ...getStyleFromText(textStyle),
            }}
        >
            <PlaceholderImage className={styles.buttonVisual} />
            <PlaceholderText lines={2} className={styles.buttonLabel} />
        </div>
    );

    return (
        <FieldWithForm
            isForm
            value={value}
            label={<FormattedMessage defaultMessage="Edit" description="Field label" />}
            onChange={onChange}
            thumbnail={preview}
            noValueLabel={<FormattedMessage defaultMessage="Edit" description="Field label" />}
            {...props}
        />
    );
};

KeypadLayoutForm.propTypes = propTypes;
KeypadLayoutForm.defaultProps = defaultProps;
KeypadLayoutForm.withForm = true;

export default KeypadLayoutForm;
