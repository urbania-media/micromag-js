/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useMemo } from 'react';
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
    WhatsappShareButton,
    WhatsappIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
} from 'react-share';
import { Button } from '@micromag/core/components';
import { copyToClipboard } from '@micromag/core/utils';
import ShareLinkIcon from './ShareLinkIcon';
import styles from './styles.module.scss';

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onShare: PropTypes.func,
    onClose: PropTypes.func,
    focusable: PropTypes.bool,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    labelClassName: null,
    title: null,
    url: null,
    options: null,
    onShare: null,
    onClose: null,
    focusable: true,
};

const ShareOptions = ({
    className,
    itemClassName,
    labelClassName,
    title,
    url,
    options,
    onShare,
    onClose,
    focusable,
}) => {
    const [linkCopied, setLinkCopied] = useState(false);

    const onClickCopy = useCallback(() => {
        copyToClipboard(url).then(() => {
            setLinkCopied(true);
            setTimeout(() => {
                setLinkCopied(false);
            }, 2000);
        });
    }, [setLinkCopied]);

    const onClickLinkInput = useCallback((e) => {
        const { target } = e;

        target.setSelectionRange(0, target.value.length);
    }, []);

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
                if (onClose !== null) {
                    onClose();
                }
            },
        }),
        [url, onClose],
    );

    const shareIconProps = useMemo(() => ({ size: 50, round: true }), []);

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
                    tabIndex={focusable ? null : '-1'}
                >
                    <EmailIcon {...shareIconProps} />
                </EmailShareButton>
            ),
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
                    tabIndex={focusable ? null : '-1'}
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
                    tabIndex={focusable ? null : '-1'}
                >
                    <TwitterIcon {...shareIconProps} />
                </TwitterShareButton>
            ),
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            icon: (
                <LinkedinShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('LinkedIn');
                        return Promise.resolve();
                    }}
                    tabIndex={focusable ? null : '-1'}
                >
                    <LinkedinIcon {...shareIconProps} />
                </LinkedinShareButton>
            ),
        },
        {
            id: 'whatsapp',
            label: 'Whatsapp',
            icon: (
                <WhatsappShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('Whatsapp');
                        return Promise.resolve();
                    }}
                    tabIndex={focusable ? null : '-1'}
                >
                    <WhatsappIcon {...shareIconProps} />
                </WhatsappShareButton>
            ),
        },
        {
            id: 'facebookMessenger',
            label: 'Facebook Messenger',
            icon: (
                <FacebookMessengerShareButton
                    {...shareButtonProps}
                    title={title}
                    appId="741129940350872"
                    beforeOnClick={() => {
                        onShareButtonClick('Whatsapp');
                        return Promise.resolve();
                    }}
                    tabIndex={focusable ? null : '-1'}
                >
                    <FacebookMessengerIcon {...shareIconProps} />
                </FacebookMessengerShareButton>
            ),
        },
    ];
    const hasShareLink = options !== null ? options.includes('copylink') : true; // default is true
    const selectedOptions =
        options !== null ? shareOptions.filter((opt) => options.includes(opt.id)) : shareOptions;

    return (
        <div className={classNames([styles.container, { [className]: className !== null }])}>
            <div className={styles.options}>
                {selectedOptions.map(({ id, label, icon }) => (
                    <div
                        key={id}
                        className={classNames([
                            styles.item,
                            { [itemClassName]: itemClassName !== null },
                        ])}
                    >
                        {icon}
                        <div
                            className={classNames([
                                styles.label,
                                { [labelClassName]: labelClassName !== null },
                            ])}
                        >
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            {hasShareLink ? (
                <div className={classNames([styles.copyLink, { [styles.isLinkCopied]: linkCopied }])}>
                    <input
                        className={styles.screenUrlInput}
                        type="text"
                        value={url}
                        onClick={onClickLinkInput}
                        readOnly
                    />
                    <Button
                        className={styles.copyUrlButton}
                        onClick={onClickCopy}
                        focusable={focusable}
                    >
                        <ShareLinkIcon className={styles.linkIcon} />
                    </Button>
                    <div className={styles.successfulCopyMessage}>
                        <FormattedMessage
                            defaultMessage="Link copied to clipboard!"
                            description="Message displayed once text was copied successfully."
                        />
                    </div>
                </div>
            ): null}
        </div>
    );
};

ShareOptions.propTypes = propTypes;
ShareOptions.defaultProps = defaultProps;

export default ShareOptions;
