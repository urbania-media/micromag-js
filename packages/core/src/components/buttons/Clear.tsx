import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import styles from '../../styles/buttons/clear.module.css';

interface ClearButtonProps {
    onClick?: ((...args: unknown[]) => void) | null;
    iconOnly?: boolean;
    className?: string | null;
}

function ClearButton({
    onClick = null,
    className = null,
    iconOnly = false,
    ...props
}: ClearButtonProps) {
    const ButtonComponent = iconOnly ? 'span' : 'button';
    return (
        <ButtonComponent
            className={classNames([styles.container, className])}
            onClick={onClick}
            {...props}
        >
            <FontAwesomeIcon className={styles.icon} icon={faClose} />
        </ButtonComponent>
    );
}

export default ClearButton;
