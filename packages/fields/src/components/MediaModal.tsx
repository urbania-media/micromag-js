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

interface MediaModalProps {
    title?: string | null;
    value?: Media | null;
    type?: string | null;
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
        const newSelectedMedia = !multiple && isArray(newMedia) ? newMedia[0] : newMedia;
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
                                    <span className="text-body-secondary">
                                        <FormattedMessage defaultMessage="Select media..." />
                                    </span>
                                )}
                            </span>
                            {thumbnailElement !== null ? (
                                <span className="col-auto ps-0">{thumbnailElement}</span>
                            ) : null}
                        </span>
                    </button>
                    {value !== null ? (
                        <ClearButton
                            className={classNames([styles.clearButton])}
                            onClick={onClearMedia}
                        />
                    ) : null}
                </div>
            </FieldWithForm>
            {modalOpen ? (
                <Modal>
                    <Dialog
                        title={dialogTitle}
                        className={classNames([styles.dialog, className])}
                        bodyClassName={styles.dialogBody}
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
                            onClose={onClose}
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
