/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import * as AppPropTypes from '../../PropTypes';
import Label from '../partials/Label';

import styles from '../../styles/buttons/button.module.scss';

const propTypes = {
    type: PropTypes.string,
    theme: AppPropTypes.buttonTheme,
    size: AppPropTypes.buttonSize,
    withoutStyle: PropTypes.bool,
    href: PropTypes.string,
    external: PropTypes.bool,
    direct: PropTypes.bool,
    target: PropTypes.string,
    label: AppPropTypes.label,
    children: AppPropTypes.label,
    active: PropTypes.bool,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right', 'inline']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    disableOnLoading: PropTypes.bool,
    small: PropTypes.bool,
    big: PropTypes.bool,
    withShadow: PropTypes.bool,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    onClick: PropTypes.func,
    refButton: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
};

const defaultProps = {
    type: 'button',
    theme: 'primary',
    size: null,
    withoutStyle: null,
    href: null,
    external: false,
    direct: false,
    target: '_blank',
    label: null,
    children: null,
    active: false,
    icon: null,
    iconPosition: 'inline',
    disabled: false,
    loading: false,
    disableOnLoading: true,
    small: false,
    big: false,
    withShadow: false,
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
    withoutStyle,
    href,
    external,
    direct,
    target,
    label,
    children,
    active,
    icon,
    iconPosition,
    disabled,
    loading,
    disableOnLoading,
    small,
    big,
    withShadow,
    onClick,
    className,
    iconClassName,
    labelClassName,
    refButton,
}) => {
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
                    <span
                        className={classNames([
                            styles.left,
                            {
                                [iconClassName]: iconClassName !== null && iconPosition === 'left',
                            },
                        ])}
                    >
                        {iconPosition === 'left' ? icon : null}
                    </span>
                    <span
                        className={classNames([
                            styles.center,
                            {
                                [labelClassName]: labelClassName !== null,
                            },
                        ])}
                    >
                        {text}
                    </span>
                    <span
                        className={classNames([
                            styles.right,
                            {
                                [iconClassName]: iconClassName !== null && iconPosition === 'right',
                            },
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

    const buttonClassNames = classNames([
        {
            btn: !withoutStyle && theme !== null,
            [`btn-${theme}`]: !withoutStyle && theme !== null,
            [`btn-${size}`]: !withoutStyle && size !== null,
            active: !withoutStyle && active,
        },
        styles.container,
        {
            [styles.withoutStyle]: withoutStyle,
            [styles.withIcon]: hasIcon,
            [styles.withIconColumns]: hasIconColumns,
            [styles.withText]: text !== null,
            [styles.withShadow]: withShadow,
            [styles.isSmall]: small,
            [styles.isBig]: big,
            [styles.isLink]: href !== null,
            [styles.isDisabled]: disabled,
            [styles.isLoading]: loading,
            [className]: className !== null,
        },
    ]);
    if (href !== null) {
        return external || direct ? (
            <a
                href={href}
                className={buttonClassNames}
                onClick={onClick}
                target={external ? target : null}
                ref={refButton}
            >
                {content}
            </a>
        ) : (
            <Link to={href} className={buttonClassNames} onClick={onClick} ref={refButton}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={buttonClassNames}
            onClick={onClick}
            disabled={disabled || (disableOnLoading && loading)}
            ref={refButton}
        >
            {content}
        </button>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
