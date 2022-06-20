/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import { useViewerInteraction, useViewerWebView, usePlaybackContext } from '@micromag/core/contexts';
import WebView from '@micromag/element-webview';

import styles from '../../styles/partials/web-view.module.scss';

const propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

const defaultProps = {
    className: null,
    style: null,
};

function WebViewContainer({ className, style }) {
    const { opened, close, open, update, url = null, ...webViewProps } = useViewerWebView();
    const { disableInteraction, enableInteraction } = useViewerInteraction();
    const { playing, setPlaying } = usePlaybackContext();

    const wasPlayingRef = useRef(playing);
    const [currentUrl, setCurrentUrl] = useState(url);

    // Handle current webview url
    useEffect(() => {
        if (url !== null) {
            setCurrentUrl(url);
        }
    }, [url, setCurrentUrl]);
    const onTransitionEnd = useCallback(() => {
        if (url === null) {
            setCurrentUrl(null);
        }
    }, [url]);

    // Disable interaction and pause playback
    useEffect(() => {
        if (opened) {
            disableInteraction();

            wasPlayingRef.current = playing;
            if (playing) {
                setPlaying(false);
            }
        } else {
            enableInteraction();

            if (wasPlayingRef.current && !playing) {
                wasPlayingRef.current = false;
                setPlaying(true);
            }
        }
    }, [opened]);
    return (
        <div
            className={classNames([
                styles.container,
                { [styles.opened]: opened, [className]: className !== null },
            ])}
            style={style}
            onTransitionEnd={onTransitionEnd}
        >
            <WebView
                url={url || currentUrl}
                {...webViewProps}
                closeable
                className={styles.webView}
                onClose={close}
            />
        </div>
    );
}

WebViewContainer.propTypes = propTypes;
WebViewContainer.defaultProps = defaultProps;

export default WebViewContainer;
