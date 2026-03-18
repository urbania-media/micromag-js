import classNames from 'classnames';
import React from 'react';

import CloseButton from './buttons/Close';
import CookiesForm from './forms/Cookies';

import styles from '../styles/consent.module.css';

interface ConsentProps {
    urls?: { privacy?: string; terms?: string } | null;
    labels?: { title?: string; description?: string; privacy?: string; terms?: string } | null;
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
}: ConsentProps) {
    return (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
        >
            {onClose !== null && withClose ? (
                <CloseButton
                    type="button"
                    className={styles.close}
                    onClick={onClose}
                    aria-label="Close consent form"
                />
            ) : null}
            {children}
            <CookiesForm
                className={styles.form}
                urls={urls}
                labels={labels}
                onChange={onChange}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
}

export default Consent;
