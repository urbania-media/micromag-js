/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';

import Button from './Button';

import styles from '../../styles/buttons/buttons.module.css';

interface ButtonsProps {
    buttons?: Button[];
    size?: ButtonSize;
    theme?: ButtonTheme;
    renderButton?: (...args: unknown[]) => void;
    onClickButton?: (...args: unknown[]) => void;
    className?: string;
    buttonClassName?: string;
}

function Buttons(
    {
        buttons = [],
        size = null,
        theme = undefined,
        renderButton = null,
        onClickButton = null,
        buttonClassName = null,
        className = null,
    },
) {
    return (
        <div
            className={classNames([
                'btn-group',
                {
                    [`btn-group-${size}`]: size !== null,
                },
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            role="group"
        >
            {buttons.map((button, index) => {
                const {
                    className: customClassName = null,
                    onClick = null,
                    theme: buttonTheme = null,
                    ...buttonProps
                } = button;
                const fixedProps = {
                    key: `button-${index}`,
                    className: classNames([
                        styles.button,
                        {
                            [buttonClassName]: buttonClassName !== null,
                            [customClassName]: customClassName !== null,
                        },
                    ]),
                    onClick: e => {
                        if (onClick !== null) {
                            onClick(e, button, index);
                        }
                        if (onClickButton !== null) {
                            onClickButton(e, button, index);
                        }
                    },
                    theme: buttonTheme || theme,
                };
                return renderButton !== null ? (
                    renderButton(button, index, fixedProps)
                ) : (
                    <Button {...fixedProps} {...buttonProps} />
                );
            })}
        </div>
    );
}

export default Buttons;
