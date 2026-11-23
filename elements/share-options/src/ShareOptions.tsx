import classNames from 'classnames';
import isArray from 'lodash-es/isArray';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { BoxStyle, TextStyle, ViewerTheme } from '@micromag/core';
import { Button } from '@micromag/core/components';
import {
    copyToClipboard,
    getStyleFromBox,
    getStyleFromColor,
    getStyleFromText,
} from '@micromag/core/utils';

import EmailIcon from './EmailIcon';
import NetworkIcon from './NetworkIcon';
import ShareButton from './ShareButton';
import ShareLinkIcon from './ShareLinkIcon';
import SmsIcon from './SmsIcon';
import {
    getEmailLink,
    getFacebookLink,
    getLinkedinLink,
    getTwitterLink,
    getWhatsappLink,
} from './shareLinks';

import styles from './styles.module.css';

interface ShareOptionsProps {
    className?: string | null;
    itemClassName?: string | null;
    labelClassName?: string | null;
    buttonClassName?: string | null;
    title?: string | null;
    url?: string | null;
    options?: string[] | null;
    buttonsStyle?: BoxStyle | null;
    buttonsTextStyle?: TextStyle | null;
    iconSize?: number;
    theme?: ViewerTheme | null;
    onShare?: ((...args: unknown[]) => void) | null;
    onClose?: ((...args: unknown[]) => void) | null;
    focusable?: boolean;
}

function ShareOptions({
    className = null,
    itemClassName = null,
    labelClassName = null,
    buttonClassName = null,
    title = null,
    url = null,
    options = null,
    buttonsStyle = null,
    buttonsTextStyle = null,
    iconSize = 45,
    theme = null,
    onShare = null,
    onClose = null,
    focusable = true,
}: ShareOptionsProps) {
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

    const onClickCopy = () => {
        copyToClipboard(url).then(() => {
            setLinkCopied(true);
            setTimeout(() => {
                setLinkCopied(false);
            }, 2000);
        });
    };

    const onShareButtonClick = (type) => {
        if (onShare !== null) {
            onShare(type);
        }
    };

    const onShareWindowClose = () => {
        if (onClose !== null) {
            onClose();
        }
    };

    const shareUrl = url || '';
    const shareButtonProps = {
        className: classNames([styles.button, buttonClassName]),
        focusable,
        style: finalStyles,
        onWindowClose: onShareWindowClose,
    };

    const shareIconProps = {
        className: styles.icon,
        size: iconSize,
    };

    const shareOptions = [
        {
            id: 'facebook',
            button: (
                <ShareButton
                    {...shareButtonProps}
                    link={getFacebookLink(shareUrl)}
                    onClick={() => onShareButtonClick('Facebook')}
                >
                    <NetworkIcon network="facebook" {...shareIconProps} />
                    <div className={classNames([styles.label, labelClassName])}>Facebook</div>
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
                </ShareButton>
            ),
        },
        {
            id: 'twitter',
            button: (
                <ShareButton
                    {...shareButtonProps}
                    link={getTwitterLink(shareUrl, title)}
                    onClick={() => onShareButtonClick('Twitter')}
                >
                    <NetworkIcon network="twitter" {...shareIconProps} />
                    <div className={classNames([styles.label, labelClassName])}>X (Twitter)</div>
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
                </ShareButton>
            ),
        },
        {
            id: 'linkedin',
            button: (
                <ShareButton
                    {...shareButtonProps}
                    link={getLinkedinLink(shareUrl, title)}
                    windowSize={{ width: 750, height: 600 }}
                    onClick={() => onShareButtonClick('LinkedIn')}
                >
                    <NetworkIcon network="linkedin" {...shareIconProps} />
                    <div className={classNames([styles.label, labelClassName])}>LinkedIn</div>
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
                </ShareButton>
            ),
        },
        {
            id: 'whatsapp',
            button: (
                <ShareButton
                    {...shareButtonProps}
                    link={getWhatsappLink(shareUrl, title)}
                    onClick={() => onShareButtonClick('Whatsapp')}
                >
                    <NetworkIcon network="whatsapp" {...shareIconProps} />
                    <div className={classNames([styles.label, labelClassName])}>Whatsapp</div>
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
                </ShareButton>
            ),
        },
        {
            id: 'email',
            button: (
                <ShareButton
                    {...shareButtonProps}
                    link={getEmailLink(shareUrl, title)}
                    windowSize={null}
                    onClick={() => onShareButtonClick('Email')}
                >
                    <EmailIcon {...shareIconProps} />
                    <div className={classNames([styles.label, labelClassName])}>
                        <FormattedMessage defaultMessage="Email" description="Share option label" />
                    </div>
                    <div className={styles.spacer} style={{ width: `${iconSize}px` }} />
                </ShareButton>
            ),
        },
        {
            id: 'sms',
            button: (
                <Button
                    className={classNames([styles.button, buttonClassName])}
                    href={`sms:?&body=${url}`}
                    focusable={focusable}
                    style={finalStyles}
                    external
                    withoutBootstrapStyles
                >
                    <SmsIcon {...shareIconProps} />
                    <div className={classNames([styles.label, labelClassName])}>
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
        options !== null && isArray(options)
            ? shareOptions.filter((opt) => options.includes(opt.id))
            : shareOptions;

    return (
        <div className={classNames([styles.container, className])}>
            <div className={styles.options}>
                {hasShareLink ? (
                    <div
                        className={classNames([
                            styles.item,
                            itemClassName,
                            {
                                [styles.isLinkCopied]: linkCopied,
                            },
                        ])}
                    >
                        <Button
                            className={classNames([styles.button, buttonClassName])}
                            onClick={onClickCopy}
                            focusable={focusable}
                            style={finalStyles}
                            withoutBootstrapStyles
                        >
                            <ShareLinkIcon {...shareIconProps} />
                            <div className={classNames([styles.label, labelClassName])}>
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
                    <div key={id} className={classNames([styles.item, itemClassName])}>
                        {button}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShareOptions;
