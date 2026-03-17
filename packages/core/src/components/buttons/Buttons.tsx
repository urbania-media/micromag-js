/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Button from './Button';

import styles from '../../styles/buttons/buttons.module.css';

const emptyArray: never[] = [];

interface ButtonsProps {
    buttons?: Button[];
    size?: ButtonSize | null;
    theme?: ButtonTheme;
    renderButton?: ((...args: unknown[]) => void) | null;
    onClickButton?: ((...args: unknown[]) => void) | null;
    className?: string | null;
    buttonClassName?: string | null;
}

function Buttons({
    buttons = emptyArray,
    size = null,
    theme = undefined,
    renderButton = null,
    onClickButton = null,
    buttonClassName = null,
    className = null,
}: ButtonsProps) {
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
                    id,
                    name,
                    className: customClassName = null,
                    onClick = null,
                    theme: buttonTheme = null,
                    ...buttonProps
                } = button;
                const fixedProps = {
                    className: classNames([
                        styles.button,
                        {
                            [buttonClassName]: buttonClassName !== null,
                            [customClassName]: customClassName !== null,
                        },
                    ]),
                    onClick: (e) => {
                        if (onClick !== null) {
                            onClick(e, button, index);
                        }
                        if (onClickButton !== null) {
                            onClickButton(e, button, index);
                        }
                    },
                    theme: buttonTheme || theme,
                };
                const buttonKey = id || `button-${index}`;
                return renderButton !== null ? (
                    renderButton(button, index, { key: buttonKey, ...fixedProps })
                ) : (
                    <Button key={buttonKey} {...fixedProps} {...buttonProps} />
                );
            })}
        </div>
    );
}

export default Buttons;
