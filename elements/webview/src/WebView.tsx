/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';

import { Close } from '@micromag/core/components';
import Button from '@micromag/element-button';

import styles from './styles.module.css';

interface WebViewProps {
    url?: string;
    width?: number | string;
    height?: number | string;
    closeable?: boolean;
    focusable?: boolean;
    onClose?: (...args: unknown[]) => void;
    className?: string;
}

function WebView({
    url = null,
    width = null,
    height = null,
    closeable = false,
    focusable = false,
    onClose = null,
    className = null,
}: WebViewProps) {
    const intl = useIntl();
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.hidden]: !focusable,
                    [styles.closeable]: closeable,
                    [className]: className !== null,
                },
            ])}
            style={{ width, height }}
        >
            {closeable ? (
                <div className={styles.top}>
                    <Button
                        className={styles.close}
                        aria-label={intl.formatMessage({
                            defaultMessage: 'Close Popup',
                            description: 'Button label',
                        })}
                        focusable={focusable}
                        onClick={onClose}
                    >
                        <Close className={styles.closeIcon} />
                    </Button>
                </div>
            ) : null}
            <iframe
                className={styles.iframe}
                aria-hidden={!focusable ? 'true' : null}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={focusable ? '0' : '-1'}
                title={intl.formatMessage({
                    defaultMessage: 'Popup',
                    description: 'Popup label',
                })}
                src={url || 'about:blank'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
}

export default WebView;
