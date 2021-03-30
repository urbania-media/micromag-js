import React from 'react';
import { IntlProvider } from 'react-intl';

import CallToAction from './CallToAction';

export default {
    component: CallToAction,
    title: 'Elements/CallToAction',
};

export const normal = () => (
    <IntlProvider>
        <div style={{ height: 300 }} />
        <CallToAction callToAction={{ active: true, url: 'https://google.com' }} />
    </IntlProvider>
);

export const animationDisabled = () => (
    <IntlProvider>
        <div style={{ height: 300 }} />
        <CallToAction callToAction={{ active: true, url: 'https://google.com'}} animationDisabled />
    </IntlProvider>
);

export const noSwipe = () => (
    <IntlProvider>
        <div style={{ height: 300 }} />
        <CallToAction callToAction={{ active: true, url: 'https://google.com', type: 'button' }} />
    </IntlProvider>
);

export const withLabel = () => (
    <IntlProvider>
        <div style={{ height: 300 }} />
        <CallToAction callToAction={{ active: true, url: 'https://google.com', label: { body: 'Custom label'} }} />
    </IntlProvider>
);