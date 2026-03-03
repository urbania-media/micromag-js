/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';

import ElementPortal from '../utils/ElementPortal';

import { useModals } from '../../contexts';

interface ModalPortalProps {
    id?: string;
    data?: Record<string, unknown>;
    children?: React.ReactNode;
}

function ModalPortal({ id = null, data = null, children = null }) {
    const { container, register = null, unregister = null } = useModals();
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

export default ModalPortal;
