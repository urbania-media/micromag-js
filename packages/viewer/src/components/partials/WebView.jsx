/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useViewerWebView } from '@micromag/core/contexts';
import WebView from '@micromag/element-webview';

import styles from '../../styles/partials/web-view.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

function WebViewContainer({ className }) {
    const { opened, close, open, update, ...webViewProps } = useViewerWebView();
    return (
        <div
            className={classNames([
                styles.container,
                { [styles.opened]: opened, [className]: className !== null },
            ])}
        >
            <WebView
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
