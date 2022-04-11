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
    onClick,
    children,
    className,
    refButton,
    ...buttonProps
}) => {
    let finalStyle = null;

    if (textStyle !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromText(textStyle),
        };
    }

    if (buttonStyle !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromBox(buttonStyle),
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
            style={finalStyle}
            onClick={onClick}
            refButton={refButton}
            type={type}
            focusable={focusable}
            {...buttonProps}
        >
            {children}
        </CoreButton>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
