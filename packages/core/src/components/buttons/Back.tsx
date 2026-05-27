import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button, { ButtonProps } from './Button';

interface BackButtonProps extends ButtonProps {
    className?: string | null;
}

function BackButton({ ...props }: BackButtonProps) {
    return (
        <Button size="sm" {...props}>
            <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
    );
}

export default BackButton;
