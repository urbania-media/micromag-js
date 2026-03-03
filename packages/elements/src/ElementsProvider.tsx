/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { ComponentsProvider, ELEMENTS_NAMESPACE } from '@micromag/core/contexts';

import * as ElementComponents from './all';

interface ElementsProviderProps {
    children?: React.ReactNode;
}

function ElementsProvider({ children: children = null, ...props }) {
    return (
        <ComponentsProvider
            namespace={ELEMENTS_NAMESPACE}
            components={ElementComponents}
            {...props}
        />
    );
}

export default ElementsProvider;
