import classNames from 'classnames';
import React from 'react';

import CloseButton from './buttons/Close';
import CookiesForm from './forms/Cookies';

import styles from '../styles/consent.module.css';

interface ConsentProps {
    urls?: { privacy?: string; terms?: string };
    labels?: { title?: string; description?: string; privacy?: string; terms?: string };
    onChange?: (...args: unknown[]) => void;
    onSubmit?: (...args: unknown[]) => void;
    onClose?: (...args: unknown[]) => void;
    withClose?: boolean;
    className?: string;
    children?: React.ReactNode;
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
                {
                    [className]: className,
                },
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
