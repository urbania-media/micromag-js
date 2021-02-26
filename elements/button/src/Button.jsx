/* eslint-disable react/no-array-index-key, react/no-danger, react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button as CoreButton } from '@micromag/core/components';
import { getStyleFromText, getStyleFromButton } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    textStyle: MicromagPropTypes.textStyle,
    buttonStyle: MicromagPropTypes.buttonStyle,
    type: PropTypes.oneOf(['button', 'submit']),
    disabled: PropTypes.bool,
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
    onClick,
    children,
    className,
    refButton,
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
            ...getStyleFromButton(buttonStyle),
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
        >
            {children}
        </CoreButton>
    );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
