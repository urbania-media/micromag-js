/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable react/no-array-index-key, react/no-danger, react/button-has-type */
import classNames from 'classnames';
import React from 'react';

import type { BoxStyle, TextStyle } from '@micromag/core';
import { Button as CoreButton } from '@micromag/core/components';
import { getStyleFromBox, getStyleFromText } from '@micromag/core/utils';

import styles from './styles.module.css';

interface ButtonProps {
    textStyle?: TextStyle | null;
    buttonStyle?: BoxStyle | null;
    type?: 'button' | 'submit';
    disabled?: boolean;
    focusable?: boolean;
    inline?: boolean;
    onClick?: ((...args: unknown[]) => void) | null;
    children?: React.ReactNode | null;
    className?: string | null;
    withoutExternalBorder?: boolean;
    refButton?: ((...args: unknown[]) => void | { current?: unknown }) | null;
    style?: Record<string, unknown> | null;
}

function Button({
    textStyle = null,
    buttonStyle = null,
    type = 'button',
    disabled = false,
    focusable = true,
    inline = false,
    onClick = null,
    children = null,
    className = null,
    withoutExternalBorder = true,
    refButton = null,
    style = null,
    ...buttonProps
}: ButtonProps) {
    let finalStyles = style;

    // eslint-disable-next-line no-unused-vars
    const { body = null, ...otherProps } = buttonProps || {};

    if (textStyle !== null) {
        finalStyles = {
            ...finalStyles,
            ...getStyleFromText(textStyle),
        };
    }

    if (buttonStyle !== null) {
        finalStyles = {
            ...finalStyles,
            ...getStyleFromBox(buttonStyle),
            display: withoutExternalBorder && inline ? 'inline-block' : null,
        };
    }

    if (!withoutExternalBorder) {
        const { borderWidth = null } = finalStyles || {};
        const margin = borderWidth !== null && borderWidth > 0 ? '-1px' : null;
        finalStyles = {
            ...finalStyles,
            display: inline ? 'inline-block' : null,
            ...(margin !== null ? { margin } : null),
        };
    }

    return (
        <CoreButton
            className={classNames([
                styles.container,
                className,
            ])}
            disabled={disabled}
            style={finalStyles}
            onClick={onClick}
            refButton={refButton}
            type={type}
            focusable={focusable}
            withoutBootstrapStyles
            {...otherProps}
        >
            {children}
        </CoreButton>
    );
}

export default Button;
