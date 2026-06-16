import classNames from 'classnames';

import Button, { ButtonProps } from './Button';

import styles from '../../styles/buttons/icon-button.module.css';

interface IconButtonProps extends ButtonProps {
    iconClassName?: string;
}

function IconButton({ iconClassName = null, className = null, ...props }: IconButtonProps) {
    return (
        <Button
            className={classNames([styles.container, className])}
            labelClassName={styles.label}
            iconClassName={classNames([styles.icon, iconClassName])}
            {...props}
        />
    );
}

export default IconButton;
