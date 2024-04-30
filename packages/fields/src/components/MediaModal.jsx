/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/control-has-associated-label */
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ModalDialog as Dialog, Modal } from '@micromag/core/components';
import { getFileName } from '@micromag/core/utils';
import MediaGallery from '@micromag/media-gallery';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/media-modal.module.scss';

const propTypes = {
    title: PropTypes.string,
    value: MicromagPropTypes.media,
    type: PropTypes.string,
    noValueLabel: MicromagPropTypes.label,
    isHorizontal: PropTypes.bool,
    onChange: PropTypes.func,
    onRequestClose: PropTypes.func,
    multiple: PropTypes.bool,
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
    isHorizontal: false,
    onChange: null,
    onRequestClose: null,
    multiple: false,
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
    isHorizontal,
    onChange,
    onRequestClose,
    multiple,
    thumbnail,
    thumbnailPath,
    className,
    buttonsClassName,
    ...props
}) => {
    const [modalOpen, setModalOpen] = useState();

    const [mediaFormOpen, setMediaFormOpen] = useState(false);
    const onMediaFormOpen = useCallback(() => {
        setMediaFormOpen(true);
    }, [setMediaFormOpen]);
    const onMediaFormClose = useCallback(() => {
        setMediaFormOpen(false);
    }, [setMediaFormOpen]);

    const label = value !== null ? value.name || getFileName(value.url) || null : null;

    let thumbnailElement = null;
    const thumbnailSrc = get(value, thumbnailPath, null);
    if (thumbnail !== null) {
        thumbnailElement = thumbnail;
    } else if (thumbnailSrc !== null) {
        thumbnailElement = <img src={thumbnailSrc} className={styles.thumbnail} alt={label} />;
    }

    // Temporary value
    const [media, setMedia] = useState(value);
    useEffect(() => {
        setMedia(value);
    }, [value, setMedia]);

    const onOpen = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setModalOpen(true);
            setMedia(value);
        },
        [setModalOpen, setMedia, value],
    );

    const onClose = useCallback(
        (e) => {
            setModalOpen(false);
            setMedia(null);
            if (onRequestClose !== null) {
                onRequestClose(e);
            }
        },
        [setModalOpen, onRequestClose, setMedia],
    );

    const onConfirmSelection = useCallback(() => {
        if (onChange !== null) {
            onChange(media);
        }
        onClose();
    }, [media, onClose]);

    const onChangeMedia = useCallback(
        (newMedia = null) => {
            setMedia(newMedia);
        },
        [value, onChange, onClose],
    );

    const onClearMedia = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
            setMedia(null);
        }
    }, [value, onChange, onClose, setMedia]);

    return (
        <>
            <FieldWithForm
                value={value}
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
                        size="md"
                        onClose={onClose}
                        buttons={
                            !mediaFormOpen
                                ? [
                                      {
                                          id: 'cancel',
                                          name: 'cancel',
                                          label: (
                                              <FormattedMessage
                                                  defaultMessage="Cancel"
                                                  description="Button label"
                                              />
                                          ),
                                          theme: 'secondary',
                                          onClick: onClose,
                                      },
                                      {
                                          id: 'confirm',
                                          name: 'confirm',
                                          label: (
                                              <FormattedMessage
                                                  defaultMessage="Confirm selection"
                                                  description="Button label"
                                              />
                                          ),
                                          theme: 'primary',
                                          onClick: onConfirmSelection,
                                      },
                                  ]
                                : null
                        }
                    >
                        <MediaGallery
                            value={media}
                            types={type}
                            isPicker
                            multiple={multiple}
                            onChange={onChangeMedia}
                            onClose={onClose}
                            onClear={onClearMedia}
                            onMediaFormOpen={onMediaFormOpen}
                            onMediaFormClose={onMediaFormClose}
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
