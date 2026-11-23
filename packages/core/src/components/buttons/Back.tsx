import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';

import InlineIcon from '../icons/Inline';
import Button, { ButtonProps } from './Button';

interface BackButtonProps extends ButtonProps {
    className?: string | null;
}

function BackButton({ ...props }: BackButtonProps) {
    return (
        <Button size="sm" {...props}>
            <InlineIcon icon={faAngleLeft} />
        </Button>
    );
}

export default BackButton;
