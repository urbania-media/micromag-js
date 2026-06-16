import classNames from 'classnames';
import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ForwardedRef,
    MouseEventHandler,
} from 'react';
import { Link } from 'wouter';

import type { ButtonSize, ButtonTheme, Label as LabelType } from '@micromag/core';
import { Label } from '@micromag/core/components';
import { getStyleFromColor } from '@micromag/core/utils';

import styles from '../../styles/buttons/button.module.css';

export interface ButtonProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
    'onClick' | 'children'
> {
    theme?: ButtonTheme;
    size?: ButtonSize;
    href?: string;
    external?: boolean;
    direct?: boolean;
    target?: string;
    label?: LabelType;
    children?: LabelType;
    focusable?: boolean;
    active?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right' | 'inline';
    disabled?: boolean;
    loading?: boolean;
    disableOnLoading?: boolean;
    asLink?: boolean;
    className?: string;
    iconClassName?: string;
    labelClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    ref?: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>;
}

function Button({
    type = 'button',
    theme = null,
    size = null,
    href = null,
    external = false,
    direct = false,
    target = '_blank',
    label = null,
    children = null,
    focusable = true,
    active = false,
    icon = null,
    iconPosition = 'inline',
    disabled = false,
    loading = false,
    disableOnLoading = true,
    asLink = false,
    onClick = null,
    className = null,
    iconClassName = null,
    labelClassName = null,
    ref: refButton = null,
    ...props
}: ButtonProps) {
    const finalLabel = label || children;
    const text = finalLabel !== null ? <Label>{finalLabel}</Label> : null;
    const hasChildren = label !== null && children !== null;
    const hasIcon = icon !== null;
    const hasInlineIcon = hasIcon && (iconPosition === 'inline' || text === null);
    const hasIconColumns = hasIcon && !hasInlineIcon;

    const buttonClassNames = classNames([
        styles.container,
        styles[`icon-${iconPosition}`],
        className,
        {
            [styles.withIcon]: hasIcon,
            [styles.withIconColumns]: hasIconColumns,
            [styles.asLink]: asLink,
        },
    ]);

    const { colors = null } = theme || {};
    const { primary: brandPrimaryColor = null } = colors || {};
    const primaryColor = getStyleFromColor(brandPrimaryColor, 'color');
    const buttonStyles = { ...primaryColor };

    const content = (
        <>
            {hasInlineIcon ? (
                <>
                    <span className={classNames([styles.icon, iconClassName])}>{icon}</span>
                    {text !== null ? (
                        <span className={classNames([styles.label, labelClassName])}>{text}</span>
                    ) : null}
                </>
            ) : null}
            {hasIconColumns ? (
                <>
                    {iconPosition === 'left' ? (
                        <span className={classNames([styles.icon, iconClassName])}>{icon}</span>
                    ) : null}
                    <span className={classNames([styles.label, labelClassName])}>{text}</span>
                    {iconPosition === 'right' ? (
                        <span className={classNames([styles.icon, styles.right, iconClassName])}>
                            {icon}
                        </span>
                    ) : null}
                    {hasChildren ? children : null}
                </>
            ) : null}
            {!hasIcon ? text : null}
            {hasChildren ? children : null}
        </>
    );

    if (href !== null) {
        const linkClassNames = classNames([
            buttonClassNames,
            { disabled, [styles.linkDisabled]: disabled },
        ]);
        return external || direct ? (
            <a
                {...props}
                href={disabled ? null : href}
                className={linkClassNames}
                style={buttonStyles}
                onClick={onClick}
                target={external ? target : null}
                ref={refButton as ForwardedRef<HTMLAnchorElement>}
                tabIndex={!focusable ? -1 : undefined}
            >
                {content}
            </a>
        ) : (
            <Link
                {...props}
                href={href}
                className={linkClassNames}
                style={buttonStyles}
                onClick={onClick}
                ref={refButton as ForwardedRef<HTMLAnchorElement>}
                tabIndex={!focusable ? -1 : undefined}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            {...props}
            type={type}
            className={buttonClassNames}
            style={buttonStyles}
            onClick={onClick}
            disabled={disabled || (disableOnLoading && loading)}
            ref={refButton as ForwardedRef<HTMLButtonElement>}
            tabIndex={!focusable ? -1 : undefined}
        >
            {content}
        </button>
    );
}

export default Button;
