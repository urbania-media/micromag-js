/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import WebView from '../../webview/src/WebView';
import CallToAction from './CallToAction';

export default {
    component: CallToAction,
    title: 'Elements/CallToAction',
};

const callToActionProps = {
    active: true,
    url: 'https://google.com',
    label: { body: 'Learn more' },
};

const CTAContainer = (props = null) => {
    const [webView, setWebView] = useState(null);
    const { width = 320, height = 480, ...otherProps } = props || {};
    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                border: '1px solid white',
            }}
        >
            <CallToAction {...otherProps} openWebView={setWebView} />
            {webView !== null ? (
                <WebView
                    {...webView}
                    width={width}
                    height={height}
                    onClose={() => setWebView(null)}
                />
            ) : null}
        </div>
    );
};

export const normal = () => (
    <>
        <div style={{ height: 300 }} />
        <CallToAction {...callToActionProps} />
    </>
);

export const animationDisabled = () => (
    <>
        <div style={{ height: 300 }} />
        <CallToAction {...callToActionProps} animationDisabled />
    </>
);

export const noSwipe = () => (
    <>
        <div style={{ height: 300 }} />
        <CallToAction {...callToActionProps} type="button" />
    </>
);

export const buttonWebView = () => <CTAContainer {...callToActionProps} type="button" inWebView />;

export const swipeWebView = () => <CTAContainer {...callToActionProps} type="swipe-up" inWebView />;
