/* eslint-disable jsx-a11y/label-has-associated-control, react/no-array-index-key, react/no-danger, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { usePlaceholderStyle } from '@micromag/core/hooks';
import { getStyleFromBox, getStyleFromMargin, getStyleFromText } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    label: PropTypes.string,
    labelOutside: PropTypes.bool,
    labelClassName: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    placeholderTextStyle: MicromagPropTypes.textStyle,
    buttonStyle: MicromagPropTypes.boxStyle,
    labelOutsideStyle: MicromagPropTypes.textStyle,
    margin: MicromagPropTypes.margin,
    multiline: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    focusable: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    label: null,
    labelOutside: false,
    labelClassName: null,
    textStyle: null,
    placeholderTextStyle: null,
    buttonStyle: null,
    labelOutsideStyle: null,
    margin: null,
    multiline: false,
    value: '',
    onChange: null,
    onFocus: null,
    onBlur: null,
    required: false,
    disabled: false,
    focusable: true,
    className: null,
};

const TextInput = ({
    label,
    labelOutside,
    labelClassName,
    textStyle,
    placeholderTextStyle,
    buttonStyle,
    labelOutsideStyle,
    margin,
    multiline,
    value,
    onChange,
    onFocus,
    onBlur,
    required,
    disabled,
    focusable,
    className,
}) => {
    let containerStyle = {};
    let labelStyle = {};
    let elementStyle = {};
    let placeholderStyle = {};

    if (margin !== null) {
        containerStyle = {
            ...containerStyle,
            ...getStyleFromMargin(margin),
        };
    }

    if (labelOutsideStyle !== null) {
        labelStyle = {
            ...labelStyle,
            ...getStyleFromText(labelOutsideStyle),
        };
    }

    if (textStyle !== null) {
        elementStyle = {
            ...elementStyle,
            ...getStyleFromText(textStyle),
        };
    }

    if (buttonStyle !== null) {
        elementStyle = {
            ...elementStyle,
            ...getStyleFromBox(buttonStyle),
        };
    }

    if (placeholderTextStyle !== null) {
        placeholderStyle = {
            ...placeholderStyle,
            ...getStyleFromText(placeholderTextStyle),
        };
    }

    const containerProps = {
        className: classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.element]: !labelOutside,
            },
        ]),
        style: containerStyle,
    };

    const elementProps = {
        className: styles.element,
        ...(!labelOutside ? containerProps : null),
        style: elementStyle,
        placeholder: !labelOutside ? label : undefined,
        value,
        onChange,
        onFocus,
        onBlur,
        required,
        disabled,
    };

    // console.log('elementStyle', elementStyle);

    const element = multiline ? (
        <textarea {...elementProps} tabIndex={focusable ? '0' : '-1'} />
    ) : (
        <input {...elementProps} type="text" tabIndex={focusable ? '0' : '-1'} />
    );

    const placeholderStyles = usePlaceholderStyle(styles.element, placeholderStyle);
    const placeholderStyleElement = (
        <Helmet>
            <style>{placeholderStyles}</style>
        </Helmet>
    );

    return !labelOutside ? (
        <>
            {element}
            {placeholderStyleElement}
        </>
    ) : (
        <label {...containerProps}>
            <div className={labelClassName} style={labelStyle}>
                {label}
            </div>
            {element}
            {placeholderStyleElement}
        </label>
    );
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
