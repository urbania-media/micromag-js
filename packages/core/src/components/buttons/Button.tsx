import classNames from 'classnames';
import {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    CSSProperties,
    ForwardedRef,
    MouseEventHandler,
    ReactNode,
} from 'react';
import { Link } from 'wouter';

import { ButtonSize, ButtonTheme, Label as LabelType } from '../../types';
import Label from '../partials/Label';

import styles from '../../styles/buttons/button.module.css';

export type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

export interface ButtonProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
    'onClick' | 'children'
> {
    type?: 'button' | 'submit' | 'reset';
    theme?: ButtonTheme | null;
    size?: ButtonSize | null;
    href?: string | null;
    external?: boolean;
    direct?: boolean;
    target?: string;
    label?: LabelType | null;
    children?: LabelType | null;
    focusable?: boolean;
    active?: boolean;
    icon?: ReactNode | null;
    iconPosition?: 'left' | 'right' | 'inline';
    disabled?: boolean;
    loading?: boolean;
    disableOnLoading?: boolean;
    withoutStyle?: boolean;
    withoutBootstrapStyles?: boolean;
    withoutTheme?: boolean;
    outline?: boolean;
    style?: CSSProperties;
    className?: string | null;
    iconClassName?: string | null;
    labelClassName?: string | null;
    onClick?: MouseEventHandler<ButtonElement> | null;
    ref?: ForwardedRef<ButtonElement> | null;
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
    withoutStyle = false,
    withoutBootstrapStyles = false,
    withoutTheme = false,
    outline = false,
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
                    <span className={classNames([iconPosition === 'left' ? iconClassName : null])}>
                        {iconPosition === 'left' ? icon : null}
                    </span>
                    <span className={classNames([labelClassName])}>{text}</span>
                    <span
                        className={classNames([
                            styles.right,
                            iconPosition === 'right' ? iconClassName : null,
                        ])}
                    >
                        {iconPosition === 'right' ? icon : null}
                    </span>
                    {hasChildren ? children : null}
                </>
            ) : null}
            {!hasIcon ? text : null}
            {hasChildren ? children : null}
        </>
    );

    const withStyle = !withoutTheme && !withoutStyle;

    const buttonClassNames = classNames([
        ...(!withoutBootstrapStyles && withStyle
            ? [
                  'btn',
                  theme !== null ? `btn-${outline ? 'outline-' : ''}${theme}` : null,
                  size !== null ? `btn-${size}` : null,
                  {
                      active,
                      disabled,
                  },
              ]
            : []),
        styles.container,
        {
            [styles.withoutStyle]: withoutStyle,
            [styles.withIcon]: hasIcon,
            [styles.withIconColumns]: hasIconColumns,
        },
        className,
    ]);

    if (href !== null) {
        const linkClassNames = classNames([buttonClassNames, { disabled }]);
        return external || direct ? (
            <a
                {...props}
                href={!disabled ? href : undefined}
                className={linkClassNames}
                onClick={onClick}
                target={external ? target : undefined}
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
