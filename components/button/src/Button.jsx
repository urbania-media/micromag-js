/* eslint-disable react/no-array-index-key, react/no-danger, react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromFont, getStyleFromColor } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    type: PropTypes.string,
    href: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.string,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right', 'inline']),
    style: MicromagPropTypes.textStyle,
    onClick: PropTypes.func,
    iconClassName: PropTypes.sring,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    type: 'button',
    href: null,
    active: false,
    children: null,
    icon: null,
    iconPosition: 'inline',
    style: null,
    onClick: null,
    iconClassName: null,
    labelClassName: null,
    className: null,
};

const Button = ({
    type,
    href,
    active,
    children,
    icon,
    iconPosition,
    style,
    onClick,
    iconClassName,
    labelClassName,
    className,
}) => {
    let finalStyle = null;

    const hasIcon = icon !== null;
    const hasInlineIcon = hasIcon && (iconPosition === 'inline' || children === null);
    const hasIconColumns = hasIcon && !hasInlineIcon;

    const { text: textStyle = null } = style || {};
    if (textStyle !== null) {
        const { font = null, color = null } = textStyle;
        finalStyle = {
            ...finalStyle,
            ...getStyleFromFont(font),
            ...getStyleFromColor(color, 'color'),
        };
    }

    const buttonClassNames = classNames([
        {
            active,
        },
        styles.container,
        {
            [styles.withIcon]: hasIcon,
            [styles.withIconColumns]: hasIconColumns,
            [styles.withText]: children !== null,
            [styles.isLink]: href !== null,
            [className]: className !== null,
        },
    ]);

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
                    {children !== null ? (
                        <span
                            style={finalStyle}
                            className={classNames([
                                styles.label,
                                {
                                    [labelClassName]: labelClassName !== null,
                                },
                            ])}
                        >
                            {children}
                        </span>
                    ) : null}
                </>
            ) : null}
            {hasIconColumns ? (
                <>
                    <span className={classNames([styles.left])}>
                        {iconPosition === 'left' ? icon : null}
                    </span>
                    <span className={classNames([styles.center])}>{children}</span>
                    <span className={classNames([styles.right])}>
                        {iconPosition === 'right' ? icon : null}
                    </span>
                </>
            ) : null}
            {!hasIcon ? children : null}
        </>
    );

    return (
        <button type={type} className={buttonClassNames} onClick={onClick}>
            {content}
        </button>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
