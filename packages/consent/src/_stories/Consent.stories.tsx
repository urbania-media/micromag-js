/* eslint-disable react/jsx-props-no-spreading */
import preview from '#.storybook/preview';
import React, { useCallback, useState } from 'react';

import FieldsProvider from '@panneau/fields';
import ModalsProvider from '@panneau/modals';

import { ConsentProvider, TrackingProvider } from '@micromag/core/contexts';

import Consent from '../components/Consent';

const props = {
    test: [],
};

const meta = preview.meta({
    component: Consent,
    title: 'Viewer/Consent',
    decorators: [],
    parameters: {
        intl: true,
    },
});

const ConsentContainer = ({ value: defaultValue = null, consent = null, ...containerProps }) => {
    const [value, setValue] = useState(defaultValue);
    const [consented, setConsented] = useState(false);

    const onSubmit = useCallback(
        (val) => {
            setValue(val);
        },
        [setValue],
    );

    const onChange = useCallback(
        (val) => {
            setValue(val);
        },
        [setValue],
    );

    const onClose = useCallback(() => {
        setConsented(true);
    }, [setConsented]);

    return (
        <div style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
            <FieldsProvider>
                <ModalsProvider>
                    <ConsentProvider consent={consent} consented={consented}>
                        <TrackingProvider>
                            <Consent
                                {...containerProps}
                                value={value}
                                onSubmit={onSubmit}
                                onChange={onChange}
                                onClose={onClose}
                            />
                        </TrackingProvider>
                    </ConsentProvider>
                </ModalsProvider>
            </FieldsProvider>
        </div>
    );
};

export const Normal = meta.story(() => {
    return <ConsentContainer {...props} consent={['ad_storage', 'ad_personalization']} />;
});

export const FunctionalOnly = meta.story(() => {
    return <ConsentContainer {...props} consent={['functionality_storage']} withoutChoices />;
});

export const withClose = meta.story(() => {
    return (
        <ConsentContainer
            {...props}
            withClose
            labels={{ title: 'ABCD 1234' }}
            consent={['ad_storage', 'ad_personalization']}
        />
    );
});
