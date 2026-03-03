/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';

import ElementPortal from '../utils/ElementPortal';

import { usePanels } from '../../contexts';

interface PanelPortalProps {
    id?: string | null;
    data?: Record<string, unknown> | null;
    children?: React.ReactNode | null;
}

function PanelPortal({ id = null, data = null, children = null }: PanelPortalProps) {
    const { panels = null, container, register = null, unregister = null } = usePanels();
    if (panels === null) {
        return children;
    }
    return (
        <ElementPortal
            id={id}
            data={data}
            container={container}
            register={register}
            unregister={unregister}
        >
            {children}
        </ElementPortal>
    );
}

export default PanelPortal;
