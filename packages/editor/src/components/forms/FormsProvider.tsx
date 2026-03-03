/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentsProvider, FORMS_NAMESPACE } from '@micromag/core/contexts';

import * as FormsComponents from './index';

interface FormsProviderProps {
    children?: React.ReactNode;
}

function FormsProvider(
    {
        children = null,
        ...props
    }: FormsProviderProps,
) {
    return (
        <ComponentsProvider namespace={FORMS_NAMESPACE} components={FormsComponents} {...props}>
            {children}
        </ComponentsProvider>
    );
}

export default FormsProvider;
