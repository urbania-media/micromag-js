import classNames from 'classnames';
import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';

import {
    usePlaybackContext,
    useStory,
    useViewerInteraction,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useTrackEvent } from '@micromag/core/hooks';
import WebView from '@micromag/element-webview';

import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

import styles from '../../styles/partials/web-view.module.css';

interface WebViewContainerProps {
    onChange?: (...args: unknown[]) => void;
    trackingEnabled?: boolean;
    className?: string;
    style?: Record<string, unknown>;
}

function WebViewContainer({
    onChange = null,
    trackingEnabled = false,
    className = null,
    style = null,
}: WebViewContainerProps) {
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
    const trackEvent = useTrackEvent();

    const wasPlayingRef = useRef(playing);
    const [currentUrl, setCurrentUrl] = useState(url);
    const { title: storyTitle } = useStory();

    const ref = useRef(null);

    if (currentUrl !== url && url !== null) {
        setCurrentUrl(url);
    }

    const onTransitionEnd = () => {
        if (url === null) {
            setCurrentUrl(null);
        }
        if (onChange !== null) {
            onChange(opened);
        }
    };

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

    useEffect(() => {
        if (!trackingEnabled || currentUrl === null) {
            return;
        }
        trackEvent('viewer_webview', opened ? 'open' : 'close', currentUrl, { source });
    }, [trackingEnabled, currentUrl, opened]);

    useKeyboardShortcuts({
        escape: () => {
            close();
        },
    });

    const webViewUrl = url || currentUrl;
    const currentQueryString = queryString.parse(
        webViewUrl !== null && webViewUrl.indexOf('?') !== -1 ? webViewUrl.split('?')[1] : '',
    );
    const finalUrl =
        webViewUrl !== null
            ? `${webViewUrl.split('?')[0]}?${queryString.stringify({
                  utm_source: 'Micromag',
                  utm_medium: source || 'webview',
                  utm_campaign: storyTitle,
                  ...currentQueryString,
              })}`
            : url;

    return (
        <div
            className={classNames([styles.container, className, { [styles.opened]: opened }])}
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

export default WebViewContainer;
