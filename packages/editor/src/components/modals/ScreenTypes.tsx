/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ModalDialog as Dialog, Modal } from '@micromag/core/components';

import ScreenTypesMenu from '../menus/ScreenTypes';

import styles from '../../styles/modals/screen-types.module.css';

interface ScreenTypesModalProps {
    selectedTypes?: string[];
    className?: string;
    onRequestClose?: (...args: unknown[]) => void;
    onClickScreenType?: (...args: unknown[]) => void;
}

function ScreenTypesModal({
    selectedTypes = null,
    className = null,
    onRequestClose = null,
    onClickScreenType = null,
}: ScreenTypesModalProps) {
    return (
        <Modal>
            <Dialog
                title={
                    <FormattedMessage
                        defaultMessage="Add a screen"
                        description="Title of the screen types selection dialog"
                    />
                }
                className={classNames([
                    styles.container,
                    {
                        [className]: className,
                    },
                ])}
                onClose={onRequestClose}
            >
                <ScreenTypesMenu
                    selectedTypes={selectedTypes}
                    className={styles.menu}
                    onClickItem={onClickScreenType}
                />
            </Dialog>
        </Modal>
    );
}

export default ScreenTypesModal;
