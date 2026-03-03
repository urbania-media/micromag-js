/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    FIELDS_NAMESPACE,
    ComponentsProvider,
    FieldsProvider as BaseFieldsProvider,
} from '@micromag/core/contexts';

import * as components from './components/index';
import manager from './manager';

interface FieldsProviderProps {
    children: React.ReactNode;
}

function FieldsProvider({ children }) {
    return (
        <ComponentsProvider namespace={FIELDS_NAMESPACE} components={components}>
            <BaseFieldsProvider manager={manager}>{children}</BaseFieldsProvider>
        </ComponentsProvider>
    );
}

export default FieldsProvider;
