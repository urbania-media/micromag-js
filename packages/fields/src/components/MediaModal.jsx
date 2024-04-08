/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
// import { getCSRFHeaders } from '@folklore/fetch';
import classNames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, ModalDialog as Dialog, Modal } from '@micromag/core/components';
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
        if (autoClose) {
            onClose();
        }
    }, [value, onChange, onClose, autoClose]);

    console.log('value', value);
    console.log('type', type, isHorizontal);
    console.log('props', props);

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
                className="d-inline-block"
                {...props}
            >
                <button
                    type="button"
                    className={classNames([
                        styles.previewButton,
                        {
                            [styles.shaded]: !isHorizontal,
                            'p-2': !isHorizontal,
                            'mx-auto': !isHorizontal,
                            'bg-dark': !isHorizontal,
                        },
                    ])}
                    onClick={onOpen}
                >
                    <span className="row">
                        <span
                            className={classNames([
                                styles.label,
                                'col',
                                'text-monospace',
                                'text-truncate',
                                {
                                    'fw-bold': value !== null,
                                    'text-start': !isHorizontal,
                                    'text-end': isHorizontal,
                                },
                            ])}
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
                            type={type}
                            isPicker
                            onChange={onChangeMedia}
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
