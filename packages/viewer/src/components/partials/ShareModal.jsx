/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDocumentEvent } from '@micromag/core/hooks';
import { Button, Close } from '@micromag/core/components';
import ShareOptions from '@micromag/element-share-options';
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
                        <Close className={styles.closeIcon} border="none" />
                    </Button>
                </div>
                <div className={styles.content}>
                    <ShareOptions
                        className={styles.shareOptions}
                        title={title}
                        url={url}
                        focusable={opened}
                        onShare={onShare}
                        onClose={onCancel}
                    />
                </div>
            </div>
        </div>
    );
};

ShareModal.propTypes = propTypes;
ShareModal.defaultProps = defaultProps;

export default ShareModal;
