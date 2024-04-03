/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
// import { getCSRFHeaders } from '@folklore/fetch';
import classNames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Modal, ModalDialog as Dialog, Button } from '@micromag/core/components';
import { useUppyConfig } from '@micromag/core/contexts';
import { getFileName } from '@micromag/core/utils';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/media-modal.module.scss';

const propTypes = {
    title: PropTypes.string,
    value: MicromagPropTypes.media,
    type: PropTypes.string,
    noValueLabel: MicromagPropTypes.label,
    autoClose: PropTypes.bool,
    onChange: PropTypes.func,
    onRequestClose: PropTypes.func,
    thumbnail: PropTypes.node,
    thumbnailPath: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    value: null,
    type: null,
    noValueLabel: (
        <FormattedMessage
            defaultMessage="Select a media..."
            description="Label when no value is provided to Media field"
        />
    ),
    autoClose: true,
    onChange: null,
    onRequestClose: null,
    thumbnail: null,
    thumbnailPath: 'thumbnail_url',
    className: null,
};

const MediaModal = ({
    title,
    value,
    type,
    noValueLabel,
    autoClose,
    onRequestClose,
    onChange,
    thumbnail,
    thumbnailPath,
    className,
    ...props
}) => {
    const [modalOpen, setModalOpen] = useState();

    const { locale } = useIntl();
    const { xhr } = useUppyConfig();
    const { endpoint: xhrEndpoint = null } = xhr || {};

    const label = value !== null ? value.name || getFileName(value.url) || null : null;

    let thumbnailElement = null;
    const thumbnailSrc = get(value, thumbnailPath, null);
    if (thumbnail !== null) {
        thumbnailElement = thumbnail;
    } else if (thumbnailSrc !== null) {
        thumbnailElement = <img src={thumbnailSrc} className={styles.thumbnail} alt={label} />;
    }

    const onOpen = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setModalOpen(true);
        },
        [setModalOpen],
    );

    const onClose = useCallback(
        (e) => {
            setModalOpen(false);
            if (onRequestClose !== null) {
                onRequestClose(e);
            }
        },
        [setModalOpen, onRequestClose],
    );

    const onChangeMedia = useCallback(
        (media) => {
            if (onChange !== null) {
                onChange(media !== null && value !== null && media.id === value.id ? null : media);
            }
            if (autoClose) {
                onClose();
            }
        },
        [value, onChange, onClose, autoClose],
    );

    const onClearMedia = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
        }
        if (autoClose) {
            onClose();
        }
    }, [value, onChange, onClose, autoClose]);

    return (
        <>
            <FieldWithForm
                value={value}
                onChange={onChange}
                noValueLabel={noValueLabel}
                label={label}
                withTitleLabel={label !== null}
                thumbnailPath="thumbnail_url"
                isHorizontal
                isForm
                className="d-inline-block"
                {...props}
            >
                <button type="button" className={styles.previewButton} onClick={onOpen}>
                    <span className="row">
                        <span
                            className={classNames([
                                styles.label,
                                'col',
                                'text-monospace',
                                'text-start',
                                'text-truncate',
                                'text-end',
                            ])}
                        >
                            {label}
                        </span>
                        {thumbnailElement !== null ? (
                            <span className="col-auto">{thumbnailElement}</span>
                        ) : null}
                    </span>
                </button>
            </FieldWithForm>
            {modalOpen ? (
                <Modal>
                    <Dialog
                        title={
                            title || (
                                <FormattedMessage
                                    defaultMessage="Choose media"
                                    description="Modal title"
                                />
                            )
                        }
                        className={classNames([
                            styles.dialog,
                            {
                                [className]: className,
                            },
                        ])}
                        bodyClassName={styles.dialogBody}
                        onClickClose={onClose}
                        footer={
                            <div className="p-2">
                                <Button className={styles.close} theme="primary" onClick={onClose}>
                                    <FormattedMessage
                                        defaultMessage="Close"
                                        description="Button label"
                                    />
                                </Button>
                            </div>
                        }
                    >
                        Media modal d00d
                    </Dialog>
                </Modal>
            ) : null}
        </>
    );
};

MediaModal.propTypes = propTypes;
MediaModal.defaultProps = defaultProps;
MediaModal.withModal = true;

export default MediaModal;
