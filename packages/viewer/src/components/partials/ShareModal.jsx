/* eslint-disable react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, Close } from '@micromag/core/components';
import { useDocumentEvent } from '@micromag/core/hooks';
import ShareOptions from '@micromag/element-share-options';

import styles from '../../styles/partials/share-modal.module.scss';

const propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    opened: PropTypes.bool,
    className: PropTypes.string,
    onShare: PropTypes.func,
    currentScreenIndex: PropTypes.number,
    onCancel: PropTypes.func,
};

const defaultProps = {
    url: null,
    title: null,
    opened: false,
    className: null,
    onShare: null,
    currentScreenIndex: 0,
    onCancel: null,
};

const ShareModal = ({ url, title, opened, className, onShare, onCancel, currentScreenIndex }) => {
    const modalRef = useRef();
    const [shareCurrentScreen, setShareCurrentScreen] = useState(true);
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

    useDocumentEvent('click', onDocumentClick, opened);

    useEffect(() => {
        setShareUrl(
            shareCurrentScreen && currentScreenIndex !== 0 ? `${url}/${currentScreenIndex}` : url,
        );
    }, [shareCurrentScreen, currentScreenIndex, setShareUrl]);

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
                        {/* <div className={styles.cover}>{shareUrl}</div> */}

                        {currentScreenIndex !== 0 ? (
                            <div className={styles.mode}>
                                <h3>
                                    <FormattedMessage
                                        defaultMessage="Start from:"
                                        description="Share Modal heading"
                                    />
                                </h3>

                                <div className={styles.modeOptions}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="[onlyScreen]"
                                            value={shareCurrentScreen}
                                            onChange={() => setShareCurrentScreen(true)}
                                            checked={shareCurrentScreen}
                                        />
                                        <FormattedMessage
                                            defaultMessage="Current screen"
                                            description="Share mode"
                                        />
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="[onlyScreen]"
                                            value={shareCurrentScreen}
                                            onChange={() => setShareCurrentScreen(false)}
                                            checked={!shareCurrentScreen}
                                        />
                                        <FormattedMessage
                                            defaultMessage="First screen"
                                            description="Share mode"
                                        />
                                    </label>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>

                <ShareOptions
                    className={styles.shareOptions}
                    itemClassName={styles.shareOptionsItem}
                    buttonInnerClassName={styles.shareOptionsInner}
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
