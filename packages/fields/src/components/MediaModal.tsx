import classNames from 'classnames';
import get from 'lodash-es/get';
import isArray from 'lodash-es/isArray';
import { ReactNode, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { Label, Media } from '@micromag/core';
import { ClearButton } from '@micromag/core/components';
import { useStoryMedia } from '@micromag/core/contexts';
import { getFileName } from '@micromag/core/utils';
import { MediaGalleryModal } from '@micromag/media-gallery';

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
    value: rawValue = null,
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
    const getMedia = useStoryMedia();
    const value =
        rawValue !== null
            ? isArray(rawValue)
                ? rawValue.map((it) => getMedia(it))
                : getMedia(rawValue)
            : null;

    const label = value !== null ? value.name || getFileName(value.url) || null : null;

    let thumbnailElement = null;
    const thumbnailSrc = get(value, thumbnailPath, null);
    if (thumbnail !== null) {
        thumbnailElement = thumbnail;
    } else if (thumbnailSrc !== null) {
        thumbnailElement = <img src={thumbnailSrc} className={styles.thumbnail} alt={label} />;
    }

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
    };

    const onModalClosed = () => {
        setModalOpen(false);
        if (onRequestClose !== null) {
            onRequestClose();
        }
    };

    const onChangeMedia = (newMedia = null) => {
        if (onChange !== null) {
            onChange(newMedia);
        }
    };

    const onClearMedia = () => {
        if (onChange !== null) {
            onChange(null);
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
                                'btn-control': !isHorizontal,
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
                                    'text-center': !isHorizontal,
                                    'text-end': isHorizontal,
                                    'text-muted': value === null,
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
                <MediaGalleryModal
                    value={value}
                    multiple={multiple}
                    autoClose={autoClose}
                    onChange={onChangeMedia}
                    types={type}
                    onClosed={onModalClosed}
                />
            ) : null}
        </>
    );
}

MediaModal.withModal = true;

export default MediaModal;
