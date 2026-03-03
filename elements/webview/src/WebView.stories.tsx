/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import WebView from './WebView';

export default {
    component: WebView,
    title: 'Elements/WebView',
    parameters: {
        intl: true,
    },
};

const webViewProps = {
    src: 'https://google.com',
    visible: true,
};

export function Normal() {
    return <WebView {...webViewProps} width={320} height={480} />;
}

export function Closeable() {
    return <WebView {...webViewProps} width={320} height={480} closeable />;
}
