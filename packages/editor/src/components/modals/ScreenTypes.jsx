/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal, ModalDialog as Dialog } from '@micromag/core/components';
import { defineMessages } from 'react-intl';

import ScreenTypesMenu from '../menus/ScreenTypes';

import styles from '../../styles/modals/screen-types.module.scss';

const messages = defineMessages({
    title: {
        id: 'modals.screen_types_title',
        defaultMessage: 'Add a screen',
    },
});

const propTypes = {
    className: PropTypes.string,
    onRequestClose: PropTypes.func,
    onClickScreenType: PropTypes.func,
};

const defaultProps = {
    className: null,
    onRequestClose: null,
    onClickScreenType: null,
};

const ScreenTypesModal = ({ className, onRequestClose, onClickScreenType }) => (
    <Modal>
        <Dialog
            title={messages.title}
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
            onClickClose={onRequestClose}
        >
            <ScreenTypesMenu className={styles.menu} onClickItem={onClickScreenType} />
        </Dialog>
    </Modal>
);

ScreenTypesModal.propTypes = propTypes;
ScreenTypesModal.defaultProps = defaultProps;

export default ScreenTypesModal;
