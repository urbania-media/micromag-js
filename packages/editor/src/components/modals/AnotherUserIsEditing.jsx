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
                    defaultMessage="Somebody else is editing this Micromag"
                    description="Title of the “another user is editing” dialog"
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
            <div className={styles.description}>
                <Label>
                    <FormattedMessage
                        defaultMessage="Another user is currently editing this Micromag."
                        description="Confirmation message for “another user is editing” modal"
                    />
                </Label>
            </div>
            <div className={styles.actions}>
                <Button onClick={onCancel} className="btn-outline-secondary me-2">
                    <Label>
                        <FormattedMessage
                            defaultMessage="Cancel"
                            description="Cancel button label"
                        />
                    </Label>
                </Button>
                <Button
                    onClick={onConfirm}
                    theme="danger"
                    label={
                        <FormattedMessage
                            defaultMessage="Back to dashboard"
                            description="Confirm button label"
                        />
                    }
                />
            </div>
        </Dialog>
    </Modal>
);

DeleteScreenModal.propTypes = propTypes;
DeleteScreenModal.defaultProps = defaultProps;

export default DeleteScreenModal;
