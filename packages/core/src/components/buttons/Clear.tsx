import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import styles from '../../styles/buttons/clear.module.css';

interface ClearButtonProps {
    onClick?: ((...args: unknown[]) => void) | null;
    className?: string | null;
}

function ClearButton({ onClick = null, className = null, ...props }: ClearButtonProps) {
    return (
        <button className={classNames([styles.container, className])} onClick={onClick} {...props}>
            <FontAwesomeIcon className={styles.icon} icon={faClose} />
        </button>
    );
}

export default ClearButton;
