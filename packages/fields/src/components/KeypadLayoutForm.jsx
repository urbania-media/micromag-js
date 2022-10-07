/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
// import { getStyleFromText, getFontFamilyFromFont } from '@micromag/core/utils';
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

    console.log({value});

    return (
        <FieldWithForm
            isForm
            value={value}
            label={
                <FormattedMessage defaultMessage="Edit" description="Field label" />
            }
            onChange={onChange}
            thumbnail={<div>yo!</div>}
            noValueLabel={
                <FormattedMessage defaultMessage="Edit" description="Field label" />
            }
            {...props}
        />
    );
};

KeypadLayoutForm.propTypes = propTypes;
KeypadLayoutForm.defaultProps = defaultProps;
KeypadLayoutForm.withForm = true;

export default KeypadLayoutForm;
