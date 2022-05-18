/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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
import styles from './styles.module.scss';

const propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    onShare: PropTypes.func,
    onShareWindowClose: PropTypes.func,
    focusable: PropTypes.bool,
};

const defaultProps = {
    className: null,
    itemClassName: null,
    labelClassName: null,
    title: null,
    url: null,
    onShare: null,
    onShareWindowClose: null,
    focusable: true,
};

const ShareOptions = ({
    className,
    itemClassName,
    labelClassName
    title,
    url,
    onShare,
    onShareWindowClose,
    focusable,
}) => {
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
                if (onShareWindowClose !== null) {
                    onShareWindowClose();
                }
            },
        }),
        [url, onShareWindowClose],
    );

    const shareIconProps = useMemo(() => ({ size: 64, round: true }), []);

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
                    tabIndex={focusable ? null : '-1'}
                >
                    <LinkedinIcon {...shareIconProps} />
                </LinkedinShareButton>
            )
        },
    ];

    return (
        <div
            className={classNames([
                style.container,
                { [className]: className !== null },
            ])}
        >
            { shareOptions.map(({id, label, icon}) => (
                <div
                    key={id}
                    className={classNames([
                        style.item,
                        { [itemClassName]: itemClassName !== null },
                    ])}
                >
                    {icon}
                    <div
                        className={classNames([
                            style.container,
                            { [labelClassName]: labelClassName !== null },
                        ])}
                    >
                        {label}
                    </div>
                </div>
            ))}
        </div>
    );
};

ShareOptions.propTypes = propTypes;
ShareOptions.defaultProps = defaultProps;

export default ShareOptions;