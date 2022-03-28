import React from 'react';
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
    const { width = 320, height = 480, callToAction = null } = props || {};
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
            <CallToAction callToAction={callToAction} />
        </div>
    );
};

export const normal = () => (
    <>
        <div style={{ height: 300 }} />
        <CallToAction callToAction={callToActionProps} />
    </>
);

export const animationDisabled = () => (
    <>
        <div style={{ height: 300 }} />
        <CallToAction callToAction={callToActionProps} animationDisabled />
    </>
);

export const noSwipe = () => (
    <>
        <div style={{ height: 300 }} />
        <CallToAction callToAction={{ ...callToActionProps, type: 'button' }} />
    </>
);

export const buttonWebView = () => (
    <CTAContainer callToAction={{ ...callToActionProps, type: 'button', inWebView: true }} />
);

export const swipeWebView = () => (
    <CTAContainer callToAction={{ ...callToActionProps, type: 'swipe-up', inWebView: true }} />
);
