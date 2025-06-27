/* eslint-disable react/jsx-props-no-spreading */

/* global gtag */
import JSCookie from 'js-cookie';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defineMessages } from 'react-intl';

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
        value: false,
    },
    {
        id: 'analytics_storage',
        label: messages.analytics_title,
        description: messages.analytics_description,
        value: false,
    },
    {
        id: 'ad_storage',
        label: messages.ad_storage_title,
        description: messages.ad_storage_description,
        value: false,
    },
    {
        id: 'ad_personalization',
        label: messages.ad_personalization_title,
        description: messages.ad_personalization_description,
        value: false,
    },
    {
        id: 'ad_user_data',
        label: messages.ad_user_data_title,
        description: messages.ad_user_data_description,
        value: false,
    },
];

export const ConsentContext = React.createContext({
    consent: null,
    setConsent: () => {},
});

export const useConsent = () => useContext(ConsentContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    consent: PropTypes.arrayOf(PropTypes.shape({})),
    consented: PropTypes.bool,
    expiration: PropTypes.number,
};

const defaultProps = {
    consent: [
        'functionality_storage',
        'analytics_storage',
        'ad_storage',
        'ad_personalization',
        'ad_user_data',
    ],
    consented: null,
    expiration: 182, // Default expiration in days
};

export const ConsentProvider = ({
    consent: providedConsent,
    consented: initialConsented,
    expiration,
    children,
}) => {
    // Has consented or not to cookies
    const initialCookieConsented = JSCookie.get('has_consented') === 'true';
    const baseConsented = initialConsented || initialCookieConsented;
    const [consented, setConsentedState] = useState(baseConsented);

    const setConsented = useCallback(
        (accept = null) => {
            const hasConsented = accept || false;
            JSCookie.set('has_consented', hasConsented, {
                secure: true,
                expires: expiration,
            });
            setConsentedState(hasConsented);
        },
        [expiration, setConsentedState],
    );

    useEffect(() => {
        if (initialConsented === true || initialConsented === false) {
            setConsented(initialConsented);
        }
    }, [initialConsented, setConsented]);

    // The consent state itself
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
    const [consent, setConsentState] = useState(null);
    const setConsent = useCallback(
        (values = null, initial = false) => {
            const tagManagerConsent = (values || []).reduce((acc, it) => {
                if (it.value === true) {
                    JSCookie.set(it.id, 'granted', { secure: true, expires: expiration });
                    acc[it.id] = 'granted';
                } else if (it.value === false) {
                    JSCookie.set(it.id, 'denied', { secure: true, expires: expiration });
                    acc[it.id] = 'denied';
                } else {
                    JSCookie.remove(it.id);
                    acc[it.id] = 'denied';
                }
                return acc;
            }, {});

            if (typeof gtag === 'function') {
                gtag('consent', initial === true ? 'default' : 'update', tagManagerConsent);
                gtag(
                    'event',
                    initial === true ? 'consent_default' : 'consent_update',
                    tagManagerConsent,
                );
            }
            setConsentState(values);
        },
        [setConsentState, expiration],
    );

    useEffect(() => {
        if (baseConsent !== null && baseConsent.length > 0) {
            setConsent(baseConsent);
        }
    }, [baseConsent, setConsent]);

    const value = useMemo(
        () => ({
            consent,
            setConsent,
            consented,
            setConsented,
        }),
        [consent, setConsent, consented, setConsented],
    );

    return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
};

ConsentProvider.propTypes = propTypes;
ConsentProvider.defaultProps = defaultProps;
