/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'wouter';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';
import { getStyleFromColor } from '@micromag/core/utils';

import styles from '../../styles/buttons/button.module.scss';

const propTypes = {
    type: PropTypes.string,
    theme: MicromagPropTypes.buttonTheme,
    size: MicromagPropTypes.buttonSize,
    href: PropTypes.string,
    external: PropTypes.bool,
    direct: PropTypes.bool,
    target: PropTypes.string,
    label: MicromagPropTypes.label,
    children: MicromagPropTypes.label,
    focusable: PropTypes.bool,
    active: PropTypes.bool,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right', 'inline']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    disableOnLoading: PropTypes.bool,
    withoutTheme: PropTypes.bool,
    asLink: PropTypes.bool,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    onClick: PropTypes.func,
    refButton: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any, // eslint-disable-line
        }),
    ]),
};

const defaultProps = {
    type: 'button',
    theme: null,
    size: null,
    href: null,
    external: false,
    direct: false,
    target: '_blank',
    label: null,
    children: null,
    focusable: true,
    active: false,
    icon: null,
    iconPosition: 'inline',
    disabled: false,
    loading: false,
    disableOnLoading: true,
    withoutTheme: false,
    asLink: false,
    className: null,
    iconClassName: null,
    labelClassName: null,
    onClick: null,
    refButton: null,
};

const Button = ({
    type,
    theme,
    size,
    href,
    external,
    direct,
    target,
    label,
    children,
    focusable,
    active,
    icon,
    iconPosition,
    disabled,
    loading,
    disableOnLoading,
    withoutTheme,
    asLink,
    onClick,
    className,
    iconClassName,
    labelClassName,
    refButton,
    ...props
}) => {
    const finalLabel = label || children;
    const text = finalLabel !== null ? <Label>{finalLabel}</Label> : null;
    const hasChildren = label !== null && children !== null;
    const hasIcon = icon !== null;
    const hasInlineIcon = hasIcon && (iconPosition === 'inline' || text === null);
    const hasIconColumns = hasIcon && !hasInlineIcon;

    const buttonClassNames = classNames([
        styles.container,
        styles[`icon-${iconPosition}`],
        {
            [styles.withIcon]: hasIcon,
            [styles.withIconColumns]: hasIconColumns,
            [styles.withText]: text !== null,
            [styles.isLink]: href !== null,
            [styles.asLink]: asLink,
            [styles.isDisabled]: disabled,
            [styles.isLoading]: loading,
            [className]: className !== null,
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
                    <span
                        className={classNames([
                            styles.icon,
                            {
                                [iconClassName]: iconClassName !== null,
                            },
                        ])}
                    >
                        {icon}
                    </span>
                    {text !== null ? (
                        <span
                            className={classNames([
                                styles.label,
                                {
                                    [labelClassName]: labelClassName !== null,
                                },
                            ])}
                        >
                            {text}
                        </span>
                    ) : null}
                </>
            ) : null}
            {hasIconColumns ? (
                <>
                    {iconPosition === 'left' ? (
                        <span
                            className={classNames([
                                styles.icon,
                                styles.left,
                                {
                                    [iconClassName]:
                                        iconClassName !== null && iconPosition === 'left',
                                },
                            ])}
                        >
                            {icon}
                        </span>
                    ) : null}
                    <span
                        className={classNames([
                            styles.center,
                            styles.label,
                            {
                                [labelClassName]: labelClassName !== null,
                            },
                        ])}
                    >
                        {text}
                    </span>
                    {iconPosition === 'right' ? (
                        <span
                            className={classNames([
                                styles.icon,
                                styles.right,
                                {
                                    [iconClassName]:
                                        iconClassName !== null && iconPosition === 'right',
                                },
                            ])}
                        >
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
                ref={refButton}
                tabIndex={focusable ? '' : '-1'}
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
                ref={refButton}
                tabIndex={focusable ? '' : '-1'}
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
            ref={refButton}
            tabIndex={focusable ? '0' : '-1'}
        >
            {content}
        </button>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
