/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useMemo, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from 'react-share';
import { useDocumentEvent } from '@micromag/core/hooks';
import { copyToClipboard } from '@micromag/core/utils';
import { Button, Close } from '@micromag/core/components';
import LinkIcon from '../icons/Link';
import styles from '../../styles/partials/share-modal.module.scss';

const propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    opened: PropTypes.bool,
    className: PropTypes.string,
    onShare: PropTypes.func,
    onCancel: PropTypes.func,
};

const defaultProps = {
    url: null,
    title: null,
    opened: false,
    className: null,
    onShare: null,
    onCancel: null,
};

const ShareModal = ({ url, title, opened, className, onShare, onCancel }) => {
    const modalRef = useRef();
    const [linkCopied, setLinkCopied] = useState(false);
    const onShareButtonClick = useCallback(
        (type) => {
            if (onShare !== null) {
                onShare(type);
            }
        },
        [onShare],
    );

    const shareButtonProps = useMemo(
        () => ({
            url,
            onShareWindowClose: () => {
                if (onCancel !== null) {
                    onCancel();
                }
            },
        }),
        [url, onCancel],
    );

    const shareIconProps = useMemo(() => ({ size: 64, round: true }), []);

    const onClickCopy = useCallback(() => {
        copyToClipboard(url)
            .then(() => {
                setLinkCopied(true);
                setTimeout(() => {
                    setLinkCopied(false);
                }, 2000);
            });
    }, [setLinkCopied]);

    const onClickLinkInput = useCallback(e => {
        const { target } = e;

        target.setSelectionRange(0, target.value.length);
    }, []);

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

    const shareOptions = [
        {
            id: 'email',
            label: <FormattedMessage defaultMessage="Email" description="Share option label" />,
            icon: (
                <EmailShareButton
                    {...shareButtonProps}
                    subject={title}
                    beforeOnClick={() => {
                        onShareButtonClick('Email');
                        return Promise.resolve();
                    }}
                    tabIndex={opened ? null : '-1'}
                >
                    <EmailIcon {...shareIconProps} />
                </EmailShareButton>
            )
        },
        {
            id: 'facebook',
            label: 'Facebook',
            icon: (
                <FacebookShareButton
                    {...shareButtonProps}
                    quote={title}
                    beforeOnClick={() => {
                        onShareButtonClick('Facebook');
                        return Promise.resolve();
                    }}
                    tabIndex={opened ? null : '-1'}
                >
                    <FacebookIcon {...shareIconProps} />
                </FacebookShareButton>
            ),
        },
        {
            id: 'twitter',
            label: 'Twitter',
            icon: (
                <TwitterShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('Twitter');
                        return Promise.resolve();
                    }}
                    tabIndex={opened ? null : '-1'}
                >
                    <TwitterIcon {...shareIconProps} />
                </TwitterShareButton>
            )
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            icon: (
                <LinkedinShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('LinkedIns');
                        return Promise.resolve();
                    }}
                    tabIndex={opened ? null : '-1'}
                >
                    <LinkedinIcon {...shareIconProps} />
                </LinkedinShareButton>
            )
        },
    ];

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
                        <Close className={styles.closeIcon} border={false} />
                    </Button>
                </div>
                <div className={styles.content}>
                    <div className={styles.buttons}>
                        { shareOptions.map(({id, label, icon}) => (
                            <div key={id} className={styles.shareOption}>
                                {icon}
                                <div className={styles.shareLabel}>
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.otherOptions}>
                        <div
                            className={classNames([
                                styles.copyLink,
                                { [styles.isLinkCopied]: linkCopied },
                            ])}
                        >
                            <input
                                className={styles.screenUrlInput}
                                type="text"
                                value={url}
                                onClick={onClickLinkInput}
                                readOnly
                            />
                            <Button className={styles.copyUrlButton} onClick={onClickCopy} focusable={opened}>
                                <LinkIcon className={styles.linkIcon} />
                            </Button>
                            <div className={styles.successfulCopyMessage}>
                                <FormattedMessage
                                    defaultMessage="Link copied to clipboard!"
                                    description="Message displayed once text was copied successfully."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ShareModal.propTypes = propTypes;
ShareModal.defaultProps = defaultProps;

export default ShareModal;
