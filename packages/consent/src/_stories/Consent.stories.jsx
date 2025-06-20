/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';

import FieldsProvider from '@panneau/fields';
import ModalsProvider from '@panneau/modals';

import { ConsentProvider, TrackingProvider } from '@micromag/core/contexts';

import Consent from '../components/Consent';

const props = {
    test: [],
};

export default {
    component: Consent,
    title: 'Viewer/Consent',
    decorators: [],
    parameters: {
        intl: true,
    },
};

// eslint-disable-next-line react/prop-types
const ConsentContainer = ({ value: defaultValue = null, consent = null, ...containerProps }) => {
    const [value, setValue] = useState(defaultValue);
    const [open, setOpen] = useState(true);

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
        setOpen(false);
    }, [setOpen]);

    return (
        <div style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
            <FieldsProvider>
                <ModalsProvider>
                    <ConsentProvider consent={consent}>
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

export function Normal() {
    return <ConsentContainer {...props} consent={['ad_storage', 'ad_personalization']} />;
}

export function withClose() {
    return (
        <ConsentContainer
            {...props}
            withClose
            labels={{ title: 'ABCD 1234' }}
            consent={['ad_storage', 'ad_personalization']}
        />
    );
}
