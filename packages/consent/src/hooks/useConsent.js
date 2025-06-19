import JSCookie from 'js-cookie';
import isString from 'lodash/isString';
import { useCallback, useMemo, useState } from 'react';
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

const consent = [
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

const useConsent = ({
    consent: initialConsent = null,
    onSubmit = null,
    onChange = null,
    onClose = null,
    autoClose = true,
}) => {
    const baseConsent = useMemo(
        () =>
            (initialConsent || consent)
                .map((item) => {
                    if (isString(item)) {
                        return consent.find((it) => it.id === item) || null;
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
        [initialConsent],
    );
    const [choices, setChoices] = useState(baseConsent);

    const onSubmitForm = useCallback(
        (values) => {
            JSCookie.set('popup_cookies', false, { secure: true, expires: 182 });
            if (onSubmit !== null) {
                onSubmit(values || []);
            }
            if (onClose !== null && autoClose) {
                onClose(values || []);
            }
        },
        [onSubmit, onClose, autoClose],
    );

    const onClickChoice = useCallback(
        (id, newValue) => {
            const newChoices = (choices || []).reduce((acc, it) => {
                if (it.id === id) {
                    return [...acc, { ...it, value: newValue }];
                }
                return [...acc, it];
            }, []);
            setChoices(newChoices);
            if (onChange !== null) {
                onChange(newChoices || []);
            }
        },
        [choices, setChoices],
    );

    const onClickConfirm = useCallback(() => {
        onSubmitForm(choices);
    }, [choices, onSubmitForm]);

    const onClickAccept = useCallback(() => {
        const items = baseConsent.map((it) => ({ ...it, value: !it.disabled ? true : it.value }));
        setChoices(items);
        onSubmitForm(items);
    }, [baseConsent, setChoices, onSubmitForm]);

    const onClickDeny = useCallback(() => {
        const items = baseConsent.map((it) => ({ ...it, value: !it.disabled ? false : it.value }));
        setChoices(items);
        onSubmitForm(items);
    }, [baseConsent, setChoices, onSubmitForm]);

    return {
        choices,
        onClickChoice,
        onClickConfirm,
        onClickAccept,
        onClickDeny,
    };
};

export default useConsent;
