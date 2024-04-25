/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ModalDialog as Dialog, Modal } from '@micromag/core/components';

import ScreenTypesMenu from '../menus/ScreenTypes';

import styles from '../../styles/modals/screen-types.module.scss';

const propTypes = {
    selectedTypes: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    onRequestClose: PropTypes.func,
    onClickScreenType: PropTypes.func,
};

const defaultProps = {
    selectedTypes: null,
    className: null,
    onRequestClose: null,
    onClickScreenType: null,
};

const ScreenTypesModal = ({ selectedTypes, className, onRequestClose, onClickScreenType }) => (
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

ScreenTypesModal.propTypes = propTypes;
ScreenTypesModal.defaultProps = defaultProps;

export default ScreenTypesModal;
