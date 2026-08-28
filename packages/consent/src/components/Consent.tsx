import classNames from 'classnames';
import React, { useCallback, useId } from 'react';
import { useIntl } from 'react-intl';

import CloseButton from './buttons/Close';
import CookiesForm from './forms/Cookies';

import styles from '../styles/consent.module.css';

interface ConsentProps {
    urls?: { privacy?: string; terms?: string } | null;
    labels?: {
        title?: string;
        description?: string;
        privacy?: string;
        terms?: string;
        close?: string;
    } | null;
    onChange?: ((...args: unknown[]) => void) | null;
    onSubmit?: ((...args: unknown[]) => void) | null;
    onClose?: ((...args: unknown[]) => void) | null;
    withClose?: boolean;
    className?: string | null;
    children?: React.ReactNode | null;
}

function Consent({
    urls = null,
    labels = null,
    onChange = null,
    onSubmit = null,
    onClose = null,
    withClose = false,
    className = null,
    children = null,
    ...props
}: ConsentProps) {
    const intl = useIntl();
    const { close: closeLabel = null } = labels || {};
    const titleId = `${useId()}-title`;
    const closeable = onClose !== null && withClose;
    const onKeyDown = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                onClose(event);
            }
        },
        [onClose],
    );
    return (
        <div
            className={classNames([styles.container, className])}
            role="region"
            aria-labelledby={titleId}
            onKeyDown={closeable ? onKeyDown : undefined}
        >
            {closeable ? (
                <CloseButton
                    type="button"
                    className={styles.close}
                    onClick={onClose}
                    aria-label={
                        closeLabel ||
                        intl.formatMessage({
                            defaultMessage: 'Close the privacy settings',
                            description: 'Button label',
                        })
                    }
                />
            ) : null}
            {children}
            <CookiesForm
                className={styles.form}
                titleId={titleId}
                urls={urls}
                labels={labels}
                onChange={onChange}
                onSubmit={onSubmit}
                onClose={onClose}
                {...props}
            />
        </div>
    );
}

export default Consent;
