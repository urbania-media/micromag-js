/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
    FieldsProvider as BaseFieldsProvider,
    ComponentsProvider,
    FIELDS_NAMESPACE,
} from '@micromag/core/contexts';

import * as components from './components/index';
import manager from './manager';

interface FieldsProviderProps {
    children: React.ReactNode;
}

function FieldsProvider({ children }: FieldsProviderProps) {
    return (
        <ComponentsProvider namespace={FIELDS_NAMESPACE} components={components}>
            <BaseFieldsProvider manager={manager}>{children}</BaseFieldsProvider>
        </ComponentsProvider>
    );
}

export default FieldsProvider;
