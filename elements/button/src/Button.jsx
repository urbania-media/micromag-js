/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable react/no-array-index-key, react/no-danger, react/button-has-type */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button as CoreButton } from '@micromag/core/components';
import { getStyleFromText, getStyleFromBox } from '@micromag/core/utils';
import styles from './styles.module.scss';

const propTypes = {
    textStyle: MicromagPropTypes.textStyle,
    buttonStyle: MicromagPropTypes.boxStyle,
    type: PropTypes.oneOf(['button', 'submit']),
    disabled: PropTypes.bool,
    focusable: PropTypes.bool,
    inline: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    withoutExternalBorder: PropTypes.bool,
    refButton: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any, // eslint-disable-line
        }),
    ]),
};

const defaultProps = {
    textStyle: null,
    buttonStyle: null,
    type: 'button',
    disabled: false,
    focusable: true,
    inline: false,
    onClick: null,
    children: null,
    className: null,
    withoutExternalBorder: false,
    refButton: null,
};

const Button = ({
    textStyle,
    buttonStyle,
    type,
    disabled,
    focusable,
    inline,
    onClick,
    children,
    className,
    withoutExternalBorder,
    refButton,
    ...buttonProps
}) => {
    let finalStyles = null;
    let borderStyles = null;
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
        const {
            borderRadius = null,
            borderWidth = null,
            borderColor = null,
            borderStyle = null,
            ...otherStyles
        } = finalStyles || {};

        const margin = borderWidth !== null && borderWidth > 0 ? '-1px' : null;

        finalStyles = {
            ...otherStyles,
            borderRadius,
            ...(margin !== null ? { margin } : null),
        };

        borderStyles = {
            borderRadius: borderRadius + borderWidth,
            // backgroundColor: borderColor,
            borderWidth,
            borderColor,
            borderStyle,
            display: inline ? 'inline-block' : null,
            // width: `calc(100% - ${borderWidth || 0}px)`,
        };
    }

    const button = (
        <CoreButton
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            disabled={disabled}
            style={finalStyles}
            onClick={onClick}
            refButton={refButton}
            type={type}
            focusable={focusable}
            {...otherProps}
        >
            {children}
        </CoreButton>
    );

    return borderStyles !== null ? (
        <div className={styles.border} style={borderStyles}>
            {button}
        </div>
    ) : (
        button
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
