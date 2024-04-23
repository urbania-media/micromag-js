/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/control-has-associated-label */
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    Button,
    ModalDialog as Dialog,
    Modal, // Spinner,
} from '@micromag/core/components';
import { getFileName } from '@micromag/core/utils';
import MediaGallery from '@micromag/media-gallery';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/media-modal.module.scss';

const propTypes = {
    title: PropTypes.string,
    value: MicromagPropTypes.media,
    type: PropTypes.string,
    noValueLabel: MicromagPropTypes.label,
    autoClose: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    onChange: PropTypes.func,
    onRequestClose: PropTypes.func,
    thumbnail: PropTypes.node,
    thumbnailPath: PropTypes.string,
    className: PropTypes.string,
    buttonsClassName: PropTypes.string,
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
    isHorizontal: false,
    onChange: null,
    onRequestClose: null,
    thumbnail: null,
    thumbnailPath: 'thumbnail_url',
    className: null,
    buttonsClassName: null,
};

const MediaModal = ({
    title,
    value,
    type,
    noValueLabel,
    autoClose,
    isHorizontal,
    onRequestClose,
    onChange,
    thumbnail,
    thumbnailPath,
    className,
    buttonsClassName,
    ...props
}) => {
    const [modalOpen, setModalOpen] = useState();

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
    }, [value, onChange, onClose, autoClose]);

    // Uploads

    return (
        <>
            <FieldWithForm
                value={value}
                // onChange={onChange}
                noValueLabel={noValueLabel}
                label={label}
                withTitleLabel={label !== null}
                thumbnailPath="thumbnail_url"
                isForm
                isHorizontal={isHorizontal}
                {...props}
            >
                <div className="d-flex w-100 align-items-center justify-content-between mw-100 overflow-hidden">
                    <button
                        type="button"
                        className={classNames([
                            styles.previewButton,
                            {
                                [styles.shaded]: !isHorizontal,
                                [styles.small]: isHorizontal,
                                'p-2': !isHorizontal,
                                'mx-auto': !isHorizontal,
                                'bg-dark': !isHorizontal,
                                'flex-grow-1': true,
                            },
                        ])}
                        onClick={onOpen}
                    >
                        <span className="row">
                            <span
                                className={classNames([
                                    styles.label,
                                    'col',
                                    'w-75',
                                    'text-monospace',
                                    'text-truncate',
                                    {
                                        'fw-bold': value !== null,
                                        'text-start': !isHorizontal,
                                        'text-end': isHorizontal,
                                    },
                                ])}
                                style={{ maxWidth: 270 }}
                            >
                                {label || (
                                    <span className="text-light">
                                        <FormattedMessage defaultMessage="Select media..." />
                                    </span>
                                )}
                            </span>
                            {thumbnailElement !== null ? (
                                <span className="col-auto">{thumbnailElement}</span>
                            ) : null}
                        </span>
                    </button>
                    {value !== null ? (
                        <button
                            type="button"
                            className={classNames([styles.clearButton])}
                            onClick={onClearMedia}
                        >
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    ) : null}
                </div>
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
                        size="lg"
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
                        <MediaGallery
                            value={value}
                            types={type}
                            // TODO: add source from here
                            isPicker
                            onChange={onChangeMedia}
                            onClose={onClose}
                            onClear={onClearMedia}
                        />
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
