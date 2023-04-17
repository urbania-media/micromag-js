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
            withoutBootstrapStyles
            {...otherProps}
        >
            {children}
        </CoreButton>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
