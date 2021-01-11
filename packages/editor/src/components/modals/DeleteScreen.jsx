/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Button, Label, Modal, ModalDialog as Dialog } from '@micromag/core/components';

import styles from '../../styles/modals/delete-screen.module.scss';

const propTypes = {
    className: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

const defaultProps = {
    className: null,
    onConfirm: null,
    onCancel: null,
};

const DeleteScreenModal = ({ className, onConfirm, onCancel }) => (
    <Modal>
        <Dialog
            title={
                <FormattedMessage
                    defaultMessage="Delete screen"
                    description="Title of the delete screen dialog"
                />
            }
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
            onClickClose={onCancel}
        >
            <div className={styles.description} >
                <Label>
                    <FormattedMessage
                        defaultMessage="Are you sure you want to delete this screen?"
                        description="Confirmation message before deleting a screen"
                    />
                </Label>
            </div>
            <div className={styles.actions}>
                <Button onClick={onConfirm} theme="danger" label={<FormattedMessage defaultMessage="Delete screen" description="Delete screen button label" />} />
                <Button onClick={onCancel}>
                    <Label>
                        <FormattedMessage defaultMessage="Cancel" description="Cancel button label" />
                    </Label>
                </Button>
            </div>
        </Dialog>
    </Modal>
);

DeleteScreenModal.propTypes = propTypes;
DeleteScreenModal.defaultProps = defaultProps;

export default DeleteScreenModal;
