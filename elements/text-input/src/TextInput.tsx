/* eslint-disable jsx-a11y/label-has-associated-control, react/no-array-index-key, react/no-danger, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useId } from 'react';
import { Helmet } from 'react-helmet';

import type { BoxStyle, Margin, TextStyle } from '@micromag/core';
import { usePlaceholderStyle } from '@micromag/core/hooks';
import { getStyleFromBox, getStyleFromMargin, getStyleFromText } from '@micromag/core/utils';

import styles from './styles.module.css';

interface TextInputProps {
    label?: string | null;
    labelOutside?: boolean;
    labelClassName?: string | null;
    textStyle?: TextStyle | null;
    placeholderTextStyle?: TextStyle | null;
    buttonStyle?: BoxStyle | null;
    labelOutsideStyle?: TextStyle | null;
    margin?: Margin | null;
    multiline?: boolean;
    value?: string;
    onChange?: ((...args: unknown[]) => void) | null;
    onFocus?: ((...args: unknown[]) => void) | null;
    onBlur?: ((...args: unknown[]) => void) | null;
    required?: boolean;
    disabled?: boolean;
    focusable?: boolean;
    className?: string | null;
}

function TextInput({
    label = null,
    labelOutside = false,
    labelClassName = null,
    textStyle = null,
    placeholderTextStyle = null,
    buttonStyle = null,
    labelOutsideStyle = null,
    margin = null,
    multiline = false,
    value = '',
    onChange = null,
    onFocus = null,
    onBlur = null,
    required = false,
    disabled = false,
    focusable = true,
    className = null,
}: TextInputProps) {
    let containerStyle = {};
    let labelStyle = {};
    let elementStyle = {};
    let placeholderStyle = {};

    const id = useId();

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

    const element = multiline ? (
        <textarea {...elementProps} tabIndex={focusable ? '0' : '-1'} />
    ) : (
        <input {...elementProps} type="text" tabIndex={focusable ? '0' : '-1'} />
    );

    const placeholderStyles = usePlaceholderStyle(styles.element, placeholderStyle);
    const placeholderStyleElement = (
        <Helmet>
            <style href={`inputstyle-${id}`} precedence="medium">
                {placeholderStyles}
            </style>
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
}

export default TextInput;
