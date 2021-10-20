/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key, react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromText, getStyleFromMargin, getStyleFromButton } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    label: PropTypes.string,
    labelOutside: PropTypes.bool,
    labelClassName: PropTypes.string,
    textStyle: MicromagPropTypes.textStyle,
    buttonStyle: MicromagPropTypes.buttonStyle,
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
            ...getStyleFromButton(buttonStyle),
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
        <textarea
            {...elementProps}
            tabIndex={focusable ? '0' : '-1'}
        />
    ) : (
        <input
            {...elementProps}
            type="text"
            tabIndex={focusable ? '0' : '-1'}
        />
    );

    return !labelOutside ? (
        element
    ) : (
        <label {...containerProps}>
            <div className={labelClassName} style={labelStyle}>
                {label}
            </div>
            {element}
        </label>
    );
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
