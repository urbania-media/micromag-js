/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
    usePlaybackContext,
    useStory,
    useViewerInteraction,
    useViewerWebView,
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
    const {
        opened,
        close,
        open,
        update,
        url = null,
        source = null,
        ...webViewProps
    } = useViewerWebView();
    const { disableInteraction, enableInteraction } = useViewerInteraction();
    const { playing, setPlaying, hideControls, showControls } = usePlaybackContext();

    const wasPlayingRef = useRef(playing);
    const [currentUrl, setCurrentUrl] = useState(url);
    const { title: storyTitle } = useStory();

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
        }
        if (onChange !== null) {
            onChange(opened);
        }
    }, [url, setCurrentUrl, onChange]);

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

    const webViewUrl = url || currentUrl;
    const finalUrl = useMemo(() => {
        const currentQueryString = queryString.parse(
            webViewUrl !== null && webViewUrl.indexOf('?') !== -1 ? webViewUrl.split('?')[1] : '',
        );
        return webViewUrl !== null
            ? `${webViewUrl.split('?')[0]}?${queryString.stringify({
                  utm_source: 'Micromag',
                  utm_medium: source || 'webview',
                  utm_campaign: storyTitle,
                  ...currentQueryString,
              })}`
            : url;
    }, [webViewUrl, source]);

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
                url={finalUrl}
                source={source}
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
