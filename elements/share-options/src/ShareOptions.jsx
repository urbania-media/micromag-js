/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    EmailShareButton, // EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon, // FacebookMessengerShareButton,
    // FacebookMessengerIcon,
} from 'react-share';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import {
    getStyleFromText,
    getStyleFromColor,
    getStyleFromBox,
    copyToClipboard,
} from '@micromag/core/utils';

import EmailIcon from './EmailIcon';
import ShareLinkIcon from './ShareLinkIcon';
import SmsIcon from './SmsIcon';

import styles from './styles.module.scss';

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    buttonsStyle: MicromagPropTypes.boxStyle,
    buttonsTextStyle: MicromagPropTypes.textStyle,
    iconSize: PropTypes.number,
    theme: MicromagPropTypes.viewerTheme,
    onShare: PropTypes.func,
    onClose: PropTypes.func,
    focusable: PropTypes.bool,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    labelClassName: null,
    buttonClassName: null,
    title: null,
    url: null,
    options: null,
    buttonsStyle: null,
    buttonsTextStyle: null,
    iconSize: 45,
    theme: null,
    onShare: null,
    onClose: null,
    focusable: true,
};

const ShareOptions = ({
    className,
    itemClassName,
    labelClassName,
    buttonClassName,
    title,
    url,
    options,
    buttonsStyle,
    buttonsTextStyle,
    iconSize,
    theme,
    onShare,
    onClose,
    focusable,
}) => {
    const { menuTheme = null } = theme || {};
    const { colors = null } = menuTheme || {};
    const { primary: brandPrimaryColor = null } = colors || {};
    const colorStyles = getStyleFromColor(brandPrimaryColor, 'color');

    let finalStyles = colorStyles;

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
            className: classNames([styles.button, { [buttonClassName]: buttonClassName !== null }]),
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
            className: styles.icon,
            size: iconSize,
            bgStyle: {
                fill: 'none',
            },
            iconFillColor: 'currentColor',
        }),
        [iconSize],
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
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
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
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
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
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
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
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
                </WhatsappShareButton>
            ),
        },
        // {
        //     id: 'facebookMessenger',
        //     button: (
        //         <FacebookMessengerShareButton
        //             {...shareButtonProps}
        //             title={title}
        //             appId="741129940350872"
        //             beforeOnClick={() => {
        //                 onShareButtonClick('Whatsapp');
        //                 return Promise.resolve();
        //             }}
        //             tabIndex={focusable ? null : '-1'}
        //             style={finalStyles}
        //         >
        //             <FacebookMessengerIcon {...shareIconProps} />
        //             <div
        //                 className={classNames([
        //                     styles.label,
        //                     { [labelClassName]: labelClassName !== null },
        //                 ])}
        //             >
        //                 Facebook Messenger
        //             </div>
        //         </FacebookMessengerShareButton>
        //     ),
        // },
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
                    style={finalStyles}
                >
                    <EmailIcon {...shareIconProps} />
                    <div
                        className={classNames([
                            styles.label,
                            { [labelClassName]: labelClassName !== null },
                        ])}
                    >
                        <FormattedMessage defaultMessage="Email" description="Share option label" />
                    </div>
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
                </EmailShareButton>
            ),
        },
        {
            id: 'sms',
            button: (
                <Button
                    className={classNames([
                        styles.button,
                        { [buttonClassName]: buttonClassName !== null },
                    ])}
                    href={`sms:?body=${title}: ${url}`}
                    focusable={focusable}
                    style={finalStyles}
                    external
                    withoutBootstrapStyles
                >
                    <SmsIcon {...shareIconProps} />
                    <div
                        className={classNames([
                            styles.label,
                            { [labelClassName]: labelClassName !== null },
                        ])}
                    >
                        <span className={styles.labelText}>
                            <FormattedMessage
                                defaultMessage="SMS"
                                description="Share button label"
                            />
                        </span>
                    </div>
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
                </Button>
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
                            className={classNames([
                                styles.button,
                                { [buttonClassName]: buttonClassName !== null },
                            ])}
                            onClick={onClickCopy}
                            focusable={focusable}
                            style={finalStyles}
                            withoutBootstrapStyles
                        >
                            <ShareLinkIcon {...shareIconProps} />
                            <div
                                className={classNames([
                                    styles.label,
                                    { [labelClassName]: labelClassName !== null },
                                ])}
                            >
                                <span className={styles.labelText}>
                                    {!linkCopied ? (
                                        <FormattedMessage
                                            defaultMessage="Copy link"
                                            description="Share button label"
                                        />
                                    ) : null}
                                    {linkCopied ? (
                                        <FormattedMessage
                                            defaultMessage="Link copied!"
                                            description="Message displayed once text was copied successfully."
                                        />
                                    ) : null}
                                </span>
                            </div>
                            <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
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
