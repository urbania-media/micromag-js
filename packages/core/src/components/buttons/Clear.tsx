import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { HTMLAttributes, MouseEventHandler } from 'react';

interface ClearButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClick?: MouseEventHandler<HTMLButtonElement> | null;
    iconOnly?: boolean;
    className?: string | null;
    disabled?: boolean;
}

function ClearButton({
    onClick = null,
    className = null,
    iconOnly = false,
    disabled = false,
    ...props
}: ClearButtonProps) {
    const ButtonComponent = iconOnly ? 'span' : 'button';
    return (
        <ButtonComponent
            className={classNames([
                'btn',
                // 'btn-outline-secondary',
                'd-inline-block',
                'btn-xs',
                { disabled },
                className,
            ])}
            onClick={!iconOnly || !disabled ? onClick : null}
            disabled={!iconOnly ? disabled : null}
            {...props}
        >
            <FontAwesomeIcon icon={faClose} />
        </ButtonComponent>
    );
}

export default ClearButton;
