/* eslint-disable react/jsx-props-no-spreading */
import JSCookie from 'js-cookie';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defineMessages } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '../lib';

const messages = defineMessages({
    functionality_title: {
        id: 'consent.functionality_title',
        defaultMessage: 'Functionnal',
    },
    functionality_description: {
        id: 'consent.functionality_description',
        defaultMessage: 'Cookies required for the site to function properly.',
    },
    analytics_title: {
        id: 'consent.analytics_title',
        defaultMessage: 'Analytics',
    },
    analytics_description: {
        id: 'consent.analytics_description',
        defaultMessage: 'Cookies used to measure user behavior.',
    },
    ad_storage_title: {
        id: 'consent.ad_storage_title',
        defaultMessage: 'Ad Storage',
    },
    ad_storage_description: {
        id: 'consent.ad_storage_description',
        defaultMessage: 'Cookies used for advertising purposes.',
    },
    ad_personalization_title: {
        id: 'consent.ad_personalization_title',
        defaultMessage: 'Ad Personalization',
    },
    ad_personalization_description: {
        id: 'consent.ad_personalization_description',
        defaultMessage: 'Cookies used for ad targeting.',
    },
    ad_user_data_title: {
        id: 'consent.ad_user_data_title',
        defaultMessage: 'User Ad Data',
    },
    ad_user_data_description: {
        id: 'consent.ad_user_data_description',
        defaultMessage: 'Cookies used for user-specific ad data.',
    },
    personalization_storage_title: {
        id: 'consent.personalization_storage_title',
        defaultMessage: 'Personalization Storage',
    },
    personalization_storage_description: {
        id: 'consent.personalization_storage_description',
        defaultMessage: 'Cookies used for personalizing user experience.',
    },
    security_storage_title: {
        id: 'consent.security_storage_title',
        defaultMessage: 'Security Storage',
    },
    security_storage_description: {
        id: 'consent.security_storage_description',
        defaultMessage: 'Cookies used for security purposes.',
    },
});

const consentStates = [
    {
        id: 'functionality_storage',
        label: messages.functionality_title,
        description: messages.functionality_description,
        value: true,
        disabled: true,
    },
    {
        id: 'security_storage',
        label: messages.security_storage_title,
        description: messages.security_storage_description,
        value: true,
    },
    {
        id: 'personalization_storage',
        label: messages.personalization_storage_title,
        description: messages.personalization_storage_description,
        value: true,
    },
    {
        id: 'analytics_storage',
        label: messages.analytics_title,
        description: messages.analytics_description,
        value: true,
    },
    {
        id: 'ad_storage',
        label: messages.ad_storage_title,
        description: messages.ad_storage_description,
        value: true,
    },
    {
        id: 'ad_personalization',
        label: messages.ad_personalization_title,
        description: messages.ad_personalization_description,
        value: true,
    },
    {
        id: 'ad_user_data',
        label: messages.ad_user_data_title,
        description: messages.ad_user_data_description,
        value: true,
    },
];

export const ConsentContext = React.createContext({
    consent: null,
    setConsent: () => {},
});

export const useConsent = () => useContext(ConsentContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    consent: MicromagPropTypes.consent,
};

const defaultProps = {
    consent: [
        'functionality_storage',
        'analytics_storage',
        'ad_storage',
        'ad_personalization',
        'ad_user_data',
    ],
};

export const ConsentProvider = ({ consent: providedConsent, children }) => {
    const baseConsent = useMemo(
        () =>
            (providedConsent || consentStates || [])
                .map((item) => {
                    if (isString(item)) {
                        return (consentStates || []).find((it) => it.id === item) || null;
                    }
                    return item || null;
                })
                .filter((it) => it !== null)
                .map((it) => ({
                    ...it,
                    value:
                        // eslint-disable-next-line no-nested-ternary
                        JSCookie.get(it.id) === 'granted'
                            ? true
                            : JSCookie.get(it.id) === 'denied'
                              ? false
                              : it.value,
                })),
        [providedConsent],
    );

    const [consent, setConsentState] = useState(baseConsent);
    useEffect(() => {
        if (baseConsent) {
            setConsentState(baseConsent);
        }
    }, [baseConsent, setConsentState]);

    const setConsent = useCallback(
        (values) => {
            JSCookie.set('show_consent', values === null || values === undefined, {
                secure: true,
                expires: 182,
            });
            (values || []).forEach((it) => {
                if (it.value === true) {
                    JSCookie.set(it.id, 'granted', { secure: true, expires: 182 });
                } else if (it.value === false) {
                    JSCookie.set(it.id, 'denied', { secure: true, expires: 182 });
                } else {
                    JSCookie.remove(it.id);
                }
            });
            setConsentState(values);
        },
        [setConsentState],
    );

    const value = useMemo(
        () => ({
            consent,
            setConsent,
        }),
        [consent, setConsent],
    );

    return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

ConsentProvider.propTypes = propTypes;
ConsentProvider.defaultProps = defaultProps;
