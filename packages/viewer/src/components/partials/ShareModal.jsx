/* eslint-disable react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPreview, Button, Close } from '@micromag/core/components';
import { useDocumentEvent } from '@micromag/core/hooks';
import ShareOptions from '@micromag/element-share-options';

import styles from '../../styles/partials/share-modal.module.scss';

const propTypes = {
    items: MicromagPropTypes.menuItems,
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    opened: PropTypes.bool,
    className: PropTypes.string,
    onShare: PropTypes.func,
    currentScreenIndex: PropTypes.number,
    onCancel: PropTypes.func,
};

const defaultProps = {
    items: null,
    url: null,
    title: null,
    description: null,
    opened: false,
    className: null,
    onShare: null,
    currentScreenIndex: 0,
    onCancel: null,
};

const ShareModal = ({
    items,
    url,
    title,
    description,
    opened,
    className,
    onShare,
    onCancel,
    currentScreenIndex,
}) => {
    const modalRef = useRef();
    const [shareCurrentScreen, setShareCurrentScreen] = useState(false);
    const [shareUrl, setShareUrl] = useState(url);

    const onDocumentClick = useCallback(
        (e) => {
            const { target } = e || {};

            if (!modalRef.current || modalRef.current.contains(target)) {
                return;
            }

            onCancel();
        },
        [opened, onCancel],
    );

    const onShareModeChange = useCallback(() => {
        setShareCurrentScreen((value) => !value);
    }, [setShareCurrentScreen]);

    useDocumentEvent('click', onDocumentClick, opened);

    useEffect(() => {
        setShareUrl(
            shareCurrentScreen && currentScreenIndex !== 0 ? `${url}/${currentScreenIndex}` : url,
        );
    }, [shareCurrentScreen, currentScreenIndex, setShareUrl]);

    const sharedScreen =
        items !== null ? items[shareCurrentScreen ? currentScreenIndex : 0].screen : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                    [styles.opened]: opened,
                },
            ])}
            aria-hidden={opened ? null : '-1'}
        >
            <div className={styles.modal} ref={modalRef}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>
                        <FormattedMessage defaultMessage="Share" description="Modal heading" />
                    </h2>

                    <Button className={styles.close} onClick={onCancel} focusable={opened}>
                        <Close className={styles.closeIcon} border="none" fill="transparent" />
                    </Button>
                </div>

                <div className={styles.content}>
                    <div className={styles.preview}>
                        <div className={styles.previewCover}>
                            <ScreenPreview
                                screen={sharedScreen}
                                width={100}
                                height={150}
                                withSize
                            />
                        </div>
                        <div className={styles.previewInfo}>
                            <h3>{title}</h3>
                            <p>{description}</p>
                        </div>
                    </div>

                    {currentScreenIndex !== 0 ? (
                        <div className={styles.mode}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="currentScreen"
                                    value="currentScreen"
                                    onChange={onShareModeChange}
                                    checked={shareCurrentScreen}
                                />
                                <FormattedMessage
                                    defaultMessage="Start from the current screen"
                                    description="Share mode"
                                />
                            </label>
                        </div>
                    ) : null}
                </div>

                <ShareOptions
                    className={styles.shareOptions}
                    itemClassName={styles.shareOptionsItem}
                    buttonClassName={styles.shareOptionsButton}
                    title={title}
                    url={shareUrl}
                    focusable={opened}
                    onShare={onShare}
                    onClose={onCancel}
                />
            </div>
        </div>
    );
};

ShareModal.propTypes = propTypes;
ShareModal.defaultProps = defaultProps;

export default ShareModal;
