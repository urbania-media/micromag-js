import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';

import { Close } from '@micromag/core/components';
import Button from '@micromag/element-button';

import styles from './styles.module.css';

interface WebViewProps {
    url?: string | null;
    width?: number | string | null;
    height?: number | string | null;
    closeable?: boolean;
    focusable?: boolean;
    onClose?: ((...args: unknown[]) => void) | null;
    className?: string | null;
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
                className,
                {
                    [styles.hidden]: !focusable,
                    [styles.closeable]: closeable,
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
