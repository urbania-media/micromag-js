import { FormattedMessage } from 'react-intl';

import ConfirmModal, { ConfirmModalProps } from '@panneau/modal-confirm';

interface DeleteScreenModalProps extends Omit<ConfirmModalProps, 'id'> {
    id?: string | null;
}

function DeleteScreenModal(props: DeleteScreenModalProps) {
    return (
        <ConfirmModal
            id="delete-screen"
            title={
                <FormattedMessage
                    defaultMessage="Delete screen"
                    description="Title of the delete screen dialog"
                />
            }
            confirmButton={{
                label: (
                    <FormattedMessage
                        defaultMessage="Delete screen"
                        description="Delete screen button label"
                    />
                ),
            }}
            {...props}
        >
            <FormattedMessage
                defaultMessage="Are you sure you want to delete this screen?"
                description="Confirmation message before deleting a screen"
            />
        </ConfirmModal>
    );
}

export default DeleteScreenModal;
