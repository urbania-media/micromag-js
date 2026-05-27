import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, type ButtonProps } from '@micromag/core/components';

interface SettingsButtonProps extends ButtonProps {
    dots?: boolean;
}

function SettingsButton({ dots = false, ...props }: SettingsButtonProps) {
    return (
        <Button
            size="sm"
            icon={<FontAwesomeIcon icon={dots ? faEllipsisV : faCogs} />}
            {...props}
        />
    );
}

export default SettingsButton;
