import classNames from 'classnames';
import { JSX, MouseEvent } from 'react';

import { ButtonSize, ButtonTheme, Button as ButtonType } from '../../types';
import Button from './Button';

const emptyArray: never[] = [];

interface ButtonsProps {
    buttons?: ButtonType[];
    size?: ButtonSize | null;
    theme?: ButtonTheme;
    renderButton?:
        | ((button: ButtonType, index: number, props: Record<string, unknown>) => JSX.Element)
        | null;
    onClickButton?: ((e: MouseEvent, button: ButtonType, index) => void) | null;
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
                size !== null ? `btn-group-${size}` : null,
                className,
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
                    className: classNames([customClassName, buttonClassName, {}]),
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
