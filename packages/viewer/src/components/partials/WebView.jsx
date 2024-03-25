/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';

import {
    useViewerInteraction,
    useViewerWebView,
    usePlaybackContext,
} from '@micromag/core/contexts';
import WebView from '@micromag/element-webview';

import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

import styles from '../../styles/partials/web-view.module.scss';

const propTypes = {
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
};

const defaultProps = {
    onChange: null,
    className: null,
    style: null,
};

function WebViewContainer({ onChange, className, style }) {
    const { opened, close, open, update, url = null, ...webViewProps } = useViewerWebView();
    const { disableInteraction, enableInteraction } = useViewerInteraction();
    const { playing, setPlaying, hideControls, showControls } = usePlaybackContext();

    const wasPlayingRef = useRef(playing);
    const [currentUrl, setCurrentUrl] = useState(url);

    const ref = useRef(null);

    // Handle current webview url
    useEffect(() => {
        if (url !== null) {
            setCurrentUrl(url);
        }
    }, [url, setCurrentUrl]);

    const onTransitionEnd = useCallback(() => {
        if (url === null) {
            setCurrentUrl(null);
            onChange(opened);
        }
    }, [url]);

    // Disable interaction and pause playback
    useEffect(() => {
        if (opened) {
            disableInteraction();
            hideControls();
            wasPlayingRef.current = playing;
            if (playing) {
                setPlaying(false);
            }
        } else {
            enableInteraction();
            showControls();

            if (wasPlayingRef.current && !playing) {
                wasPlayingRef.current = false;
                setPlaying(true);
            }
        }
    }, [opened]);

    const keyboardShortcuts = useMemo(
        () => ({
            escape: () => {
                close();
            },
        }),
        [close],
    );
    useKeyboardShortcuts(keyboardShortcuts);

    return (
        <div
            className={classNames([
                styles.container,
                { [styles.opened]: opened, [className]: className !== null },
            ])}
            style={style}
            onTransitionEnd={onTransitionEnd}
            ref={ref}
        >
            <WebView
                url={url || currentUrl}
                {...webViewProps}
                closeable={opened}
                focusable={opened}
                className={styles.webView}
                onClose={close}
            />
        </div>
    );
}

WebViewContainer.propTypes = propTypes;
WebViewContainer.defaultProps = defaultProps;

export default WebViewContainer;
