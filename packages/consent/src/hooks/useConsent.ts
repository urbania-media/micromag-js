import { useCallback } from 'react';

import { useConsent } from '@micromag/core/contexts';

const useConsentActions = ({
    onSubmit = null,
    onChange = null,
    onClose = null,
    autoClose = true,
}) => {
    const { consent, setConsent, setConsented } = useConsent();

    const onSubmitForm = useCallback(
        (values = null) => {
            setConsent(values);
            setConsented(true);
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
            const newChoices = (consent || []).reduce((acc, it) => {
                if (it.id === id) {
                    return [...acc, { ...it, value: newValue }];
                }
                return [...acc, it];
            }, []);
            setConsent(newChoices);
            if (onChange !== null) {
                onChange(newChoices || []);
            }
        },
        [consent, setConsent, onChange],
    );

    const onClickConfirm = useCallback(() => {
        onSubmitForm(consent);
    }, [consent, onSubmitForm]);

    const onClickAccept = useCallback(() => {
        const items = (consent || []).map((it) => ({
            ...it,
            value: !it.disabled ? true : it.value,
        }));
        onSubmitForm(items);
    }, [consent, onSubmitForm]);

    const onClickDeny = useCallback(() => {
        const items = (consent || []).map((it) => ({
            ...it,
            value: !it.disabled ? false : it.value,
        }));
        onSubmitForm(items);
    }, [consent, onSubmitForm]);

    return {
        consent,
        onClickChoice,
        onClickConfirm,
        onClickAccept,
        onClickDeny,
    };
};

export default useConsentActions;
