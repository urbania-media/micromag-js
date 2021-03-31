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
        <CallToAction callToAction={{...callToActionProps, type: 'button' }} />
    </>
);