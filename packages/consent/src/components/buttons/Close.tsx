import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import classNames from 'classnames';

import { Button, InlineIcon } from '@micromag/core/components';

import styles from '../../styles/buttons/close.module.css';

interface CloseButtonProps {
    className?: string;
}

function CloseButton({ className = null, ...props }: CloseButtonProps) {
    return (
        <Button
            className={classNames([styles.container, className])}
            withoutStyle
            icon={<InlineIcon icon={faTimes} />}
            iconPosition="right"
            {...props}
        />
    );
}

export default CloseButton;
