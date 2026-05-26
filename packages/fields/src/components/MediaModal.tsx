import classNames from 'classnames';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { ReactNode, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { Label, Media } from '@micromag/core';
import { ClearButton, ModalDialog as Dialog, Modal } from '@micromag/core/components';
import { getFileName } from '@micromag/core/utils';
import MediaGallery from '@micromag/media-gallery';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/media-modal.module.css';

export interface MediaModalProps {
    title?: string | null;
    value?: Media | null;
    type?: string | null;
    disabled?: boolean;
    noValueLabel?: Label;
    isHorizontal?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
    onRequestClose?: ((...args: unknown[]) => void) | null;
    multiple?: boolean;
    thumbnail?: ReactNode | null;
    thumbnailPath?: string;
    className?: string | null;
    buttonsClassName?: string | null;
}

function MediaModal({
    title = null,
    value = null,
    type = null,
    disabled = false,
    noValueLabel = null,
    isHorizontal = false,
    isForm = false,
    onChange = null,
    onRequestClose = null,
    multiple = false,
    autoClose = true,
    thumbnail = null,
    thumbnailPath = 'thumbnail_url',
    className = null,
    buttonsClassName = null,
    ...props
}: MediaModalProps) {
    const [modalOpen, setModalOpen] = useState(false);

    const [mediaFormOpen, setMediaFormOpen] = useState(false);
    const onMediaFormOpen = () => {
        setMediaFormOpen(true);
    };
    const onMediaFormClose = () => {
        setMediaFormOpen(false);
    };

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
        setMedia(!multiple && isArray(value) ? value[0] : value);
    }, [value, multiple, setMedia]);

    let dialogTitle: ReactNode = (
        <FormattedMessage defaultMessage="Choose media" description="Modal title" />
    );
    if (title !== null) {
        dialogTitle = title;
    } else if (type === 'video') {
        dialogTitle = <FormattedMessage defaultMessage="Select Video" description="Modal title" />;
    } else if (type === 'image') {
        dialogTitle = <FormattedMessage defaultMessage="Select Image" description="Modal title" />;
    } else if (type === 'audio') {
        dialogTitle = (
            <FormattedMessage defaultMessage="Select Audio File" description="Modal title" />
        );
    } else if (type === 'font') {
        dialogTitle = (
            <FormattedMessage defaultMessage="Select Font File" description="Modal title" />
        );
    } else if (type === 'document') {
        dialogTitle = (
            <FormattedMessage defaultMessage="Select Document" description="Modal title" />
        );
    } else if (type === 'subtitle') {
        dialogTitle = (
            <FormattedMessage defaultMessage="Select Subtitles File" description="Modal title" />
        );
    }

    const onOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setModalOpen(true);
        setMedia(!multiple && isArray(value) ? value[0] : value);
    };

    const onClose = (e = null) => {
        setModalOpen(false);
        setMedia(null);
        if (onRequestClose !== null) {
            onRequestClose(e);
        }
    };

    const onConfirmSelection = () => {
        if (onChange !== null) {
            onChange(media);
        }
        onClose();
    };

    const onChangeMedia = (newMedia = null) => {
        const newSelectedMedia =
            !multiple && isArray(newMedia) ? (newMedia?.[0] ?? null) : newMedia;
        if (newSelectedMedia !== null && !multiple && autoClose) {
            if (onChange !== null) {
                onChange(newSelectedMedia);
            }
            onClose();
        } else {
            setMedia(newSelectedMedia);
        }
    };

    const onClearMedia = () => {
        if (onChange !== null) {
            onChange(null);
            setMedia(null);
        }
    };

    return (
        <>
            <FieldWithForm
                value={value}
                noValueLabel={
                    noValueLabel || (
                        <FormattedMessage
                            defaultMessage="Select a media..."
                            description="Label when no value is provided to Media field"
                        />
                    )
                }
                label={label}
                withTitleLabel={label !== null}
                thumbnailPath="thumbnail_url"
                isForm
                isHorizontal={isHorizontal}
                disabled={disabled}
                {...props}
            >
                <div className="d-flex w-100 align-items-center mw-100 flex-nowrap">
                    <button
                        type="button"
                        className={classNames([
                            'btn',
                            'btn-sm',
                            'd-flex',
                            'flex-no-wrap',
                            'align-items-center',
                            'flex-grow-1',
                            {
                                'btn-light': !isHorizontal,
                            },
                        ])}
                        disabled={disabled}
                        onClick={onOpen}
                        style={{
                            width: value !== null ? 'calc(100% - 2em)' : '100%',
                        }}
                    >
                        <span
                            className={classNames([
                                'flex-grow-1',
                                'text-truncate',
                                {
                                    // 'fw-bold': value !== null,
                                    'fw-normal': value === null,
                                    'text-muted': value === null,
                                    'text-center': !isHorizontal,
                                    'text-end': isHorizontal,
                                },
                            ])}
                        >
                            {label || (
                                <FormattedMessage
                                    defaultMessage="Select media..."
                                    description="no value"
                                />
                            )}
                        </span>
                        {thumbnailElement !== null ? (
                            <span className="ms-1">{thumbnailElement}</span>
                        ) : null}
                    </button>
                    {value !== null ? (
                        <span>
                            <ClearButton
                                onClick={onClearMedia}
                                disabled={disabled}
                                className="ms-1"
                            />
                        </span>
                    ) : null}
                </div>
            </FieldWithForm>
            {modalOpen ? (
                <Modal>
                    <Dialog
                        title={dialogTitle}
                        className={classNames([styles.dialog, className])}
                        size="xl"
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
                                      multiple || !autoClose
                                          ? {
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
                                            }
                                          : null,
                                  ].filter((b) => b !== null)
                                : null
                        }
                    >
                        <MediaGallery
                            value={media}
                            types={type}
                            isPicker
                            multiple={multiple}
                            onChange={onChangeMedia}
                            className={styles.mediaGallery}
                            onMediaFormOpen={onMediaFormOpen}
                            onMediaFormClose={onMediaFormClose}
                        />
                    </Dialog>
                </Modal>
            ) : null}
        </>
    );
}

MediaModal.withModal = true;

export default MediaModal;
