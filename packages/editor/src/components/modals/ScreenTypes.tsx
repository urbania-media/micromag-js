import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Dialog, { DialogModalProps } from '@panneau/modal-dialog';

import ScreenTypesMenu from '../menus/ScreenTypes';

interface ScreenTypesModalProps extends DialogModalProps {
    selectedTypes?: string[];
    className?: string;
    onClosed?: () => void;
    onClickScreenType?: (...args: unknown[]) => void;
}

function ScreenTypesModal({
    selectedTypes = null,
    className = null,
    onClosed = null,
    onClickScreenType = null,
}: ScreenTypesModalProps) {
    const [opened, setOpened] = useState(true);
    const requestClose = () => {
        setOpened(false);
    };
    return (
        <Dialog
            id={'screen-types'}
            title={
                <FormattedMessage
                    defaultMessage="Add a screen"
                    description="Title of the screen types selection dialog"
                />
            }
            size="lg"
            visible={opened}
            requestClose={requestClose}
            onClosed={onClosed}
            className={className}
        >
            <ScreenTypesMenu selectedTypes={selectedTypes} onClickItem={onClickScreenType} />
        </Dialog>
    );
}

export default ScreenTypesModal;
