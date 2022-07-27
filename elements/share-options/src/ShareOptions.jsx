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

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { getStyleFromText, getStyleFromBox, copyToClipboard } from '@micromag/core/utils';

import ShareLinkIcon from './ShareLinkIcon';

import styles from './styles.module.scss';

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    buttonInnerClassName: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    buttonsStyle: MicromagPropTypes.boxStyle,
    buttonsTextStyle: MicromagPropTypes.textStyle,
    onShare: PropTypes.func,
    onClose: PropTypes.func,
    focusable: PropTypes.bool,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    labelClassName: null,
    buttonInnerClassName: null,
    title: null,
    url: null,
    options: null,
    buttonsStyle: null,
    buttonsTextStyle: null,
    onShare: null,
    onClose: null,
    focusable: true,
};

const ShareOptions = ({
    className,
    itemClassName,
    labelClassName,
    buttonInnerClassName,
    title,
    url,
    options,
    buttonsStyle,
    buttonsTextStyle,
    onShare,
    onClose,
    focusable,
}) => {
    let finalStyles = null;

    if (buttonsTextStyle !== null) {
        finalStyles = {
            ...finalStyles,
            ...getStyleFromText(buttonsTextStyle),
        };
    }

    if (buttonsStyle !== null) {
        finalStyles = {
            ...finalStyles,
            ...getStyleFromBox(buttonsStyle),
        };
    }

    const [linkCopied, setLinkCopied] = useState(false);

    const onClickCopy = useCallback(() => {
        copyToClipboard(url).then(() => {
            setLinkCopied(true);
            setTimeout(() => {
                setLinkCopied(false);
            }, 2000);
        });
    }, [url, setLinkCopied]);

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
            className: styles.shareButton,
            url,
            onShareWindowClose: () => {
                if (onClose !== null) {
                    onClose();
                }
            },
        }),
        [url, onClose],
    );

    const shareIconProps = useMemo(
        () => ({
            size: 50,
            bgStyle: {
                fill: 'none',
            },
            iconFillColor: 'currentColor',
        }),
        [],
    );

    const shareOptions = [
        {
            id: 'facebook',
            button: (
                <FacebookShareButton
                    {...shareButtonProps}
                    quote={title}
                    beforeOnClick={() => {
                        onShareButtonClick('Facebook');
                        return Promise.resolve();
                    }}
                    tabIndex={focusable ? null : '-1'}
                >
                    <div
                        className={classNames([
                            styles.shareButtonInner,
                            { [buttonInnerClassName]: buttonInnerClassName !== null },
                        ])}
                        style={finalStyles}
                    >
                        <FacebookIcon {...shareIconProps} />
                        <div
                            className={classNames([
                                styles.label,
                                { [labelClassName]: labelClassName !== null },
                            ])}
                        >
                            Facebook
                        </div>
                    </div>
                </FacebookShareButton>
            ),
        },
        {
            id: 'twitter',
            button: (
                <TwitterShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('Twitter');
                        return Promise.resolve();
                    }}
                    tabIndex={focusable ? null : '-1'}
                >
                    <div
                        className={classNames([
                            styles.shareButtonInner,
                            { [buttonInnerClassName]: buttonInnerClassName !== null },
                        ])}
                        style={finalStyles}
                    >
                        <TwitterIcon {...shareIconProps} />
                        <div
                            className={classNames([
                                styles.label,
                                { [labelClassName]: labelClassName !== null },
                            ])}
                        >
                            Twitter
                        </div>
                    </div>
                </TwitterShareButton>
            ),
        },
        {
            id: 'linkedin',
            button: (
                <LinkedinShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('LinkedIn');
                        return Promise.resolve();
                    }}
                    tabIndex={focusable ? null : '-1'}
                >
                    <div
                        className={classNames([
                            styles.shareButtonInner,
                            { [buttonInnerClassName]: buttonInnerClassName !== null },
                        ])}
                        style={finalStyles}
                    >
                        <LinkedinIcon {...shareIconProps} />
                        <div
                            className={classNames([
                                styles.label,
                                { [labelClassName]: labelClassName !== null },
                            ])}
                        >
                            LinkedIn
                        </div>
                    </div>
                </LinkedinShareButton>
            ),
        },
        {
            id: 'whatsapp',
            button: (
                <WhatsappShareButton
                    {...shareButtonProps}
                    title={title}
                    beforeOnClick={() => {
                        onShareButtonClick('Whatsapp');
                        return Promise.resolve();
                    }}
                    tabIndex={focusable ? null : '-1'}
                >
                    <div
                        className={classNames([
                            styles.shareButtonInner,
                            { [buttonInnerClassName]: buttonInnerClassName !== null },
                        ])}
                        style={finalStyles}
                    >
                        <WhatsappIcon {...shareIconProps} />
                        <div
                            className={classNames([
                                styles.label,
                                { [labelClassName]: labelClassName !== null },
                            ])}
                        >
                            Whatsapp
                        </div>
                    </div>
                </WhatsappShareButton>
            ),
        },
        {
            id: 'facebookMessenger',
            button: (
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
                    <div
                        className={classNames([
                            styles.shareButtonInner,
                            { [buttonInnerClassName]: buttonInnerClassName !== null },
                        ])}
                        style={finalStyles}
                    >
                        <FacebookMessengerIcon {...shareIconProps} />
                        <div
                            className={classNames([
                                styles.label,
                                { [labelClassName]: labelClassName !== null },
                            ])}
                        >
                            Facebook Messenger
                        </div>
                    </div>
                </FacebookMessengerShareButton>
            ),
        },
        {
            id: 'email',
            button: (
                <EmailShareButton
                    {...shareButtonProps}
                    subject={title}
                    beforeOnClick={() => {
                        onShareButtonClick('Email');
                        return Promise.resolve();
                    }}
                    tabIndex={focusable ? null : '-1'}
                >
                    <div
                        className={classNames([
                            styles.shareButtonInner,
                            { [buttonInnerClassName]: buttonInnerClassName !== null },
                        ])}
                        style={finalStyles}
                    >
                        <EmailIcon {...shareIconProps} />
                        <div
                            className={classNames([
                                styles.label,
                                { [labelClassName]: labelClassName !== null },
                            ])}
                        >
                            <FormattedMessage
                                defaultMessage="Email"
                                description="Share option label"
                            />
                        </div>
                    </div>
                </EmailShareButton>
            ),
        },
    ];

    const hasShareLink = options !== null ? options.includes('copylink') : true; // default is true
    const selectedOptions =
        options !== null ? shareOptions.filter((opt) => options.includes(opt.id)) : shareOptions;

    return (
        <div className={classNames([styles.container, { [className]: className !== null }])}>
            <div className={styles.options}>
                {hasShareLink ? (
                    <div
                        className={classNames([
                            styles.item,
                            {
                                [itemClassName]: itemClassName !== null,
                                [styles.isLinkCopied]: linkCopied,
                            },
                        ])}
                    >
                        <Button
                            className={styles.shareButton}
                            onClick={onClickCopy}
                            focusable={focusable}
                        >
                            <div
                                className={classNames([
                                    styles.shareButtonInner,
                                    { [buttonInnerClassName]: buttonInnerClassName !== null },
                                ])}
                                style={finalStyles}
                            >
                                <ShareLinkIcon {...shareIconProps} />
                                <div
                                    className={classNames([
                                        styles.label,
                                        { [labelClassName]: labelClassName !== null },
                                    ])}
                                >
                                    {!linkCopied ? (
                                        <FormattedMessage
                                            defaultMessage="Copy link"
                                            description="Share button label"
                                        />
                                    ): null}
                                    {linkCopied ? (
                                        <FormattedMessage
                                            defaultMessage="Link copied to clipboard!"
                                            description="Message displayed once text was copied successfully."
                                        />
                                    ):null}
                                </div>
                            </div>
                        </Button>

                    </div>
                ) : null}
                {selectedOptions.map(({ id, button }) => (
                    <div
                        key={id}
                        className={classNames([
                            styles.item,
                            { [itemClassName]: itemClassName !== null },
                        ])}
                    >
                        {button}
                    </div>
                ))}
            </div>
        </div>
    );
};

ShareOptions.propTypes = propTypes;
ShareOptions.defaultProps = defaultProps;

export default ShareOptions;
