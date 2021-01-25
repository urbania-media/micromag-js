/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'react-share';
import { useDocumentEvent } from '@micromag/core/hooks';

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
    const containerRef = useRef(null);
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

    const shareIconProps = useMemo(() => ({ size: 32, round: true }), []);

    const onDocumentClick = useCallback( (e) => {
        const target = e.currentTarget;
        if (!containerRef.current || containerRef.current.contains(target)) {
            return;
        }
        if (onCancel !== null) {
            onCancel();
        }
    }, [opened, onCancel]);

    useDocumentEvent('click', onDocumentClick, opened);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                    [styles.opened]: opened,
                },
            ])}
            ref={containerRef}
        >
            <div className={styles.content}>
                <div className={styles.buttons}>
                    <FacebookShareButton
                        {...shareButtonProps}
                        quote={title}
                        beforeOnClick={() => {
                            onShareButtonClick('Facebook');
                        }}
                    >
                        <FacebookIcon {...shareIconProps} />
                    </FacebookShareButton>
                    <TwitterShareButton
                        {...shareButtonProps}
                        title={title}
                        beforeOnClick={() => {
                            onShareButtonClick('Twitter');
                        }}
                    >
                        <TwitterIcon {...shareIconProps} />
                    </TwitterShareButton>
                    <EmailShareButton
                        {...shareButtonProps}
                        subject={title}
                        beforeOnClick={() => {
                            onShareButtonClick('Email');
                        }}
                    >
                        <EmailIcon {...shareIconProps} />
                    </EmailShareButton>
                </div>
            </div>
        </div>
    );
};

ShareModal.propTypes = propTypes;
ShareModal.defaultProps = defaultProps;

export default ShareModal;
