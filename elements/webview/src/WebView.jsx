/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Close } from '@micromag/core/components';
import Button from '@micromag/element-button';

import useKeyboardShortcuts from '../../../packages/viewer/src/hooks/useKeyboardShortcuts';

import styles from './styles.module.scss';

const propTypes = {
    iframeRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any, // eslint-disable-line
        }),
    ]),
    url: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    closeable: PropTypes.bool,
    focusable: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    iframeRef: null,
    url: null,
    width: null,
    height: null,
    closeable: false,
    focusable: false,
    onClose: null,
    className: null,
};

function WebView({ iframeRef, url, width, height, closeable, focusable, onClose, className }) {
    const intl = useIntl();

    const keyboardShortcuts = useMemo(
        () => ({
            escape: () => onClose(),
        }),
        [onClose],
    );
    useKeyboardShortcuts(keyboardShortcuts);
    return (
        <div
            className={classNames([
                styles.container,
                {
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
                        ariaLabel={intl.formatMessage({
                            defaultMessage: 'Close',
                            description: 'Button label',
                        })}
                        onClick={onClose}
                    >
                        <Close className={styles.closeIcon} />
                    </Button>
                </div>
            ) : null}
            <iframe
                className={styles.iframe}
                tabIndex={!focusable ? -1 : null}
                aria-hidden={!focusable ? true : null}
                ref={iframeRef}
                title="Popup"
                src={url || 'about:blank'}
            />
        </div>
    );
}

WebView.propTypes = propTypes;
WebView.defaultProps = defaultProps;

export default WebView;
