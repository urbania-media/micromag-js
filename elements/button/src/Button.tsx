import classNames from 'classnames';
import React, { ForwardedRef, MouseEventHandler } from 'react';

import type { BoxStyle, TextStyle } from '@micromag/core';
import {
    Button as CoreButton,
    type ButtonProps as CoreButtonProps,
} from '@micromag/core/components';
import { getStyleFromBox, getStyleFromText } from '@micromag/core/utils';

import styles from './styles.module.css';

interface ButtonProps extends CoreButtonProps {
    textStyle?: TextStyle | null;
    buttonStyle?: BoxStyle | null;
    type?: 'button' | 'submit';
    disabled?: boolean;
    focusable?: boolean;
    inline?: boolean;
    children?: React.ReactNode | null;
    className?: string | null;
    withoutExternalBorder?: boolean;
    ref?: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>;
    style?: Record<string, unknown> | null;
}

function Button({
    textStyle = null,
    buttonStyle = null,
    type = 'button',
    disabled = false,
    focusable = true,
    inline = false,
    children = null,
    className = null,
    withoutExternalBorder = true,
    ref: refButton = null,
    style = null,
    ...buttonProps
}: ButtonProps) {
    let finalStyles = style;

    const { body: _body = null, ...otherProps } = buttonProps || {};

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
            className={classNames([styles.container, className])}
            disabled={disabled}
            style={finalStyles}
            ref={refButton}
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
