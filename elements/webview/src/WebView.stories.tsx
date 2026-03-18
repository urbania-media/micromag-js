import preview from '#.storybook/preview';
import React from 'react';

import WebView from './WebView';

const meta = preview.meta({
    component: WebView,
    title: 'Elements/WebView',

    parameters: {
        intl: true,
    },
});

const webViewProps = {
    src: 'https://google.com',
    visible: true,
};

export const Normal = meta.story(() => {
    return <WebView {...webViewProps} width={320} height={480} />;
});

export const Closeable = meta.story(() => {
    return <WebView {...webViewProps} width={320} height={480} closeable />;
});
