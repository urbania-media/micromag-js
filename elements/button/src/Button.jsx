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
    separateBorder: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
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
    separateBorder: true,
    onClick: null,
    children: null,
    className: null,
    refButton: null,
};

const Button = ({
    textStyle,
    buttonStyle,
    type,
    disabled,
    focusable,
    separateBorder,
    onClick,
    children,
    className,
    refButton,
    ...buttonProps
}) => {
    let finalStyles = null;
    let borderStyles = null;

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
        };
    }

    if (separateBorder) {
        const {
            borderRadius = null,
            borderWidth = null,
            borderColor = null,
            borderStyle = null,
            ...otherStyles
        } = finalStyles || {};

        finalStyles = {
            ...otherStyles,
            borderRadius,
        };

        borderStyles = {
            borderRadius,
            borderWidth,
            borderColor,
            borderStyle,
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
            {...buttonProps}
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
